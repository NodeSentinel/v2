"use client"

import type { Node } from "@/types/validator"
import DashboardCard from "@/components/dashboard/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NodeCardProps {
  node: Node
  onClick: () => void
}

export default function NodeCard({ node, onClick }: NodeCardProps) {
  const activeValidators = node.validators.filter((v) => v.status === "active").length
  const inactiveValidators = node.validators.filter((v) => v.status === "inactive").length

  return (
    <DashboardCard
      title={node.name}
      intent={node.performance >= 98 ? "success" : "default"}
      className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">VALIDATORS</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display">{node.validators.length}</span>
              {inactiveValidators > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {inactiveValidators} inactive
                </Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">PERFORMANCE</p>
            <span
              className={cn(
                "text-2xl font-display",
                node.performance >= 98 ? "text-success" : node.performance >= 95 ? "text-warning" : "text-destructive",
              )}
            >
              {node.performance.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">BALANCE</p>
            <span className="text-lg font-display">{node.totalBalance.toFixed(2)} GNO</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">CLAIMABLE</p>
            <span className="text-lg font-display text-success">{node.claimableRewards.toFixed(2)} GNO</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">WITHDRAWAL ADDRESS</p>
            <code className="text-xs font-mono">{node.withdrawalAddress}</code>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">FEE ADDRESS</p>
            <code className="text-xs font-mono">{node.feeAddress}</code>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
