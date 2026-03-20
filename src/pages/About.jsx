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
      "We directly use open weather APIs that are widely recognized for their accuracy and reliability. While no forecast can be 100% precise due to the nature of weather, we strive to provide the most up-to-date and accurate information available.",
  },
  {
    question: "Is Weatherly free to use?",
    answer:
      "Yes! Weatherly is completely free for personal use. Our goal is to make weather information accessible to everyone through a clean, ad-free interface.",
  },
  {
    question: "Can I save my favorite cities?",
    answer: "Currently, you can search for any city worldwide.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "Our weather data is refreshed in real-time. Whenever you search for a city or refresh the page, we fetch the latest available observations and forecasts.",
  },
  {
    question: "What kind of forecast does Weatherly show?",
    answer:
      "Weatherly currently highlights live conditions plus a 5-day forecast broken into 3-hour steps. That makes it useful for checking not just the day overall, but also how conditions change from morning to evening.",
  },
  {
    question: "Which weather details are included?",
    answer:
      "Depending on the view, you can see temperature, feels-like temperature, humidity, wind speed, wind direction, pressure, visibility, sunrise, sunset, and precipitation chance. We focus on the details that are most helpful at a glance.",
  },
  {
    question: "Why can two cities with similar names return different results?",
    answer:
      "City searches are resolved through geocoding, which maps your typed location to latitude and longitude. If multiple places share the same name, the result depends on the best match returned by the provider, so using a more specific query can help.",
  },
  {
    question: "Does Weatherly work well on mobile?",
    answer:
      "Yes. The interface is designed to adapt across phones, tablets, and desktop screens. Forecast details stack more compactly on smaller devices so the key information stays readable.",
  },
  {
    question: "Can I use Weatherly to compare travel destinations?",
    answer:
      "Absolutely. Weatherly is well-suited for quickly comparing cities by current conditions, daily ranges, and 3-hour forecast details so you can get a feel for what the weather will actually be like during the day.",
  },
  {
    question: "Does Weatherly store my searches?",
    answer:
      "Searches are reflected in the page URL so views can be revisited or shared, but the app does not currently provide a full saved-favorites system. That keeps the experience lightweight while still making searches easy to revisit.",
  },
  {
    question: "Why might the weather differ from what I see outside?",
    answer:
      "Forecasts and observations come from trusted weather sources, but actual conditions can still vary because of rapid local changes, terrain, nearby water, or timing differences between observations and what is happening at your exact location.",
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
        <Card className="w-full border-none shadow-none bg-transparent md:border md:shadow-sm">
          <CardHeader className={"p-3"}>
            <CardTitle className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-sm">
              About
            </CardTitle>
            <CardDescription className="text-center text-lg text-muted-foreground mt-2">
              Everything you need to know about Weatherly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full z-20 md:p-5 gap-3">
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
                className="flex items-center gap-2 shrink-0 cursor-pointer"
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
