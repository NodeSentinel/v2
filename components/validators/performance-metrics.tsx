"use client"

import { useMemo, useState } from "react"
import type { MissedAttestation } from "@/types/validator"
import DashboardCard from "@/components/dashboard/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PerformanceMetricsProps {
  data: MissedAttestation[]
}

type TimeRange = "1h" | "24h" | "7d"
type MetricType = "attestations" | "rewards"

export default function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1h")
  const [metricType, setMetricType] = useState<MetricType>("attestations")

  const chartData = useMemo(() => {
    const now = new Date()
    let filteredData = [...data]

    if (timeRange === "1h") {
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      filteredData = data.filter((item) => new Date(item.timestamp) >= oneHourAgo)
    } else if (timeRange === "24h") {
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      filteredData = data.filter((item) => new Date(item.timestamp) >= oneDayAgo)
    }

    // Generate mock data if filtered data is empty
    if (filteredData.length === 0) {
      const mockData: MissedAttestation[] = []
      const intervals = timeRange === "1h" ? 12 : timeRange === "24h" ? 24 : 7
      const intervalMs = timeRange === "1h" ? 5 * 60 * 1000 : timeRange === "24h" ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000

      for (let i = 0; i < intervals; i++) {
        const timestamp = new Date(now.getTime() - (intervals - i) * intervalMs)
        mockData.push({
          timestamp: timestamp.toISOString(),
          count: Math.floor(Math.random() * 5),
          validatorCount: Math.floor(Math.random() * 3) + 1,
        })
      }
      filteredData = mockData
    }

    return filteredData.map((item) => {
      const date = new Date(item.timestamp)
      let timeLabel = ""

      if (timeRange === "1h") {
        timeLabel = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      } else if (timeRange === "24h") {
        timeLabel = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      } else {
        timeLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      }

      const totalPossible = 1.0
      const missedPercentage = Math.random() * 0.15 // 0-15% missed
      const earned = totalPossible * (1 - missedPercentage)
      const missed = totalPossible * missedPercentage

      return {
        time: timeLabel,
        // Attestations data
        missedValue: item.count * item.validatorCount,
        slot: item.count,
        validators: item.validatorCount,
        // Rewards data
        earned: Number(earned.toFixed(3)),
        missed: Number(missed.toFixed(3)),
        total: totalPossible,
      }
    })
  }, [data, timeRange])

  const stats = useMemo(() => {
    if (metricType === "attestations") {
      const totalMissed = chartData.reduce((sum, item) => sum + item.slot, 0)
      const maxValidators = chartData.length > 0 ? Math.max(...chartData.map((item) => item.validators)) : 0
      return { totalMissed, maxValidators }
    } else {
      const totalEarned = chartData.reduce((sum, item) => sum + item.earned, 0)
      const totalMissed = chartData.reduce((sum, item) => sum + item.missed, 0)
      return { totalEarned: totalEarned.toFixed(2), totalMissed: totalMissed.toFixed(2) }
    }
  }, [chartData, metricType])

  return (
    <DashboardCard
      title="PERFORMANCE METRICS"
      intent="default"
      addon={
        <div className="flex items-center gap-2">
          <Select value={metricType} onValueChange={(value) => setMetricType(value as MetricType)}>
            <SelectTrigger className="w-28 md:w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attestations">Attestations</SelectItem>
              <SelectItem value="rewards">Rewards</SelectItem>
            </SelectContent>
          </Select>

          {/* Time range selector */}
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <SelectTrigger className="w-16 md:w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="24h" disabled>
                24h
              </SelectItem>
              <SelectItem value="7d" disabled>
                7d
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <div className="space-y-4">
        {metricType === "attestations" ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4 pb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">TOTAL MISSED</p>
              <span className="text-xl md:text-2xl font-display text-destructive">{stats.totalMissed}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">MAX VALIDATORS</p>
              <span className="text-xl md:text-2xl font-display text-warning">{stats.maxValidators}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 pb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">TOTAL EARNED</p>
              <span className="text-xl md:text-2xl font-display text-success">{stats.totalEarned} GNO</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">TOTAL MISSED</p>
              <span className="text-xl md:text-2xl font-display text-destructive">{stats.totalMissed} GNO</span>
            </div>
          </div>
        )}

        {metricType === "attestations" ? (
          <ChartContainer
            config={{
              missedValue: {
                label: "Missed",
                color: "#fbbf24",
              },
            }}
            className="h-[250px] md:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#888888" }}
                />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: "#888888" }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">Slots:</span>
                            <span className="text-sm font-display">{data.slot}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">Validators:</span>
                            <span className="text-sm font-display">{data.validators}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="missedValue" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={{
              earned: {
                label: "Earned",
                color: "#10b981",
              },
              missed: {
                label: "Missed",
                color: "#ef4444",
              },
            }}
            className="h-[250px] md:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#888888" }}
                />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: "#888888" }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">Earned:</span>
                            <span className="text-sm font-display text-success">{data.earned} GNO</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">Missed:</span>
                            <span className="text-sm font-display text-destructive">{data.missed} GNO</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 pt-1 border-t">
                            <span className="text-xs text-muted-foreground">Total:</span>
                            <span className="text-sm font-display">{data.total} GNO</span>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="earned" stackId="rewards" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="missed" stackId="rewards" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
    </DashboardCard>
  )
}
