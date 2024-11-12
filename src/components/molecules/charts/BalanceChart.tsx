"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Datos de ejemplo para los saldos diarios
const chartData = [
  { date: "2024-11-01", balance: 500 },
  { date: "2024-11-02", balance: 520 },
  { date: "2024-11-03", balance: 490 },
  { date: "2024-11-04", balance: 530 },
  { date: "2024-11-05", balance: 550 },
  { date: "2024-11-06", balance: 560 },
];

// Configuración del gráfico para el saldo diario
const chartConfig = {
  balance: {
    label: "Saldo Diario",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BalanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfica de Saldo Diario</CardTitle>
        <CardDescription>
          Evolución de los saldos diarios totales para el Maestro seleccionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Area
              dataKey="balance"
              type="natural"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Incremento de saldo del 5.2% este mes{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Noviembre 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
