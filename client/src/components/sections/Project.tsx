import { motion } from "framer-motion";
import owlSeparator from "@assets/owl_orange.png";
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

  return (
    <section id="project" data-testid="section-project" className="min-h-[calc(100vh-53px)] flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
              <img src={owlSeparator} alt="" className="w-6 h-6 object-contain" />
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
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
                className="group relative bg-card border border-card-border rounded-xl p-6 text-center hover:shadow-lg hover:border-[#c9a0dc]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 mx-auto rounded-xl bg-[#c9a0dc]/10 flex items-center justify-center text-[#c9a0dc] group-hover:bg-[#c9a0dc] group-hover:text-white transition-all duration-300 group-hover:scale-110">
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
      </div>
    </section>
  );
}
