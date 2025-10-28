"use client"

import { useState } from "react"
import type { ValidatorEvent, Validator } from "@/types/validator"
import DashboardCard from "@/components/dashboard/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import ArrowRight from "@/components/icons/arrow-right"

interface EventsFeedProps {
  events: ValidatorEvent[]
  validators: Validator[]
}

export default function EventsFeed({ events, validators }: EventsFeedProps) {
  const [selectedValidator, setSelectedValidator] = useState<string>("all")

  const filterEventsByValidator = (eventList: ValidatorEvent[]) => {
    if (selectedValidator === "all") return eventList
    return eventList.filter((e) => e.validatorIndex.toString() === selectedValidator)
  }

  const allEvents = filterEventsByValidator(events)
  const incidents = filterEventsByValidator(events.filter((e) => e.type === "inactive" || e.type === "slashed"))
  const rewards = filterEventsByValidator(
    events.filter((e) => e.type === "partial_withdrawal" || e.type === "full_withdrawal"),
  )
  const blocks = filterEventsByValidator(events.filter((e) => e.type === "block_proposed"))
  const deposits = filterEventsByValidator(events.filter((e) => e.type === "deposit"))
  const withdrawals = filterEventsByValidator(
    events.filter((e) => e.type === "partial_withdrawal" || e.type === "full_withdrawal"),
  )
  const attestations = filterEventsByValidator(events.filter((e) => e.type === "attestation"))

  return (
    <DashboardCard
      title="EVENTS"
      intent="default"
      addon={
        <Select value={selectedValidator} onValueChange={setSelectedValidator}>
          <SelectTrigger className="w-32 md:w-40 h-8 text-xs md:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Validators</SelectItem>
            {validators.map((validator) => (
              <SelectItem key={validator.id} value={validator.index.toString()}>
                Val #{validator.index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:grid-cols-7 h-auto">
            <TabsTrigger value="all" className="h-10 flex-shrink-0 px-4 md:px-3">
              All
            </TabsTrigger>
            <TabsTrigger value="incidents" className="h-10 flex-shrink-0 px-4 md:px-3">
              Incidents
            </TabsTrigger>
            <TabsTrigger value="rewards" className="h-10 flex-shrink-0 px-4 md:px-3">
              Rewards
            </TabsTrigger>
            <TabsTrigger value="blocks" className="h-10 flex-shrink-0 px-4 md:px-3">
              Blocks
            </TabsTrigger>
            <TabsTrigger value="deposits" className="h-10 flex-shrink-0 px-4 md:px-3">
              Deposits
            </TabsTrigger>
            <TabsTrigger value="withdrawals" className="h-10 flex-shrink-0 px-4 md:px-3">
              Withdrawals
            </TabsTrigger>
            <TabsTrigger value="attestations" className="h-10 flex-shrink-0 px-4 md:px-3">
              Attestations
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-2 mt-4 min-h-[400px]">
          {allEvents.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="incidents" className="space-y-2 mt-4 min-h-[400px]">
          {incidents.length > 0 ? (
            incidents.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No incidents</p>
          )}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-2 mt-4 min-h-[400px]">
          {rewards.length > 0 ? (
            rewards.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No rewards</p>
          )}
        </TabsContent>

        <TabsContent value="blocks" className="space-y-2 mt-4 min-h-[400px]">
          {blocks.length > 0 ? (
            blocks.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No blocks proposed</p>
          )}
        </TabsContent>

        <TabsContent value="deposits" className="space-y-2 mt-4 min-h-[400px]">
          {deposits.length > 0 ? (
            deposits.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No deposits</p>
          )}
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-2 mt-4 min-h-[400px]">
          {withdrawals.length > 0 ? (
            withdrawals.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No withdrawals</p>
          )}
        </TabsContent>

        <TabsContent value="attestations" className="space-y-2 mt-4 min-h-[400px]">
          {attestations.length > 0 ? (
            attestations.map((event) => <EventItem key={event.id} event={event} />)
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No attestations</p>
          )}
        </TabsContent>
      </Tabs>
    </DashboardCard>
  )
}

interface EventItemProps {
  event: ValidatorEvent
}

function EventItem({ event }: EventItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getEventIcon = (type: ValidatorEvent["type"]) => {
    switch (type) {
      case "deposit":
        return "↓"
      case "partial_withdrawal":
        return "↑"
      case "full_withdrawal":
        return "⇈"
      case "inactive":
        return "⚠"
      case "block_proposed":
        return "■"
      case "sync_committee":
        return "⚡"
      case "slashed":
        return "✕"
      case "attestation":
        return "✓"
    }
  }

  const getEventVariant = (type: ValidatorEvent["type"]) => {
    switch (type) {
      case "deposit":
        return "default"
      case "partial_withdrawal":
      case "full_withdrawal":
        return "default"
      case "inactive":
      case "slashed":
        return "destructive"
      case "block_proposed":
      case "sync_committee":
      case "attestation":
        return "default"
    }
  }

  const getEventColor = (type: ValidatorEvent["type"]) => {
    switch (type) {
      case "deposit":
        return "text-chart-2"
      case "partial_withdrawal":
      case "full_withdrawal":
        return "text-success"
      case "inactive":
      case "slashed":
        return "text-destructive"
      case "block_proposed":
        return "text-chart-1"
      case "sync_committee":
        return "text-warning"
      case "attestation":
        return "text-positive"
    }
  }

  const formatEventType = (type: ValidatorEvent["type"]) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-2 md:gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors group cursor-pointer border border-border/50 hover:border-border">
          <div className={cn("text-xl md:text-2xl font-display flex-shrink-0", getEventColor(event.type))}>
            {getEventIcon(event.type)}
          </div>

          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant={getEventVariant(event.type)} className="text-xs">
                {formatEventType(event.type)}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">Val #{event.validatorIndex}</span>
            </div>
            <p className="text-sm line-clamp-2 md:line-clamp-1">{event.details}</p>
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-3 flex-shrink-0">
            {event.amount && (
              <span className="text-xs md:text-sm font-display text-success whitespace-nowrap">{event.amount} GNO</span>
            )}
            <span className="text-xs text-muted-foreground whitespace-nowrap hidden md:inline">
              {formatTime(event.timestamp)}
            </span>
            <ArrowRight
              className={cn(
                "size-5 text-foreground/60 transition-transform flex-shrink-0",
                isOpen && "rotate-90",
                "group-hover:text-foreground",
              )}
            />
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-3 py-3 ml-6 md:ml-11 space-y-2 text-sm border-l-2 border-border">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-xs md:text-sm">Validator Index</span>
            <span className="font-mono text-xs md:text-sm">{event.validatorIndex}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-xs md:text-sm">Timestamp</span>
            <span className="font-mono text-xs break-all">{new Date(event.timestamp).toISOString()}</span>
          </div>
          {event.amount && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground text-xs md:text-sm">Amount</span>
              <span className="font-display text-success text-xs md:text-sm">{event.amount} GNO</span>
            </div>
          )}
          {event.blockNumber && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground text-xs md:text-sm">Block Number</span>
              <span className="font-mono text-xs md:text-sm">{event.blockNumber.toLocaleString()}</span>
            </div>
          )}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">{event.details}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
