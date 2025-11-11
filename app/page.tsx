"use client"

import { useState, useEffect } from "react"
import PerformanceMetrics from "@/components/validators/performance-metrics"
import EventsFeed from "@/components/validators/events-feed"
import GroupList from "@/components/validators/group-list"
import NotificationBanner, { type Notification } from "@/components/validators/notification-banner"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData, GroupFilter } from "@/types/validator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Coins, ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import GroupForm from "@/components/validators/group-form"
import { Skeleton } from "@/components/ui/skeleton"

const validatorData = validatorMockJson as ValidatorData

const demoNotifications: Notification[] = [
  {
    id: "fee-recipient-warning",
    type: "warning",
    message: "You have not set the fee recipient address for group Alpha.",
  },
  {
    id: "hard-fork-info",
    type: "info",
    message: "Fusaka hard fork will be activated on January 15, 2025. Be sure you update your nodes.",
  },
]

export default function DashboardOverview() {
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>("all")
  const [groupFormOpen, setGroupFormOpen] = useState(false)

  const [chainStatsLoading, setChainStatsLoading] = useState(true)
  const [groupDataLoading, setGroupDataLoading] = useState(true)
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    // Random delays between 2-5 seconds for each section
    const chainStatsDelay = Math.random() * 3000 + 2000
    const groupDataDelay = Math.random() * 3000 + 2000
    const metricsDelay = Math.random() * 3000 + 2000
    const eventsDelay = Math.random() * 3000 + 2000

    const chainStatsTimer = setTimeout(() => setChainStatsLoading(false), chainStatsDelay)
    const groupDataTimer = setTimeout(() => setGroupDataLoading(false), groupDataDelay)
    const metricsTimer = setTimeout(() => setMetricsLoading(false), metricsDelay)
    const eventsTimer = setTimeout(() => setEventsLoading(false), eventsDelay)

    return () => {
      clearTimeout(chainStatsTimer)
      clearTimeout(groupDataTimer)
      clearTimeout(metricsTimer)
      clearTimeout(eventsTimer)
    }
  }, [])

  const totalStakedGno = 350000
  const gnoPrice = validatorData.stats.gnoPrice
  const activeValidators = 450450
  const joiningValidators = 2300
  const leavingValidators = 500

  const activeStakedGno = activeValidators * 32
  const joiningStakedGno = joiningValidators * 32
  const leavingStakedGno = leavingValidators * 32

  const totalStakedUsd = (totalStakedGno * gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })
  const activeStakedUsd = (activeStakedGno * gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })
  const joiningStakedUsd = (joiningStakedGno * gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })
  const leavingStakedUsd = (leavingStakedGno * gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })

  return (
    <div className="py-3 md:py-8 space-y-4 md:space-y-8">
      <NotificationBanner notifications={demoNotifications} />

      {/* Chain Statistics */}
      <div className="space-y-2">
        <h2 className="text-xs md:text-sm font-display text-muted-foreground uppercase tracking-wider">
          Chain Statistics
        </h2>
        {chainStatsLoading ? (
          <ChainStatsSkeleton />
        ) : (
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4 md:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {/* Active Validators Card */}
              <div className="bg-background border border-border/60 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-chart-2/10 rounded-lg">
                    <Users className="w-4 h-4 text-chart-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Active</p>
                    <p className="text-2xl font-display font-bold text-foreground truncate">
                      {activeValidators.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">${activeStakedUsd}</p>
                  </div>
                </div>
              </div>

              {/* Staked GNO Card */}
              <div className="bg-background border border-border/60 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Coins className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Staked</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-display font-bold text-foreground">
                        {(totalStakedGno / 1000).toFixed(0)}k
                      </span>
                      <span className="text-sm text-muted-foreground font-medium">GNO</span>
                    </div>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">${totalStakedUsd}</p>
                  </div>
                </div>
              </div>

              {/* Joining/Leaving Card */}
              <div className="bg-background border border-border/60 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-chart-2/10 rounded">
                        <ArrowUpCircle className="w-3.5 h-3.5 text-chart-2" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Joining</span>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-display font-bold text-chart-2">2.3k</p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">${joiningStakedUsd}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-warning/10 rounded">
                        <ArrowDownCircle className="w-3.5 h-3.5 text-warning" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Leaving</span>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-display font-bold text-warning">500</p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">${leavingStakedUsd}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Dashboard */}
      <div className="space-y-2.5 md:space-y-3">
        <h2 className="text-sm md:text-base font-display text-primary uppercase tracking-wider">User Dashboard</h2>
        <div className="bg-card border border-border rounded-lg p-3 md:p-6">
          <div className="flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-2 block">
                Select Group
              </label>
              <Select value={selectedGroup} onValueChange={(value) => setSelectedGroup(value as GroupFilter)}>
                <SelectTrigger className="w-full h-10 text-base font-medium border-2 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-base">
                    All Groups
                  </SelectItem>
                  {validatorData.groups.map((group) => (
                    <SelectItem key={group.id} value={group.id} className="text-base">
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="h-10 bg-transparent shrink-0" onClick={() => setGroupFormOpen(true)}>
              <Plus className="size-4 mr-2" />
              Add Group
            </Button>
          </div>
        </div>
      </div>

      {/* Group Data with Skeleton */}
      {groupDataLoading ? (
        <GroupDataSkeleton />
      ) : (
        <GroupList
          groups={validatorData.groups}
          selectedFilter={selectedGroup}
          stats={validatorData.stats}
          gnoPrice={validatorData.stats.gnoPrice}
        />
      )}

      {/* Performance Metrics with Skeleton */}
      {metricsLoading ? <PerformanceMetricsSkeleton /> : <PerformanceMetrics data={validatorData.missedAttestations} />}

      {/* Events Feed with Skeleton */}
      {eventsLoading ? (
        <EventsFeedSkeleton />
      ) : (
        <EventsFeed events={validatorData.events} validators={validatorData.groups.flatMap((g) => g.validators)} />
      )}

      <Sheet open={groupFormOpen} onOpenChange={setGroupFormOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="mt-6">
            <GroupForm group={null} onClose={() => setGroupFormOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function ChainStatsSkeleton() {
  return (
    <div className="bg-muted/30 border border-border/50 rounded-lg p-4 md:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background border border-border/60 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GroupDataSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="px-4 py-3 min-h-[52px] flex items-center justify-between border-b border-border">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Validators by status */}
        <div className="flex items-center gap-3 md:gap-4 flex-wrap pb-2.5 md:pb-3 border-b border-border/50">
          <Skeleton className="h-4 w-24" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Balances */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4 pb-3.5 md:pb-4 border-b border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Performance */}
        <div className="pb-3.5 md:pb-4 border-b border-border">
          <Skeleton className="h-3 w-24 mb-2.5 md:mb-3" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="space-y-3">
          <div className="grid grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-3 w-full" />
            ))}
          </div>
          {[1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <Skeleton key={col} className="h-6 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PerformanceMetricsSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="px-4 py-3 min-h-[52px] flex items-center justify-between border-b border-border">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        {/* Chart */}
        <Skeleton className="h-[250px] md:h-[300px] w-full rounded-lg" />
      </div>
    </div>
  )
}

function EventsFeedSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="px-4 py-3 min-h-[52px] flex items-center justify-between border-b border-border">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-48 md:w-64" />
      </div>
      <div className="p-4 md:p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-32 flex-shrink-0 rounded" />
          ))}
        </div>
        {/* Event items */}
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full max-w-md" />
                </div>
                <Skeleton className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
