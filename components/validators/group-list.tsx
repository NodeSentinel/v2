"use client"

import { useState } from "react"
import type { Group, GroupFilter } from "@/types/validator"
import GroupCard from "./group-card"
import GroupForm from "./group-form"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData } from "@/types/validator"

const validatorData = validatorMockJson as ValidatorData

interface GroupListProps {
  groups: Group[]
  selectedFilter: GroupFilter
}

function getAggregatedGroup(groups: Group[]): Group {
  const totalValidators = groups.reduce((sum, group) => sum + group.validators.length, 0)
  const allValidators = groups.flatMap((group) => group.validators)
  const totalBalance = groups.reduce((sum, group) => sum + group.totalBalance, 0)
  const totalEffectiveBalance = groups.reduce((sum, group) => sum + group.totalEffectiveBalance, 0)
  const totalClaimable = groups.reduce((sum, group) => sum + group.claimableRewards, 0)
  const avgPerformance = groups.reduce((sum, group) => sum + group.performance, 0) / groups.length

  return {
    id: "all",
    name: "All Groups",
    withdrawalAddresses: [],
    feeRecipientAddress: "-",
    validatorIndices: [],
    validators: allValidators,
    totalBalance,
    totalEffectiveBalance,
    claimableRewards: totalClaimable,
    performance: avgPerformance,
  }
}

export default function GroupList({ groups, selectedFilter }: GroupListProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleManage = (group: Group) => {
    setSelectedGroup(group)
    setIsFormOpen(true)
  }

  const displayGroup =
    selectedFilter === "all" ? getAggregatedGroup(groups) : groups.find((g) => g.id === selectedFilter) || groups[0]

  return (
    <>
      <GroupCard
        group={displayGroup}
        onManage={() => handleManage(displayGroup)}
        gnoPrice={validatorData.stats.gnoPrice}
      />

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="mt-6">
            <GroupForm group={selectedGroup} onClose={() => setIsFormOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
