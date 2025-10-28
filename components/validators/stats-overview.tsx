"use client"

import type { Stats, Group, GroupFilter } from "@/types/validator"
import DashboardCard from "@/components/dashboard/card"

interface StatsOverviewProps {
  stats: Stats
  groups: Group[]
  selectedFilter: GroupFilter
  gnoPrice: number
}

export default function StatsOverview({ stats, groups, selectedFilter, gnoPrice }: StatsOverviewProps) {
  const getFilteredStats = () => {
    if (selectedFilter === "all") return stats

    const group = groups.find((g) => g.id === selectedFilter)
    if (!group) return stats

    return {
      ...stats,
      performance1h: group.performance,
    }
  }

  const filteredStats = getFilteredStats()

  const performance24h = 82.0
  const performance7d = 91.0
  const performance30d = 98.0

  const getPerformanceColor = (perf: number) => {
    if (perf > 90) return "text-success"
    if (perf > 80) return "text-warning"
    return "text-destructive"
  }

  return (
    <DashboardCard title="PERFORMANCE & STATS" intent="success">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">1H PERF</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg md:text-2xl font-display ${getPerformanceColor(filteredStats.performance1h)}`}>
                {filteredStats.performance1h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">24H PERF</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg md:text-2xl font-display ${getPerformanceColor(performance24h)}`}>
                {performance24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">7D PERF</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg md:text-2xl font-display ${getPerformanceColor(performance7d)}`}>
                {performance7d.toFixed(2)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">30D PERF</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg md:text-2xl font-display ${getPerformanceColor(performance30d)}`}>
                {performance30d.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border overflow-x-auto">
          <div className="min-w-[600px] md:min-w-0">
            <div className="grid grid-cols-6 gap-4 text-center pb-3 border-b border-border">
              <div className="text-xs text-muted-foreground">PERIOD</div>
              <div className="text-xs text-muted-foreground">APY%</div>
              <div className="text-xs text-muted-foreground">CONSENSUS</div>
              <div className="text-xs text-muted-foreground">MISSED</div>
              <div className="text-xs text-muted-foreground">EXECUTION</div>
              <div className="text-xs text-muted-foreground">TOTAL USD</div>
            </div>

            {/* Daily */}
            <div className="grid grid-cols-6 gap-4 text-center py-3 border-b border-border/50">
              <div className="text-sm font-medium">Day</div>
              <div className="text-sm font-display text-success">{filteredStats.apyDay.toFixed(2)}%</div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.gnoDay.toFixed(2)} GNO</div>
                <div className="text-xs text-muted-foreground">${(filteredStats.gnoDay * gnoPrice).toFixed(2)}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold text-destructive">
                  {filteredStats.missedDay.toFixed(2)} GNO
                </div>
                <div className="text-xs text-muted-foreground">${(filteredStats.missedDay * gnoPrice).toFixed(2)}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.xdaiDay.toFixed(2)} xDAI</div>
                <div className="text-xs text-muted-foreground">${filteredStats.xdaiDay.toFixed(2)}</div>
              </div>
              <div className="text-sm font-mono">${filteredStats.totalDay.toFixed(2)}</div>
            </div>

            {/* Weekly */}
            <div className="grid grid-cols-6 gap-4 text-center py-3 border-b border-border/50">
              <div className="text-sm font-medium">Week</div>
              <div className="text-sm font-display text-success">{filteredStats.apyWeek.toFixed(2)}%</div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.gnoWeek.toFixed(2)} GNO</div>
                <div className="text-xs text-muted-foreground">${(filteredStats.gnoWeek * gnoPrice).toFixed(2)}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold text-destructive">
                  {filteredStats.missedWeek.toFixed(2)} GNO
                </div>
                <div className="text-xs text-muted-foreground">${(filteredStats.missedWeek * gnoPrice).toFixed(2)}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.xdaiWeek.toFixed(2)} xDAI</div>
                <div className="text-xs text-muted-foreground">${filteredStats.xdaiWeek.toFixed(2)}</div>
              </div>
              <div className="text-sm font-mono">${filteredStats.totalWeek.toFixed(2)}</div>
            </div>

            {/* Monthly */}
            <div className="grid grid-cols-6 gap-4 text-center py-3">
              <div className="text-sm font-medium">Month</div>
              <div className="text-sm font-display text-success">{filteredStats.apyMonth.toFixed(2)}%</div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.gnoMonth.toFixed(2)} GNO</div>
                <div className="text-xs text-muted-foreground">${(filteredStats.gnoMonth * gnoPrice).toFixed(2)}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold text-destructive">
                  {filteredStats.missedMonth.toFixed(2)} GNO
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(filteredStats.missedMonth * gnoPrice).toFixed(2)}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-base font-mono font-semibold">{filteredStats.xdaiMonth.toFixed(2)} xDAI</div>
                <div className="text-xs text-muted-foreground">${filteredStats.xdaiMonth.toFixed(2)}</div>
              </div>
              <div className="text-sm font-mono">${filteredStats.totalMonth.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
