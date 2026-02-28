import { motion } from "framer-motion";
import {
  Sprout, BookOpen, Music, Users, Heart, Star, Palette, Baby,
  HandHeart, Brain, Eye, Footprints, Smile, Sun, TreePine,
  Puzzle, Gamepad2, Apple, Flower2, Bird, Shield, Clock, Lightbulb,
  MessageCircle, Globe, Leaf, Sparkles, GraduationCap, Home,
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
    <section id="project" data-testid="section-project" className="min-h-[calc(100vh-53px)] flex items-center py-16">
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
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                className="flex items-start gap-5 group"
              >
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <IconComp size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-muted rounded-md p-10 md:p-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {approachTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {approachText}
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
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
