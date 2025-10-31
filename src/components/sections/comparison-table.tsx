"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, DollarSign, Users, Zap, TrendingUp, BarChart3 } from "lucide-react"

export function ComparisonTable() {
  const features = [
    {
      feature: "Cost",
      manual: { value: "Your time 4-6 hrs", available: false, note: "Your valuable time" },
      hiring: { value: "₦80-150k/mo per employee", available: false, note: "Plus benefits" },
      aiSystem: { value: "One-time fee + ₦70k/mo ops", available: true, note: "Much less than 1 employee" }
    },
    {
      feature: "Availability",
      manual: { value: "Only when you're available", available: false, note: "Limited hours" },
      hiring: { value: "Business hrs 8-10 hrs/day", available: false, note: "Not 24/7" },
      aiSystem: { value: "24/7/365 Never sleeps", available: true, note: "Always working" }
    },
    {
      feature: "Response Time",
      manual: { value: "Hours", available: false, note: "Customers wait" },
      hiring: { value: "10-30 min", available: false, note: "Still slow" },
      aiSystem: { value: "8 seconds", available: true, note: "Instant response" }
    },
    {
      feature: "Sick Days",
      manual: { value: "You get sick/tired", available: false, note: "Business stops" },
      hiring: { value: "Employees call out", available: false, note: "Unreliable" },
      aiSystem: { value: "Never", available: true, note: "Always reliable" }
    },
    {
      feature: "Consistency",
      manual: { value: "Mood-dependent", available: false, note: "Varies daily" },
      hiring: { value: "Varies by person", available: false, note: "Human error" },
      aiSystem: { value: "Perfect every time", available: true, note: "No bad days" }
    },
    {
      feature: "Scalability",
      manual: { value: "Can't handle multiple", available: false, note: "Limited capacity" },
      hiring: { value: "Hire more = more cost", available: false, note: "Expensive scaling" },
      aiSystem: { value: "Handles unlimited volume", available: true, note: "Scales automatically" }
    },
    {
      feature: "Data & Analytics",
      manual: { value: "Manual tracking", available: false, note: "Time consuming" },
      hiring: { value: "Manual reports", available: false, note: "Prone to errors" },
      aiSystem: { value: "Real-time dashboard", available: true, note: "Instant insights" }
    },
    {
      feature: "Training Time",
      manual: { value: "None", available: true, note: "But limited by your time" },
      hiring: { value: "2-4 weeks", available: false, note: "Plus ongoing training" },
      aiSystem: { value: "None (we do it)", available: true, note: "Ready to use" }
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-4xl mb-4">⚖️</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Options
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The choice is clear. Work smarter, not harder.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
              <CardTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
                Complete Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left p-4 sm:p-6 font-semibold text-gray-900 w-1/4">Feature</th>
                      <th className="text-center p-4 sm:p-6 font-semibold text-gray-900 w-1/4">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-5 h-5 text-red-500" />
                          Manual Work
                        </div>
                      </th>
                      <th className="text-center p-4 sm:p-6 font-semibold text-gray-900 w-1/4">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="w-5 h-5 text-orange-500" />
                          Hiring Staff
                        </div>
                      </th>
                      <th className="text-center p-4 sm:p-6 font-semibold text-gray-900 bg-gradient-to-r from-blue-50 to-emerald-50 w-1/4">
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          Our AI System
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-4 sm:p-6 font-medium text-gray-900">
                          {row.feature}
                        </td>
                        <td className="p-4 sm:p-6 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-2">
                              {row.manual.available ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">{row.manual.value}</div>
                            {row.manual.note && (
                              <div className="text-xs text-gray-500">({row.manual.note})</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 sm:p-6 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-2">
                              {row.hiring.available ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">{row.hiring.value}</div>
                            {row.hiring.note && (
                              <div className="text-xs text-gray-500">({row.hiring.note})</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 sm:p-6 text-center bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="text-sm text-gray-700 font-medium">{row.aiSystem.value}</div>
                            {row.aiSystem.note && (
                              <div className="text-xs text-green-600 font-medium">({row.aiSystem.note})</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {features.map((row, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">
                  {row.feature}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Manual Work */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-900">Manual Work</span>
                      {row.manual.available ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-700">{row.manual.value}</div>
                    {row.manual.note && (
                      <div className="text-xs text-gray-500 mt-1">({row.manual.note})</div>
                    )}
                  </div>

                  {/* Hiring Staff */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900">Hiring Staff</span>
                      {row.hiring.available ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-700">{row.hiring.value}</div>
                    {row.hiring.note && (
                      <div className="text-xs text-gray-500 mt-1">({row.hiring.note})</div>
                    )}
                  </div>

                  {/* AI System */}
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Our AI System</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-sm text-gray-700 font-medium">{row.aiSystem.value}</div>
                    {row.aiSystem.note && (
                      <div className="text-xs text-green-600 font-medium mt-1">({row.aiSystem.note})</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">The choice is clear.</h3>
            <p className="text-blue-100 mb-4">Work smarter, not harder.</p>
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Get My Custom AI Solution
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}