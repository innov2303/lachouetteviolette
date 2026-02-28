import { motion } from "framer-motion";
import {
  Sprout, BookOpen, Music, Users, Heart, Star, Palette, Baby,
  HandHeart, Brain, Eye, Footprints, Smile, Sun, TreePine,
  Puzzle, Gamepad2, Apple, Flower2, Bird, Shield, Clock, Lightbulb,
  MessageCircle, Globe, Leaf, Sparkles, GraduationCap, Home,
  Quote,
} from "lucide-react";
import { useSectionContent } from "@/hooks/use-content";
import type { ProjectContent } from "@shared/schema";

const iconMap: Record<string, typeof Sprout> = {
  Sprout, BookOpen, Music, Users, Heart, Star, Palette, Baby,
  HandHeart, Brain, Eye, Footprints, Smile, Sun, TreePine,
  Puzzle, Gamepad2, Apple, Flower2, Bird, Shield, Clock, Lightbulb,
  MessageCircle, Globe, Leaf, Sparkles, GraduationCap, Home,
};

export default function Project() {
  const { data } = useSectionContent<ProjectContent>("project");

  const sectionLabel = data?.sectionLabel || "Notre pedagogie";
  const title = data?.title || "Un projet pedagogique bienveillant";
  const description = data?.description || "";
  const pillars = data?.pillars || [];
  const approachTitle = data?.approachTitle || "Notre approche";
  const approachText = data?.approachText || "";
  const inspirationTitle = data?.inspirationTitle || "Nos inspirations";
  const inspirationText = data?.inspirationText || "";

  return (
    <section id="project" data-testid="section-project" className="min-h-[calc(100vh-53px)] flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a0dc] font-semibold mb-4">
              {sectionLabel}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-[#c9a0dc]/40 mx-auto mb-6" />
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pillars.map((pillar, index) => {
            const IconComp = iconMap[pillar.icon] || Sprout;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`pillar-card-${index}`}
                className="group relative bg-card border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-[#c9a0dc]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#c9a0dc]/10 flex items-center justify-center text-[#c9a0dc] group-hover:bg-[#c9a0dc] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <IconComp size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative bg-gradient-to-br from-[#c9a0dc]/8 to-[#c9a0dc]/3 border border-[#c9a0dc]/15 rounded-xl p-8">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#c9a0dc]/15" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#c9a0dc] rounded-full" />
                {approachTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {approachText}
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-[#c9a0dc]/8 to-[#c9a0dc]/3 border border-[#c9a0dc]/15 rounded-xl p-8">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#c9a0dc]/15" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#c9a0dc] rounded-full" />
                {inspirationTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {inspirationText}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
