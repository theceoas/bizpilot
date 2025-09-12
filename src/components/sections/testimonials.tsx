import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote: "I went from missing 10+ orders every day to zero missed sales. My customers now get instant replies, and my revenue doubled in two months.",
      name: "Chioma",
      business: "Beauty Products Seller"
    },
    {
      quote: "BizPilot saved me 25 hours every week and boosted my sales by 40% in the first month.",
      name: "Ada",
      business: "Fashion Seller"
    }
  ]

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">— {testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}