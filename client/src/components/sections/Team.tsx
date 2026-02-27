import { motion } from "framer-motion";

const teamMembers = [
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
];

export default function Team() {
  return (
    <section id="team" data-testid="section-team" className="min-h-[calc(100vh-53px)] flex items-center py-16 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Qui sommes-nous
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notre Equipe
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Deux professionnelles de la petite enfance unies par la meme passion
            et les memes valeurs educatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              data-testid={`team-card-${index}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-md mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3">
                {member.role}
              </p>
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
