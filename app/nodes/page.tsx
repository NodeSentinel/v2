import NodeList from "@/components/validators/node-list"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData } from "@/types/validator"

const validatorData = validatorMockJson as ValidatorData

export default function NodesPage() {
  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-display mb-2">Nodes</h1>
        <p className="text-sm text-muted-foreground">Manage your validator nodes</p>
      </div>

      <NodeList nodes={validatorData.nodes} />
    </div>
  )
}
