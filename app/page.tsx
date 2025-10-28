"use client"

import { useState } from "react"
import StatsOverview from "@/components/validators/stats-overview"
import AttestationsChart from "@/components/validators/attestations-chart"
import EventsFeed from "@/components/validators/events-feed"
import GroupList from "@/components/validators/group-list"
import NotificationBanner, { type Notification } from "@/components/validators/notification-banner"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData, GroupFilter } from "@/types/validator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, Coins, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

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

  const totalStakedGno = 350000
  const totalStakedUsd = (totalStakedGno * validatorData.stats.gnoPrice).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <NotificationBanner notifications={demoNotifications} />

      <div className="space-y-3">
        <h2 className="text-sm md:text-base font-display text-primary uppercase tracking-wider">Chain Statistics</h2>
        <div className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* GNO Price Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">GNO Price</p>
                <p className="text-xl md:text-2xl font-display font-bold">${validatorData.stats.gnoPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Active Validators Card */}
            <div className="bg-chart-2/5 border border-chart-2/20 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Validators</p>
                <p className="text-xl md:text-2xl font-display font-bold">450,450</p>
              </div>
            </div>

            {/* Staked GNO Card */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Coins className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Staked</p>
                <p className="text-xl md:text-2xl font-display font-bold">{totalStakedGno.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">GNO</p>
                <p className="text-xs text-muted-foreground">${totalStakedUsd}</p>
              </div>
            </div>

            {/* Joining/Leaving Card */}
            <div className="bg-muted/30 border border-border rounded-lg p-4">
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
        <Select value={selectedGroup} onValueChange={(value) => setSelectedGroup(value as GroupFilter)}>
          <SelectTrigger className="w-full sm:w-64 h-12 md:h-14 text-base md:text-lg font-medium border-2 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-base md:text-lg">
              All Groups
            </SelectItem>
            {validatorData.groups.map((group) => (
              <SelectItem key={group.id} value={group.id} className="text-base md:text-lg">
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GroupList groups={validatorData.groups} selectedFilter={selectedGroup} />

      <StatsOverview
        stats={validatorData.stats}
        groups={validatorData.groups}
        selectedFilter={selectedGroup}
        gnoPrice={validatorData.stats.gnoPrice}
      />

      <AttestationsChart data={validatorData.missedAttestations} />

      <EventsFeed events={validatorData.events} validators={validatorData.groups.flatMap((g) => g.validators)} />
    </div>
  )
}
