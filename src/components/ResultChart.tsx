import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, BarChart3, FileJson } from "lucide-react"

interface ResultChartProps {
  result: any
}

export function ResultChart({ result }: ResultChartProps) {
  // 예측 결과 데이터 파싱
  const parsePredictions = () => {
    if (!result || !result.predictions) return []
    
    // predictions가 2D 배열인 경우
    if (Array.isArray(result.predictions) && result.predictions.length > 0) {
      if (Array.isArray(result.predictions[0])) {
        // 각 시간대별로 평균값 계산
        return result.predictions.map((pred: number[], index: number) => ({
          time: `T${index + 1}`,
          value: pred.reduce((a: number, b: number) => a + b, 0) / pred.length,
          max: Math.max(...pred),
          min: Math.min(...pred),
        }))
      } else {
        // 1D 배열인 경우
        return result.predictions.map((value: number, index: number) => ({
          time: `T${index + 1}`,
          value,
        }))
      }
    }
    return []
  }

  const chartData = parsePredictions()

  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          예측 결과
        </CardTitle>
        <CardDescription>
          {result.confidence && `신뢰도: ${(result.confidence * 100).toFixed(2)}%`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">차트</TabsTrigger>
            <TabsTrigger value="table">테이블</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            {chartData.length > 0 ? (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#predictionGradient)"
                    />
                    {chartData[0]?.max !== undefined && (
                      <>
                        <Line
                          type="monotone"
                          dataKey="max"
                          stroke="hsl(var(--warning))"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="min"
                          stroke="hsl(var(--success))"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                차트 데이터가 없습니다
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            {chartData.length > 0 ? (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left text-sm font-medium">시간</th>
                      <th className="p-3 text-left text-sm font-medium">예측값</th>
                      {chartData[0]?.max !== undefined && (
                        <>
                          <th className="p-3 text-left text-sm font-medium">최대값</th>
                          <th className="p-3 text-left text-sm font-medium">최소값</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-3 text-sm font-mono">{row.time}</td>
                        <td className="p-3 text-sm">{row.value.toFixed(2)}</td>
                        {row.max !== undefined && (
                          <>
                            <td className="p-3 text-sm text-warning">{row.max.toFixed(2)}</td>
                            <td className="p-3 text-sm text-success">{row.min.toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                테이블 데이터가 없습니다
              </div>
            )}
          </TabsContent>

          <TabsContent value="json" className="space-y-4">
            <div className="rounded-md border bg-muted/50 p-4">
              <pre className="text-sm overflow-x-auto font-mono">
                {formatJSON(result)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

