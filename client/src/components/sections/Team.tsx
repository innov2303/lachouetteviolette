import { motion } from "framer-motion";
import owlSeparator from "@assets/owl_orange.png";
import chouetteViolette from "@assets/owl-avatar-realistic.png";
import { useSectionContent } from "@/hooks/use-content";
import type { TeamContent } from "@shared/schema";

const defaultMembers = [
  {
    name: "Sophie Laurent",
    role: "Assistante Maternelle agreee",
    bio: "Passionnee par la pedagogie Montessori, Sophie accompagne vos enfants dans leurs apprentissages en douceur depuis plus de 10 ans.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Claire Dubois",
    role: "Assistante Maternelle agreee",
    bio: "Creative et douce, Claire anime des ateliers artistiques et sensoriels pour eveiller la curiosite des tout-petits.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Marie Martin",
    role: "Assistante Maternelle agreee",
    bio: "Attentive et bienveillante, Marie veille au bien-etre de chaque enfant et les accompagne dans leurs premiers pas vers l'autonomie.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Team() {
  const { data } = useSectionContent<TeamContent>("team");

  const sectionLabel = data?.sectionLabel || "Qui sommes-nous";
  const title = data?.title || "Notre Equipe";
  const description = data?.description || "Trois professionnelles de la petite enfance unies par la meme passion et les memes valeurs educatives.";
  const members = data?.members || defaultMembers;

  return (
    <section id="team" data-testid="section-team" className="min-h-[calc(100vh-53px)] flex items-center py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
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
          <p className="text-muted-foreground leading-relaxed text-lg">
            {description}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${members.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 mx-auto px-4`}>
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              data-testid={`team-card-${index}`}
              className="group text-center bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500"
            >
              <div className="relative w-36 h-36 mx-auto mb-6">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#c9a0dc]/40 to-[#c9a0dc]/10 group-hover:from-[#c9a0dc]/60 group-hover:to-[#c9a0dc]/25 transition-all duration-500" />
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <img
                    src={chouetteViolette}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-[#c9a0dc] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
                {member.role}
              </p>
              <div className="w-8 h-0.5 bg-[#c9a0dc]/25 mx-auto mb-4" />
              <p className="text-muted-foreground leading-relaxed text-sm">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
