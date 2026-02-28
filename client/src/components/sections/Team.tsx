import { motion } from "framer-motion";
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
    <section id="team" data-testid="section-team" className="min-h-[calc(100vh-53px)] flex items-center py-16 bg-muted">
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
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${members.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-3 max-w-5xl'} gap-10 mx-auto`}>
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              data-testid={`team-card-${index}`}
              className="group text-center"
            >
              <div className="w-40 h-40 mx-auto overflow-hidden rounded-full mb-6 border-4 border-[#c9a0dc]/20 group-hover:border-[#c9a0dc]/50 transition-all duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
