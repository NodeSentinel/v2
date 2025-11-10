"use client"

import { useState } from "react"
import PerformanceMetrics from "@/components/validators/performance-metrics"
import EventsFeed from "@/components/validators/events-feed"
import GroupList from "@/components/validators/group-list"
import NotificationBanner, { type Notification } from "@/components/validators/notification-banner"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData, GroupFilter } from "@/types/validator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, Coins, ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import GroupForm from "@/components/validators/group-form"

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

      <div className="space-y-2">
        <h2 className="text-xs md:text-sm font-display text-muted-foreground uppercase tracking-wider">
          Chain Statistics
        </h2>
        <div className="bg-muted/30 border border-border/50 rounded-lg p-4 md:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* GNO Price Card */}
            <div className="bg-background border border-border/60 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">GNO Price</p>
                  <p className="text-2xl font-display font-bold text-foreground">${gnoPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>

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
            <div className="bg-background border border-border/60 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-chart-2/10 rounded">
                      <ArrowUpCircle className="w-3.5 h-3.5 text-chart-2" />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Joining</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-chart-2">2.3k</p>
                    <p className="text-xs text-muted-foreground/80">${joiningStakedUsd}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-warning/10 rounded">
                      <ArrowDownCircle className="w-3.5 h-3.5 text-warning" />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Leaving</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-warning">500</p>
                    <p className="text-xs text-muted-foreground/80">${leavingStakedUsd}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 md:space-y-3">
        <h2 className="text-sm md:text-base font-display text-primary uppercase tracking-wider">User Dashboard</h2>
        <div className="bg-card border border-border rounded-lg p-3 md:p-6">
          <div className="flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-2 block">
                Select Group
              </label>
              <Select value={selectedGroup} onValueChange={(value) => setSelectedGroup(value as GroupFilter)}>
                <SelectTrigger className="w-full h-11 text-base font-medium border-2 bg-background">
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

            <Button variant="outline" className="h-11 bg-transparent shrink-0" onClick={() => setGroupFormOpen(true)}>
              <Plus className="size-4 mr-2" />
              Add Group
            </Button>
          </div>
        </div>
      </div>

      <GroupList
        groups={validatorData.groups}
        selectedFilter={selectedGroup}
        stats={validatorData.stats}
        gnoPrice={validatorData.stats.gnoPrice}
      />

      <PerformanceMetrics data={validatorData.missedAttestations} />

      <EventsFeed events={validatorData.events} validators={validatorData.groups.flatMap((g) => g.validators)} />

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
