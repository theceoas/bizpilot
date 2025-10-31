import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Will customers accept AI responses?",
      answer: "Yes! Our AI responds naturally and professionally. Most customers can't tell the difference, and they love the instant responses. Plus, you can always step in if needed."
    },
    {
      question: "Do I need to be technical to use this?",
      answer: "Not at all. We handle all the technical setup. You just need to approve the final system and we'll train you on the simple dashboard to manage everything."
    },
    {
      question: "What kind of support do I get?",
      answer: "Full support for 90 days after launch, plus training on how to use your dashboard. We're here to ensure your success."
    },
    {
      question: "Are there ongoing costs?",
      answer: "Only small usage credits (like airtime top-ups) when the AI is actively working. No monthly subscriptions or hidden fees. You own the system."
    },
    {
      question: "Can I see a custom demo for my business?",
      answer: "Absolutely! During your free consultation, we'll show you exactly how the AI will work with YOUR specific products and customers."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients see increased inquiries within 24 hours of going live, and first sales within the first week. The AI works 24/7 from day one."
    },
    {
      question: "Why is pricing custom?",
      answer: "Every business is different. Your pricing depends on your product catalog size, customer volume, and automation needs. We audit your business to give you an accurate quote and ROI projection."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We offer flexible payment options to make this investment work for your cash flow. Details discussed during your consultation."
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about AI Business OS™
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:no-underline hover:bg-gray-50">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}