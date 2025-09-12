export function BeforeAfterSection() {
  const comparisons = [
    {
      before: "Constantly switching between WhatsApp and Instagram to reply to messages",
      after: "Every message auto-answered instantly"
    },
    {
      before: "Manually sending bank details and confirming payments",
      after: "Payments auto-confirmed and tracked"
    },
    {
      before: "Hiring staff to manage DMs and posting",
      after: "AI team works 24/7, no salaries needed"
    },
    {
      before: "Growth capped by time and chaos",
      after: "Easily scale to 10x orders without extra effort"
    }
  ]

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b-2 border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-red-600">Before BizPilot</h2>
                  </th>
                  <th className="text-left p-4 border-b-2 border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-green-600">After BizPilot</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comparison, index) => (
                  <tr key={index} className={index % 2 === 0 ? "border-b border-gray-100" : "border-b border-gray-100 bg-gray-50"}>
                    <td className="p-4 text-gray-700 leading-relaxed">
                      {comparison.before}
                    </td>
                    <td className="p-4 text-gray-700 leading-relaxed">
                      {comparison.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Before vs After BizPilot</h2>
          </div>
          {comparisons.map((comparison, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-red-50 border-b border-red-100 p-4">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Before BizPilot</h3>
                <p className="text-gray-700 leading-relaxed">{comparison.before}</p>
              </div>
              <div className="bg-green-50 p-4">
                <h3 className="text-lg font-semibold text-green-600 mb-2">After BizPilot</h3>
                <p className="text-gray-700 leading-relaxed">{comparison.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}