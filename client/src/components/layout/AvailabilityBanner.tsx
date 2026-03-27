import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionContent } from "@/hooks/use-content";
import type { AvailabilityContent } from "@shared/schema";
import { CalendarCheck, ChevronDown, Sparkles } from "lucide-react";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const DAY_ORDER = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function AvailabilityBanner() {
  const { data } = useSectionContent<AvailabilityContent>("availability");
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);

  if (!data?.enabled) return null;

  const validSlots = (data.slots?.filter((s) => s.date) || []).map((slot) => ({
    ...slot,
    days: DAY_ORDER.filter((d) => slot.days?.includes(d)),
  }));

  return (
    <div
      data-testid="banner-availability"
      className="relative z-40 bg-gradient-to-r from-[#c9a0dc] via-[#b88fd0] to-[#c9a0dc] text-white shadow-md"
    >
      <div className="container mx-auto py-3 px-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="font-semibold text-sm md:text-base tracking-wide">
            {data.message}
          </span>
          {validSlots.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {validSlots.map((slot, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setExpandedSlot(expandedSlot === i ? null : i)}
                  data-testid={`button-slot-${i}`}
                  className="flex items-center gap-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-full px-3 py-0.5 transition-colors cursor-pointer"
                >
                  <CalendarCheck className="h-3.5 w-3.5" />
                  A partir du {formatDate(slot.date)}
                  {slot.days?.length > 0 && (
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${expandedSlot === i ? "rotate-180" : ""}`} />
                  )}
                </button>
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

        <AnimatePresence>
          {expandedSlot !== null && validSlots[expandedSlot]?.days?.length > 0 && (
            <motion.div
              key={expandedSlot}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 pt-3 flex-wrap" data-testid={`slot-days-${expandedSlot}`}>
                <span className="text-xs text-white/70 uppercase tracking-wider">Jours :</span>
                {validSlots[expandedSlot].days.map((day, j) => (
                  <span
                    key={j}
                    className="text-xs bg-white/25 rounded-full px-3 py-1 font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
