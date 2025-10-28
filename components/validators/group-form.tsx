"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { Group } from "@/types/validator"
import { Badge } from "@/components/ui/badge"

interface GroupFormProps {
  group: Group | null
  onClose: () => void
}

type ValidatorInput = {
  id: string
  type: "withdrawal" | "index"
  value: string
}

export default function GroupForm({ group, onClose }: GroupFormProps) {
  const [name, setName] = useState(group?.name || "")
  const [feeRecipient, setFeeRecipient] = useState(group?.feeRecipientAddress || "")
  const [validatorInputs, setValidatorInputs] = useState<ValidatorInput[]>(
    group
      ? [
          ...group.withdrawalAddresses.map((addr, i) => ({
            id: `w-${i}`,
            type: "withdrawal" as const,
            value: addr,
          })),
          ...group.validatorIndices.map((idx, i) => ({
            id: `i-${i}`,
            type: "index" as const,
            value: idx.toString(),
          })),
        ]
      : [{ id: "1", type: "withdrawal", value: "" }],
  )

  const addValidatorInput = (type: "withdrawal" | "index") => {
    setValidatorInputs([
      ...validatorInputs,
      {
        id: Date.now().toString(),
        type,
        value: "",
      },
    ])
  }

  const removeValidatorInput = (id: string) => {
    setValidatorInputs(validatorInputs.filter((input) => input.id !== id))
  }

  const updateValidatorInput = (id: string, value: string) => {
    setValidatorInputs(validatorInputs.map((input) => (input.id === id ? { ...input, value } : input)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Group form submitted:", { name, feeRecipient, validatorInputs })
    onClose()
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this group?")) {
      console.log("[v0] Deleting group:", group?.id)
      onClose()
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display">{group ? "Manage Group" : "Add Group"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Group Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Group Alpha"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="feeRecipient">Execution Rewards Fee Recipient Address</Label>
          <Input
            id="feeRecipient"
            value={feeRecipient}
            onChange={(e) => setFeeRecipient(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Validators</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => addValidatorInput("withdrawal")}>
                <Plus className="size-3 mr-1" />
                Withdrawal Address
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => addValidatorInput("index")}>
                <Plus className="size-3 mr-1" />
                Validator Index
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {validatorInputs.map((input) => (
              <div key={input.id} className="flex items-center gap-2">
                <Badge variant="secondary" className="shrink-0">
                  {input.type === "withdrawal" ? "Withdrawal" : "Index"}
                </Badge>
                <Input
                  value={input.value}
                  onChange={(e) => updateValidatorInput(input.id, e.target.value)}
                  placeholder={input.type === "withdrawal" ? "0x..." : "123456"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeValidatorInput(input.id)}
                  disabled={validatorInputs.length === 1}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {group ? "Save Changes" : "Add Group"}
          </Button>
          {group && (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              <Trash2 className="size-4 mr-2" />
              Delete Group
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
