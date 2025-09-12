"use client"

import Cal from "@calcom/embed-react"
import { Calendar, MessageCircle, CheckCircle, ArrowDown, X } from "lucide-react"
import { useState, useEffect } from "react"

interface BookingCalendarProps {
  onClose?: () => void;
}

export function BookingCalendar({ onClose }: BookingCalendarProps) {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'cal:booking-successful') {
        setIsBooked(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (isBooked) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center space-y-6">
        <div className="flex justify-between items-start mb-4">
          <div></div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Thank You for Booking a Call!
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            We&apos;ve received your booking and you&apos;ll receive a confirmation email shortly.
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">What&apos;s Next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <div>
                <p className="font-medium text-gray-900">Check Your Email</p>
                <p className="text-sm text-gray-600">You&apos;ll receive a calendar invite with meeting details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <div>
                <p className="font-medium text-gray-900">Prepare for the Call</p>
                <p className="text-sm text-gray-600">Think about your business goals and current challenges</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <div>
                <p className="font-medium text-gray-900">Join the Meeting</p>
                <p className="text-sm text-gray-600">We&apos;ll discuss your custom business solution strategy</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          Need to reschedule? Use the link in your confirmation email.
        </p>
        
        {onClose && (
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Happens Next?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Here&apos;s your simple 3-step process:
          </p>
        </div>

        {/* Horizontal Process Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">1</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl">Book Your Call</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Schedule a 30-minute strategy call below
            </p>
          </div>

          {/* Arrow */}
           <div className="hidden lg:block">
             <ArrowDown className="w-6 h-6 text-blue-600 -rotate-90" />
           </div>
           <div className="lg:hidden">
             <ArrowDown className="w-6 h-6 text-blue-600" />
           </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl">Strategy Discussion</h3>
            <p className="text-sm sm:text-base text-gray-600">
              We analyze your business and create a custom plan
            </p>
          </div>

          {/* Arrow */}
           <div className="hidden lg:block">
             <ArrowDown className="w-6 h-6 text-blue-600 -rotate-90" />
           </div>
           <div className="lg:hidden">
             <ArrowDown className="w-6 h-6 text-blue-600" />
           </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl">Get Your Proposal</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Receive timeline, pricing, and next steps
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block mb-4">
            <span className="text-sm sm:text-base font-semibold">👇 Click on a time slot below to book your call 👇</span>
          </div>
        </div>

        {/* Calendar Embed */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="h-[800px] sm:h-[900px] lg:h-[1000px]">
            <Cal 
              namespace="bizpilot-call" 
              calLink="abdu.manacq/bizpilot-call"
              style={{ width: "100%", height: "100%" }}
              config={{
                layout: "month_view",
                theme: "light"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}