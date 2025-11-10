"use client"

import { useState } from "react"
import AttestationsChart from "@/components/validators/attestations-chart"
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
    message: "Fukuoka hard fork will be activated on January 15, 2025. Be sure you update your nodes.",
  },
]

export default function DashboardOverview() {
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>("all")
  const [groupFormOpen, setGroupFormOpen] = useState(false)

  const totalStakedGno = 350000
  const totalStakedUsd = (totalStakedGno * validatorData.stats.gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <NotificationBanner notifications={demoNotifications} />

      <div className="space-y-3">
        <h2 className="text-sm md:text-base font-display text-primary uppercase tracking-wider">Chain Statistics</h2>
        <div className="bg-card border-2 border-primary/30 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* GNO Price Card */}
            <div className="bg-muted/50 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">GNO Price</span>
                </div>
                <span className="text-lg font-display font-bold text-primary">
                  ${validatorData.stats.gnoPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Active Validators Card */}
            <div className="bg-chart-2/10 border border-chart-2/30 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-chart-2/20 rounded-lg">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Validators</p>
                <p className="text-xl md:text-2xl font-display font-bold">450,450</p>
              </div>
            </div>

            {/* Staked GNO Card */}
            <div className="bg-muted/50 border border-primary/20 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Staked</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-display font-bold text-primary">
                      {totalStakedGno.toLocaleString()} GNO
                    </span>
                    <div className="text-xs text-muted-foreground">${totalStakedUsd}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Joining/Leaving Card */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUpCircle className="w-4 h-4 text-chart-2" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Joining</span>
                  </div>
                  <span className="text-lg font-display font-bold text-chart-2">2,345</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownCircle className="w-4 h-4 text-warning" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Leaving</span>
                  </div>
                  <span className="text-lg font-display font-bold text-warning">500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm md:text-base font-display text-primary uppercase tracking-wider">User Dashboard</h2>
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            {/* Left side - Group selector */}
            <div className="flex-1 min-w-0">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Select Group</label>
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

            {/* Right side - Action buttons */}
            <div className="flex items-end gap-3 shrink-0">
              <Button variant="outline" className="h-11 bg-transparent" onClick={() => setGroupFormOpen(true)}>
                <Plus className="size-4 mr-2" />
                Add Group
              </Button>
            </div>
          </div>
        </div>
      </div>

      <GroupList
        groups={validatorData.groups}
        selectedFilter={selectedGroup}
        stats={validatorData.stats}
        gnoPrice={validatorData.stats.gnoPrice}
      />

      <AttestationsChart data={validatorData.missedAttestations} />

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
