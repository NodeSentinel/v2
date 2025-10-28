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

  const performance24h = 99.5
  const performance7d = 98.8
  const performance30d = 97.2

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
          <div className="min-w-[500px] md:min-w-0">
            <div className="grid grid-cols-5 gap-4 text-center pb-3 border-b border-border">
              <div className="text-xs text-muted-foreground">PERIOD</div>
              <div className="text-xs text-muted-foreground">APY%</div>
              <div className="text-xs text-muted-foreground">CONSENSUS</div>
              <div className="text-xs text-muted-foreground">EXECUTION</div>
              <div className="text-xs text-muted-foreground">TOTAL USD</div>
            </div>

            {/* Daily */}
            <div className="grid grid-cols-5 gap-4 text-center py-2">
              <div className="text-sm font-medium">Day</div>
              <div className="text-sm font-display text-success">{filteredStats.apyDay.toFixed(2)}%</div>
              <div className="text-sm font-mono">{filteredStats.gnoDay.toFixed(2)} GNO</div>
              <div className="text-sm font-mono">{filteredStats.xdaiDay.toFixed(2)} xDAI</div>
              <div className="text-sm font-mono">${filteredStats.totalDay.toFixed(2)}</div>
            </div>

            {/* Weekly */}
            <div className="grid grid-cols-5 gap-4 text-center py-2">
              <div className="text-sm font-medium">Week</div>
              <div className="text-sm font-display text-success">{filteredStats.apyWeek.toFixed(2)}%</div>
              <div className="text-sm font-mono">{filteredStats.gnoWeek.toFixed(2)} GNO</div>
              <div className="text-sm font-mono">{filteredStats.xdaiWeek.toFixed(2)} xDAI</div>
              <div className="text-sm font-mono">${filteredStats.totalWeek.toFixed(2)}</div>
            </div>

            {/* Monthly */}
            <div className="grid grid-cols-5 gap-4 text-center py-2">
              <div className="text-sm font-medium">Month</div>
              <div className="text-sm font-display text-success">{filteredStats.apyMonth.toFixed(2)}%</div>
              <div className="text-sm font-mono">{filteredStats.gnoMonth.toFixed(2)} GNO</div>
              <div className="text-sm font-mono">{filteredStats.xdaiMonth.toFixed(2)} xDAI</div>
              <div className="text-sm font-mono">${filteredStats.totalMonth.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
