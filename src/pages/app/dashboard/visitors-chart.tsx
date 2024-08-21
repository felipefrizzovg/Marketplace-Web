import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { day: '01', visitors: 152 },
  { day: '02', visitors: 123 },
  { day: '03', visitors: 786 },
  { day: '04', visitors: 189 },
  { day: '05', visitors: 50 },
  { day: '06', visitors: 856 },
  { day: '07', visitors: 70 },
  { day: '08', visitors: 567 },
  { day: '09', visitors: 90 },
  { day: '10', visitors: 4 },
  { day: '11', visitors: 110 },
  { day: '12', visitors: 741 },
  { day: '13', visitors: 130 },
  { day: '14', visitors: 140 },
  { day: '15', visitors: 150 },
  { day: '16', visitors: 2231 },
  { day: '17', visitors: 170 },
  { day: '18', visitors: 24 },
  { day: '19', visitors: 190 },
  { day: '20', visitors: 200 },
  { day: '21', visitors: 210 },
  { day: '22', visitors: 78 },
  { day: '23', visitors: 230 },
  { day: '24', visitors: 41 },
  { day: '25', visitors: 250 },
  { day: '26', visitors: 260 },
  { day: '27', visitors: 465 },
  { day: '28', visitors: 280 },
  { day: '29', visitors: 290 },
]

export function VisitorsChart() {
  return (
    <Card className="col-span-7 p-6">
      <CardHeader className="flex-row items-center justify-between p-0 pb-7">
        <CardTitle className="font-sans text-lg font-bold text-grayScale-500">
          Visitantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} dy={16} />

            <YAxis stroke="#949494" axisLine={false} tickLine={false} />

            <CartesianGrid vertical={false} strokeDasharray="3" />

            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="visitors"
              stroke={colors.blue['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
