"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const slugify_1 = require("slugify");
const prisma = new client_1.PrismaClient();
const TEMP_DIR = node_path_1.default.resolve(process.cwd(), 'temp');
const IMAGES = [
    node_path_1.default.resolve(__dirname, './images/camiseta.jpeg'),
    node_path_1.default.resolve(__dirname, './images/carro.jpeg'),
    node_path_1.default.resolve(__dirname, './images/liquidificador.jpg'),
    node_path_1.default.resolve(__dirname, './images/moto.jpg'),
    node_path_1.default.resolve(__dirname, './images/sofa.jpg'),
];
async function main() {
    const tempFiles = await promises_1.default.readdir(TEMP_DIR);
    if (tempFiles.length) {
        console.log('Deleting temp files...');
        await Promise.all(tempFiles.map((file) => promises_1.default.unlink(node_path_1.default.join(TEMP_DIR, file))));
    }
    await prisma.view.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
    await prisma.attachment.deleteMany();
    const categories = await prisma.category.createManyAndReturn({
        data: [
            { title: 'Eletrodomésticos' },
            { title: 'Eletrônicos' },
            { title: 'Informática' },
            { title: 'Móveis' },
            { title: 'Decoração' },
            { title: 'Moda' },
            { title: 'Esportes' },
            { title: 'Brinquedos' },
            { title: 'Livros' },
            { title: 'Alimentos' },
        ].map((category) => {
            return {
                id: (0, node_crypto_1.randomUUID)(),
                title: category.title,
                slug: (0, slugify_1.default)(category.title, { lower: true }),
            };
        }),
    });
    const seller = await prisma.user.create({
        data: {
            id: (0, node_crypto_1.randomUUID)(),
            name: 'Seller',
            email: 'seller@mba.com',
            password: await (0, bcryptjs_1.hash)('123456', 8),
            phone: faker_1.faker.phone.number(),
        },
    });
    const viewers = await prisma.user.createManyAndReturn({
        data: Array.from({ length: faker_1.faker.number.int({ min: 1, max: 15 }) }).map(() => ({
            id: (0, node_crypto_1.randomUUID)(),
            name: faker_1.faker.person.firstName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            phone: faker_1.faker.phone.number(),
        })),
    });
    await Promise.all(Array.from({ length: faker_1.faker.number.int({ min: 5, max: 20 }) }).map(async () => {
        const productViewers = faker_1.faker.helpers.arrayElements(viewers);
        const fileId = (0, node_crypto_1.randomUUID)();
        const filename = `${fileId}.png`;
        await promises_1.default.copyFile(faker_1.faker.helpers.arrayElement(IMAGES), node_path_1.default.join(TEMP_DIR, filename));
        return prisma.product.create({
            data: {
                id: (0, node_crypto_1.randomUUID)(),
                title: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                priceInCents: faker_1.faker.number.int({ min: 1000, max: 100000 }),
                ownerId: seller.id,
                status: faker_1.faker.helpers.arrayElement(['available', 'cancelled', 'sold']),
                categoryId: faker_1.faker.helpers.arrayElement(categories).id,
                views: {
                    createMany: {
                        data: productViewers.map((viewer) => ({
                            id: (0, node_crypto_1.randomUUID)(),
                            viewerId: viewer.id,
                            createdAt: faker_1.faker.date.recent({ days: 50 }),
                        })),
                    },
                },
                attachments: {
                    create: {
                        id: fileId,
                        path: filename,
                    },
                },
            },
        });
    }));
}
main();
//# sourceMappingURL=index.js.map