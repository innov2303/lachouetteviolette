import { useSectionContent } from "@/hooks/use-content";
import type { AvailabilityContent } from "@shared/schema";
import { CalendarCheck, Sparkles } from "lucide-react";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AvailabilityBanner() {
  const { data } = useSectionContent<AvailabilityContent>("availability");

  if (!data?.enabled) return null;

  const validDates = data.dates?.filter((d) => d) || [];

  return (
    <div
      data-testid="banner-availability"
      className="relative z-40 bg-gradient-to-r from-[#c9a0dc] via-[#b88fd0] to-[#c9a0dc] text-white py-3 px-6 shadow-md"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 flex-wrap">
        <Sparkles className="h-4 w-4 shrink-0" />
        <span className="font-semibold text-sm md:text-base tracking-wide">
          {data.message}
        </span>
        {validDates.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {validDates.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm bg-white/20 rounded-full px-3 py-0.5">
                <CalendarCheck className="h-3.5 w-3.5" />
                A partir du {formatDate(d)}
              </span>
            ))}
          </div>
        )}
        <a
          href="#contact"
          data-testid="link-availability-contact"
          className="text-sm underline underline-offset-2 hover:text-white/80 transition-colors"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  );
}
