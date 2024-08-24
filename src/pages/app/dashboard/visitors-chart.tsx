import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyViews } from '@/api/get-daily-views'
import { DateRangePicker } from '@/components/date-range-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function VisitorsChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 31),
    to: new Date(),
  })

  const { data: dailyViews } = useQuery({
    queryFn: () =>
      getDailyViews({
        from: dateRange.from,
        to: dateRange.to,
      }),
    queryKey: ['metrics', 'daily-views', dateRange],
  })

  const formattedData = dailyViews?.viewsPerDay.map((view) => {
    const dateObject = new Date(view.date)
    const day = dateObject.getUTCDate().toString().padStart(2, '0') // Extrai o dia e adiciona um zero à esquerda se necessário
    return {
      ...view,
      date: day, // Altera o valor de `date` para conter apenas o dia
    }
  })

  return (
    <Card className="col-span-7 p-6">
      <CardHeader className="flex-row items-center justify-between p-0 pb-7">
        <CardTitle className="font-sans text-lg font-bold text-grayScale-500">
          Visitantes
        </CardTitle>

        <div className="flex items-center gap-3">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyViews && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={formattedData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

              <YAxis stroke="#949494" axisLine={false} tickLine={false} />

              <CartesianGrid vertical={false} strokeDasharray="3" />

              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="amount"
                stroke={colors.blue['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
