"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookingCalendar } from "@/components/booking-calendar"

interface ApplicationFormProps {
  children: React.ReactNode
}

export function ApplicationForm({ children }: ApplicationFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto p-0 w-full">
        <BookingCalendar onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}