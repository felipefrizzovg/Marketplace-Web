import { Badge } from "./ui/badge";

export type ProductStatusTypes = "available" | "sold" | "cancelled";

interface ProductStatusProps {
  status: ProductStatusTypes;
}

const productStatusMap: Record<ProductStatusTypes, string> = {
  available: "Anunciado",
  sold: "Vendido",
  cancelled: "Desativado",
};

export function ProductStatus({ status }: ProductStatusProps) {
  return (
    <div>
      {status === "available" && (
        <Badge className="bg-blue-dark hover:bg-blue-dark" variant="default">
          {productStatusMap[status]}
        </Badge>
      )}

      {status === "sold" && (
        <Badge
          className="bg-semantic-success hover:bg-semantic-success"
          variant="default"
        >
          {productStatusMap[status]}
        </Badge>
      )}

      {status === "cancelled" && (
        <Badge
          className="bg-grayScale-300 hover:bg-grayScale-300"
          variant="default"
        >
          {productStatusMap[status]}
        </Badge>
      )}
    </div>
  );
}
