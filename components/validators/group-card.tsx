"use client";

import type { Group } from "@/types/validator";
import DashboardCard from "@/components/dashboard/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  group: Group;
  onManage: () => void;
  gnoPrice: number; // Added gnoPrice prop
}

export default function GroupCard({
  group,
  onManage,
  gnoPrice,
}: GroupCardProps) {
  const statusCounts = group.validators.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusDisplay = () => {
    const displays: { emoji: string; count: number; label: string }[] = [];

    if (statusCounts.active)
      displays.push({
        emoji: "🟢",
        count: statusCounts.active,
        label: "active",
      });
    if (statusCounts.inactive)
      displays.push({
        emoji: "🟡",
        count: statusCounts.inactive,
        label: "inactive",
      });
    if (statusCounts.active_exiting)
      displays.push({
        emoji: "🟠",
        count: statusCounts.active_exiting,
        label: "active exiting",
      });
    if (statusCounts.slashed)
      displays.push({
        emoji: "🚫",
        count: statusCounts.slashed,
        label: "slashed",
      });
    if (statusCounts.exited)
      displays.push({
        emoji: "🔚",
        count: statusCounts.exited,
        label: "exited",
      });

    return displays;
  };

  const totalValidators = group.validators.length;

  const balanceUsd = (group.totalBalance * gnoPrice).toFixed(2);
  const effectiveBalanceUsd = (group.totalEffectiveBalance * gnoPrice).toFixed(
    0
  );
  const claimableUsd = (group.claimableRewards * gnoPrice).toFixed(2);

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
          <span>{group.name}</span>
          <Badge
            variant="outline"
            className="text-base md:text-lg font-display px-3 md:px-4 py-1"
          >
            {totalValidators} validators
          </Badge>
        </div>
      }
      intent={group.performance >= 98 ? "success" : "default"}
    >
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">BALANCE</p>
            <span className="text-lg md:text-xl font-display">
              {group.totalBalance.toFixed(2)} GNO
            </span>
            <p className="text-xs text-muted-foreground">${balanceUsd}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              EFFECTIVE BALANCE
            </p>
            <span className="text-lg md:text-xl font-display">
              {group.totalEffectiveBalance.toFixed(0)} GNO
            </span>
            <p className="text-xs text-muted-foreground">
              ${effectiveBalanceUsd}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">CLAIMABLE</p>
            <span className="text-lg md:text-xl font-display text-success">
              {group.claimableRewards.toFixed(2)} GNO
            </span>
            <p className="text-xs text-muted-foreground">${claimableUsd}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">VALIDATORS</p>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base">
            {getStatusDisplay().map((status, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="text-base md:text-lg">{status.emoji}</span>
                <span className="font-medium">{status.count}</span>
                <span className="text-xs text-muted-foreground">
                  {status.label}
                </span>
                {idx < getStatusDisplay().length - 1 && (
                  <span className="text-muted-foreground ml-1">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={onManage}
        >
          <Settings className="size-4 mr-2" />
          Manage
        </Button>
      </div>
    </DashboardCard>
  );
}
