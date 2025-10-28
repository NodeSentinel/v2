import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bullet } from "@/components/ui/bullet"

interface DashboardCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title: React.ReactNode
  addon?: React.ReactNode
  intent?: "default" | "success"
  children: React.ReactNode
}

export default function DashboardCard({
  title,
  addon,
  intent = "default",
  children,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-center relative pb-4 md:pb-6">
        <CardTitle className="flex items-center justify-center gap-2.5 text-center flex-wrap">
          <Bullet variant={intent} />
          <span className="leading-tight">{title}</span>
        </CardTitle>
        {addon && <div className="absolute right-4 md:right-6 top-4 md:top-6">{addon}</div>}
      </CardHeader>

      <CardContent className="flex-1 relative">{children}</CardContent>
    </Card>
  )
}
