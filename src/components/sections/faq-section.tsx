import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Will I be replying to customers?",
      answer: "No — your AI assistants reply instantly, handle inquiries, and direct customers to purchase without you."
    },
    {
      question: "Do I need a website already?",
      answer: "Nope — we build the full system from scratch."
    },
    {
      question: "What do you need from me?",
      answer: "After you apply, we'll schedule an onboarding call to understand your business. Then we collect your branding, product/service info, FAQs, tone, and everything else needed to build your AI team. You don't need to be techy — we handle it all."
    },
    {
      question: "Can this work for service businesses too?",
      answer: "Absolutely. We customize your AI assistant team for products and services — they qualify leads, reply instantly, and can direct customers to book calls or consultations."
    },
    {
      question: "How long does setup take?",
      answer: "Your complete AI assistant team is deployed in 7 days or less. We handle all the technical setup, configuration, and testing. You just need to approve the final result."
    },
    {
      question: "What happens after the 7 days?",
      answer: "You own the complete system. No monthly fees, no subscriptions. It's yours forever. We also provide training and support to ensure you can manage everything confidently."
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
            Everything you need to know about BizPilot™
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