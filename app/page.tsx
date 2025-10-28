"use client"

import { useState } from "react"
import StatsOverview from "@/components/validators/stats-overview"
import AttestationsChart from "@/components/validators/attestations-chart"
import EventsFeed from "@/components/validators/events-feed"
import GroupList from "@/components/validators/group-list"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData, GroupFilter } from "@/types/validator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const validatorData = validatorMockJson as ValidatorData

export default function DashboardOverview() {
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>("all")

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm md:text-base font-display px-3 py-1.5">
              GNO ${validatorData.stats.gnoPrice.toFixed(2)}
            </Badge>
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-muted-foreground">ACTIVE VALIDATORS</span>
                <span className="font-display">450,450</span>
              </div>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-muted-foreground">STAKED</span>
                <span className="font-display">350,000 GNO</span>
              </div>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-muted-foreground">JOINING</span>
                <span className="font-display text-chart-2">2,345</span>
              </div>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-muted-foreground">LEAVING</span>
                <span className="font-display text-warning">500</span>
              </div>
            </div>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground">Updated: {validatorData.stats.lastUpdated}</p>
        </div>

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
