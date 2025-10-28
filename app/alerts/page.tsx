import DashboardPageLayout from "@/components/dashboard/layout"
import AlertConfiguration from "@/components/validators/alert-configuration"
import GearIcon from "@/components/icons/gear"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData } from "@/types/validator"

const validatorData = validatorMockJson as ValidatorData

export default function AlertsPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Alerts",
        description: "Configure monitoring alerts",
        icon: GearIcon,
      }}
    >
      <AlertConfiguration config={validatorData.alertConfig} />
    </DashboardPageLayout>
  )
}
