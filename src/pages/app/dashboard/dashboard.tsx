import { Helmet } from 'react-helmet-async'

import { AnnouncedProductsCard } from './announced-products-card'
import { SoldItemsCard } from './sold-items-card'
import { VisitorsCard } from './visitors-card'
import { VisitorsChart } from './visitors-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <main className="grid grid-cols-1 gap-10">
        <div className="flex flex-col">
          <h1 className="font-sans text-2xl font-bold text-grayScale-500">
            Últimos 30 dias
          </h1>
          <p className="font-poppins text-sm font-normal text-grayScale-300">
            Confira as estatísticas da sua loja no último mês
          </p>
        </div>

        <div className="grid grid-cols-9 gap-6">
          <div className="col-span-2 flex flex-col gap-4">
            <SoldItemsCard />
            <AnnouncedProductsCard />
            <VisitorsCard />
          </div>
          <VisitorsChart />
        </div>
      </main>
    </>
  )
}
