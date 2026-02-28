import { storage } from "./storage";
import type { HeroContent, GalleryContent, TeamContent, ProjectContent, ContactContent, AvailabilityContent, SocialLinksContent } from "@shared/schema";

const defaultHero: HeroContent = {
  subtitle: "Maison d'Assistantes Maternelles",
  title: "La chouette violette",
  buttonText: "Decouvrir la MAM",
};

const defaultGallery: GalleryContent = {
  sectionLabel: "Decouvrez nos espaces",
  title: "Bienvenue a la MAM",
  titleHighlight: "La chouette violette",
  description: "Notre Maison d'Assistantes Maternelles offre un cadre chaleureux et securise, specialement amenage pour l'eveil et l'epanouissement de vos tout-petits. Chaque espace est pense pour stimuler leur curiosite tout en respectant leur rythme.",
  description2: "Situee dans un environnement calme, notre structure dispose de plusieurs pieces dediees aux activites, au repos et aux repas, dans une ambiance familiale et bienveillante.",
  images: [
    { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop", alt: "Espace de jeux lumineux" },
    { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop", alt: "Activites sensorielles" },
    { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop", alt: "Jeux d'eveil en bois" },
    { src: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=1200&auto=format&fit=crop", alt: "Espace creativite et dessin" },
  ],
};

const defaultTeam: TeamContent = {
  sectionLabel: "Qui sommes-nous",
  title: "Notre Equipe",
  description: "Trois professionnelles de la petite enfance unies par la meme passion et les memes valeurs educatives.",
  members: [
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
  ],
};

const defaultProject: ProjectContent = {
  sectionLabel: "Notre pedagogie",
  title: "Un projet pedagogique bienveillant",
  description: "A La chouette violette, nous mettons l'accent sur le respect du rythme de chaque enfant. Nous nous inspirons des pedagogies actives pour accompagner leur developpement en douceur.",
  pillars: [
    { icon: "Sprout", title: "Motricite libre", description: "Laisser l'enfant decouvrir son corps et ses capacites a son propre rythme, dans un environnement securise." },
    { icon: "Users", title: "Socialisation", description: "Apprendre a vivre ensemble, partager et interagir avec les autres enfants en petit comite." },
    { icon: "BookOpen", title: "Eveil autonome", description: "Des jouets et des activites a disposition pour encourager l'autonomie et les choix personnels." },
    { icon: "Music", title: "Creativite", description: "Comptines, peinture, manipulation... La creativite au coeur de notre accompagnement quotidien." },
  ],
  approachTitle: "Notre approche",
  approachText: "Notre MAM est un pont ideal entre la garde a domicile et la creche, offrant un cadre familial tout en favorisant la socialisation. Nous accueillons les enfants dans un climat de confiance et de respect.",
  inspirationTitle: "Nos inspirations",
  inspirationText: "Nous nous inspirons des pedagogies Montessori et Pikler-Loczy pour amenager notre espace et proposer nos activites, afin que l'enfant soit pleinement acteur de son developpement.",
};

const defaultContact: ContactContent = {
  sectionLabel: "Contactez-nous",
  title: "Rencontrons-nous",
  description: "Vous cherchez une place pour votre enfant ? N'hesitez pas a nous contacter pour organiser une visite de notre structure.",
  address: "123 Rue des Petits Pas\n75000 Paris, France",
  phone: "01 23 45 67 89",
  email: "contact@lachouetteviolette.fr",
  schedule: [
    { day: "Lundi", hours: "08:00 - 18:30" },
    { day: "Mardi", hours: "08:00 - 18:30" },
    { day: "Mercredi", hours: "08:00 - 18:30" },
    { day: "Jeudi", hours: "08:00 - 18:30" },
    { day: "Vendredi", hours: "08:00 - 18:30" },
  ],
};

const defaultAvailability: AvailabilityContent = {
  enabled: false,
  message: "Une place se libere !",
  slots: [{ date: "", days: [] }],
};

const defaultSocialLinks: SocialLinksContent = {
  facebook: "",
  instagram: "",
};

export async function seedDefaultContent() {
  const sections: Record<string, unknown> = {
    hero: defaultHero,
    gallery: defaultGallery,
    team: defaultTeam,
    project: defaultProject,
    contact: defaultContact,
    availability: defaultAvailability,
    socialLinks: defaultSocialLinks,
  };

  for (const [section, content] of Object.entries(sections)) {
    const existing = await storage.getSiteContent(section);
    if (!existing) {
      await storage.upsertSiteContent(section, content);
      console.log(`Seeded default content for section: ${section}`);
    }
  }

  const contactData = await storage.getSiteContent("contact");
  if (contactData) {
    const c = contactData.content as Record<string, unknown>;
    if (!c.schedule && c.hours) {
      const h = (c.hours as string) || "08:00 - 18:30";
      c.schedule = [
        { day: "Lundi", hours: h },
        { day: "Mardi", hours: h },
        { day: "Mercredi", hours: h },
        { day: "Jeudi", hours: h },
        { day: "Vendredi", hours: h },
      ];
      delete c.hours;
      delete c.closedDays;
      await storage.upsertSiteContent("contact", c);
      console.log("Migrated contact content to schedule format");
    }
  }

  const availData = await storage.getSiteContent("availability");
  if (availData) {
    const a = availData.content as Record<string, unknown>;
    if (a.dates && !a.slots) {
      const oldDates = a.dates as string[];
      a.slots = oldDates.map((d) => ({ date: d, days: [] }));
      delete a.dates;
      await storage.upsertSiteContent("availability", a);
      console.log("Migrated availability content from dates to slots format");
    }
  }
}
