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

  const slots = data.slots?.filter((s) => s.message) || [];
  if (slots.length === 0) return null;

  return (
    <div
      data-testid="banner-availability"
      className="relative z-40 bg-gradient-to-r from-[#c9a0dc] via-[#b88fd0] to-[#c9a0dc] text-white py-3 px-6 shadow-md"
    >
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <Sparkles className="h-4 w-4 shrink-0" />
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {slots.map((slot, i) => (
            <span key={i} className="flex items-center gap-2 text-sm md:text-base">
              <span className="font-semibold tracking-wide">{slot.message}</span>
              {slot.date && (
                <span className="flex items-center gap-1.5 text-sm bg-white/20 rounded-full px-3 py-0.5">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  {formatDate(slot.date)}
                </span>
              )}
              {i < slots.length - 1 && <span className="text-white/50 mx-1">|</span>}
            </span>
          ))}
        </div>
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
