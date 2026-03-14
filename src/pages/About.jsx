import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";

const faqData = [
  {
    question: "What is Weatherly?",
    answer:
      "Weatherly is a modern, real-time weather dashboard designed to provide accurate forecasts with a focus on simplicity and beautiful design. We aggregate data from reliable meteorological sources to ensure you stay informed about the conditions that matter to you.",
  },
  {
    question: "How accurate is the weather data?",
    answer:
      "We use industry-standard APIs that combine data from global and local weather stations. While no forecast is 100% certain, we strive to provide the most reliable and up-to-date information available.",
  },
  {
    question: "Is Weatherly free to use?",
    answer:
      "Yes! Weatherly is completely free for personal use. Our goal is to make weather information accessible to everyone through a clean, ad-free interface.",
  },
  {
    question: "Can I save my favorite cities?",
    answer:
      "Currently, you can search for any city worldwide. We are have a selection of popular cities available for quick access, but we do not yet support saving favorites. This is a feature we are considering for future updates based on user feedback.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "Our weather data is refreshed in real-time. Whenever you search for a city or refresh the page, we fetch the latest available observations and forecasts.",
  },
  {
    question: "How can I report a bug or suggest a feature?",
    answer:
      "We love feedback! You can contribute or report issues on our GitHub repository. Your input helps us make Weatherly better for everyone.",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "About - Weatherly";
  }, []);

  return (
    <section className="flex-1 flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 md:px-6">
      <div className="w-full max-w-5xl mx-auto">
        <Card className="w-full border-none shadow-none bg-transparent md:border md:shadow-sm md:bg-card">
          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-sm">
              About
            </CardTitle>
            <CardDescription className="text-center text-lg text-muted-foreground mt-2">
              Everything you need to know about Weatherly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full z-20 md:p-5">
              {faqData.map((faq, idx) => (
                <AccordionItem value={`faq-${idx}`} key={idx}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardFooter className="border-t py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
              {/* Text */}
              <div className="space-y-2 max-w-xl">
                <h3 className="text-lg font-semibold">
                  Open Source & Community Driven
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Weatherly is an open-source project built with transparency in
                  mind. Anyone can explore the codebase, contribute
                  improvements, or learn how the application works.
                </p>
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                className="flex items-center gap-2 shrink-0"
                onClick={() =>
                  window.open("https://github.com/zeropse/weatherly", "_blank")
                }
              >
                <IconBrandGithub className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default About;
