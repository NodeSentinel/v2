"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Server, Bell, Plus, Sun, Moon } from "lucide-react"
import Link from "next/link"
import GroupForm from "./group-form"
import AlertConfiguration from "./alert-configuration"
import validatorMockJson from "@/validator-mock.json"
import type { ValidatorData } from "@/types/validator"

const validatorData = validatorMockJson as ValidatorData

export default function ValidatorHeader() {
  const [groupFormOpen, setGroupFormOpen] = React.useState(false)
  const [alertsOpen, setAlertsOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("dark")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 bg-primary rounded flex items-center justify-center">
                <Server className="size-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl hidden sm:inline-block">Validator Monitor</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setGroupFormOpen(true)}>
                <Plus className="size-4 mr-2" />
                Add Group
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setAlertsOpen(true)}>
                <Bell className="size-4 mr-2" />
                Configure Alerts
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </nav>

            <div className="flex md:hidden items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setGroupFormOpen(true)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <Plus className="size-4 mr-2" />
                      Add Group
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setAlertsOpen(true)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <Bell className="size-4 mr-2" />
                      Configure Alerts
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={groupFormOpen} onOpenChange={setGroupFormOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="mt-6">
            <GroupForm group={null} onClose={() => setGroupFormOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={alertsOpen} onOpenChange={setAlertsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="mt-6">
            <AlertConfiguration config={validatorData.alertConfig} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
