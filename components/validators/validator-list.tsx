import type { Validator } from "@/types/validator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ValidatorListProps {
  validators: Validator[]
}

export default function ValidatorList({ validators }: ValidatorListProps) {
  const getStatusVariant = (status: Validator["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "destructive"
      case "pending":
        return "secondary"
      case "exited":
        return "outline"
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Missed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {validators.map((validator) => (
            <TableRow key={validator.id}>
              <TableCell className="font-mono text-sm">{validator.index}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(validator.status)}>{validator.status}</Badge>
              </TableCell>
              <TableCell className="font-display">{validator.balance.toFixed(2)} GNO</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "font-display",
                    validator.performance >= 99
                      ? "text-success"
                      : validator.performance >= 95
                        ? "text-warning"
                        : "text-destructive",
                  )}
                >
                  {validator.performance.toFixed(1)}%
                </span>
              </TableCell>
              <TableCell className="font-mono text-sm">{validator.missedAttestations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
