import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

const socialLinks = [
  {
    icon: IconBrandGithub,
    url: "https://github.com/zeropse",
    label: "GitHub",
  },
  {
    icon: IconBrandLinkedin,
    url: "https://linkedin.com/in/zeropse",
    label: "LinkedIn",
  },
  {
    icon: IconBrandTwitter,
    url: "https://twitter.com/zer0pse",
    label: "Twitter",
  },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 p-4 text-sm text-muted-foreground md:flex-row">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Weatherly
        </p>

        <div className="flex items-center gap-2">
          {socialLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <Button
                key={index}
                variant="ghost"
                className="h-9 w-9 rounded-md p-2 cursor-pointer"
                onClick={() => window.open(item.url, "_blank")}
                aria-label={item.label}
              >
                <Icon size={20} stroke={2} />
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
