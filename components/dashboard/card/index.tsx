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
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-0 relative pb-4 md:pb-6 min-h-[60px]">
        <CardTitle className="flex items-center justify-center gap-2.5 text-center flex-wrap">
          <Bullet variant={intent} />
          <span className="leading-tight">{title}</span>
        </CardTitle>
        {addon && (
          <div className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 flex justify-center">{addon}</div>
        )}
      </CardHeader>

      <CardContent className="flex-1 relative">{children}</CardContent>
    </Card>
  )
}
