import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { useAllContent, useUpdateContent } from "@/hooks/use-content";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, Save, Home, Image, Users, BookOpen, Mail, Plus, Trash2, CalendarCheck, ToggleLeft, ToggleRight, Share2, Heart, Megaphone, Download, BarChart2, TrendingUp, Globe, Users2 } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import type { HeroContent, GalleryContent, TeamContent, ProjectContent, ContactContent, AvailabilityContent, SocialLinksContent } from "@shared/schema";
import owlAvatar from "@assets/owl-avatar-realistic.png";

const sectionTabs = [
  { id: "availability", label: "Place disponible", icon: CalendarCheck },
  { id: "gallery", label: "Notre Maison", icon: Image },
  { id: "team", label: "Equipe", icon: Users },
  { id: "project", label: "Pedagogie", icon: BookOpen },
  { id: "familiarisation", label: "Familiarisation", icon: Heart },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "socialLinks", label: "Reseaux sociaux", icon: Share2 },
  { id: "communication", label: "Communication", icon: Megaphone },
  { id: "analytics", label: "Analyse site", icon: BarChart2 },
];

export default function Admin() {
  const auth = useAuth();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("availability");
  const content = useAllContent();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#c9a0dc]" />
      </div>
    );
  }

  if (!auth.data) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, { onSuccess: () => setLocation("/admin/login") });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg font-bold text-[#c9a0dc]" data-testid="text-admin-header">
            La chouette violette
          </h1>
          <span className="text-xs bg-[#c9a0dc]/10 text-[#c9a0dc] px-2 py-1 rounded font-medium">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-site">
            Voir le site
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            data-testid="button-logout"
            className="text-sm"
          >
            <LogOut className="h-4 w-4 mr-1" /> Deconnexion
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-56 border-r border-border min-h-[calc(100vh-53px)] p-4 sticky top-[53px] self-start">
          <nav className="space-y-1">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                data-testid={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#c9a0dc]/10 text-[#c9a0dc]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 max-w-4xl">
          {content.isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#c9a0dc]" />
            </div>
          ) : content.data ? (
            <>
              {activeTab === "availability" && <AvailabilityEditor data={(content.data as Record<string, unknown>).availability as AvailabilityContent} />}
              {activeTab === "gallery" && <GalleryEditor data={(content.data as Record<string, unknown>).gallery as GalleryContent} />}
              {activeTab === "team" && <TeamEditor data={(content.data as Record<string, unknown>).team as TeamContent} />}
              {activeTab === "project" && <ProjectEditor data={(content.data as Record<string, unknown>).project as ProjectContent} />}
              {activeTab === "familiarisation" && <FamiliarisationEditor data={(content.data as Record<string, unknown>).project as ProjectContent} />}
              {activeTab === "contact" && <ContactEditor data={(content.data as Record<string, unknown>).contact as ContactContent} />}
              {activeTab === "socialLinks" && <SocialLinksEditor data={(content.data as Record<string, unknown>).socialLinks as SocialLinksContent} />}
              {activeTab === "communication" && <CommunicationEditor />}
              {activeTab === "analytics" && <AnalyticsEditor />}
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-foreground mb-1.5">{children}</label>;
}

const ALL_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

function AvailabilityEditor({ data }: { data: AvailabilityContent }) {
  const buildForm = () => ({
    enabled: data?.enabled ?? false,
    message: data?.message || "Une place se libere !",
    slots: data?.slots?.length ? data.slots : [{ date: "", days: [] as string[] }],
  });
  const [form, setForm] = useState(buildForm);
  const update = useUpdateContent("availability");
  const { toast } = useToast();

  useEffect(() => {
    setForm(buildForm());
  }, [data]);

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Place disponible mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  const updateSlotDate = (index: number, value: string) => {
    const slots = [...form.slots];
    slots[index] = { ...slots[index], date: value };
    setForm({ ...form, slots });
  };

  const toggleSlotDay = (index: number, day: string) => {
    const slots = [...form.slots];
    const current = slots[index].days || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    slots[index] = {
      ...slots[index],
      days: ALL_DAYS.filter((d) => updated.includes(d)),
    };
    setForm({ ...form, slots });
  };

  const addSlot = () => setForm({ ...form, slots: [...form.slots, { date: "", days: [] }] });
  const removeSlot = (index: number) => setForm({ ...form, slots: form.slots.filter((_, i) => i !== index) });

  return (
    <div>
      <SectionHeader title="Place disponible" description="Affichez un bandeau sur le site pour signaler des places disponibles" />
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/50">
          <button
            type="button"
            onClick={() => setForm({ ...form, enabled: !form.enabled })}
            className="flex items-center gap-2 text-sm font-medium"
            data-testid="button-toggle-availability"
          >
            {form.enabled ? (
              <ToggleRight className="h-8 w-8 text-[#c9a0dc]" />
            ) : (
              <ToggleLeft className="h-8 w-8 text-muted-foreground" />
            )}
            <span className={form.enabled ? "text-[#c9a0dc] font-semibold" : "text-muted-foreground"}>
              {form.enabled ? "Bandeau actif" : "Bandeau desactive"}
            </span>
          </button>
        </div>

        <div>
          <FieldLabel>Message du bandeau</FieldLabel>
          <Input
            data-testid="input-availability-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="ex: Une place se libere !"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Places disponibles</FieldLabel>
            <Button variant="outline" size="sm" onClick={addSlot} data-testid="button-add-date">
              <Plus className="h-4 w-4 mr-1" /> Ajouter une place
            </Button>
          </div>
          <div className="space-y-4">
            {form.slots.map((slot, i) => (
              <div key={i} className="p-4 border rounded-md bg-muted/50 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-20 shrink-0">Place {i + 1}</span>
                  <Input
                    type="date"
                    value={slot.date}
                    onChange={(e) => updateSlotDate(i, e.target.value)}
                    data-testid={`input-date-${i}`}
                  />
                  {form.slots.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeSlot(i)} className="text-destructive shrink-0" data-testid={`button-remove-date-${i}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <span className="text-xs text-muted-foreground mb-2 block">Jours d'accueil</span>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleSlotDay(i, day)}
                        data-testid={`button-day-${i}-${day}`}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                          slot.days?.includes(day)
                            ? "bg-[#c9a0dc] text-white border-[#c9a0dc]"
                            : "bg-background text-muted-foreground border-border hover:border-[#c9a0dc]/50"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-availability" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function HeroEditor({ data }: { data: HeroContent }) {
  const [form, setForm] = useState(data);
  const update = useUpdateContent("hero");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Accueil mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  return (
    <div>
      <SectionHeader title="Section Accueil (Hero)" description="Modifiez le texte affiche sur l'image d'accueil" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Sous-titre</FieldLabel>
          <Input data-testid="input-hero-subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Titre principal</FieldLabel>
          <Input data-testid="input-hero-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Texte du bouton</FieldLabel>
          <Input data-testid="input-hero-button" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} />
        </div>
        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-hero" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function GalleryEditor({ data }: { data: GalleryContent }) {
  const [form, setForm] = useState(data);
  const [uploading, setUploading] = useState(false);
  const update = useUpdateContent("gallery");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Notre Maison mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Upload echoue");
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, images: [...prev.images, { src: url, alt: file.name.replace(/\.[^/.]+$/, "") }] }));
      toast({ title: "Image ajoutee" });
    } catch {
      toast({ title: "Erreur lors de l'upload", variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const img = form.images[index];
    if (img.src.startsWith("/uploads/")) {
      const filename = img.src.split("/").pop();
      fetch(`/api/upload/${filename}`, { method: "DELETE", credentials: "include" });
    }
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const updateImageAlt = (index: number, alt: string) => {
    const images = [...form.images];
    images[index] = { ...images[index], alt };
    setForm({ ...form, images });
  };

  return (
    <div>
      <SectionHeader title="Section Notre Maison" description="Modifiez les textes et les images du carrousel" />
      <div className="space-y-6">
        <div>
          <FieldLabel>Description</FieldLabel>
          <Textarea data-testid="input-gallery-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[80px]" />
        </div>
        <div>
          <FieldLabel>Description (suite)</FieldLabel>
          <Textarea data-testid="input-gallery-desc2" value={form.description2} onChange={(e) => setForm({ ...form, description2: e.target.value })} className="min-h-[80px]" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Images du carrousel</FieldLabel>
            <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium border rounded-md hover:bg-muted transition-colors">
              <Plus className="h-4 w-4" />
              {uploading ? "Upload..." : "Ajouter une image"}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} data-testid="input-upload-image" />
            </label>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Resolution recommandee : 1200 x 900 px (format 4:3). Formats acceptes : JPG, PNG, WebP. Taille max : 10 Mo.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative border rounded-md overflow-hidden bg-muted/50 group" data-testid={`gallery-admin-image-${i}`}>

                <div className="aspect-[4/3]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 space-y-1">
                  <Input
                    placeholder="Description de l'image"
                    value={img.alt}
                    onChange={(e) => updateImageAlt(i, e.target.value)}
                    className="text-xs h-8"
                    data-testid={`input-gallery-img-alt-${i}`}
                  />
                </div>
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-md bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`button-remove-image-${i}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-gallery" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function TeamEditor({ data }: { data: TeamContent }) {
  const [form, setForm] = useState(data);
  const update = useUpdateContent("team");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Equipe mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const members = [...form.members];
    members[index] = { ...members[index], [field]: value };
    setForm({ ...form, members });
  };

  const addMember = () => setForm({ ...form, members: [...form.members, { name: "", role: "", bio: "", image: "" }] });
  const removeMember = (index: number) => setForm({ ...form, members: form.members.filter((_, i) => i !== index) });

  return (
    <div>
      <SectionHeader title="Section Equipe" description="Modifiez les informations de l'equipe" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Description</FieldLabel>
          <Textarea data-testid="input-team-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Membres de l'equipe</FieldLabel>
            <Button variant="outline" size="sm" onClick={addMember} data-testid="button-add-member">
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          <div className="space-y-4">
            {form.members.map((member, i) => (
              <div key={i} className="p-4 border rounded-md bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Membre {i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeMember(i)} className="text-destructive" data-testid={`button-remove-member-${i}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="Nom" value={member.name} onChange={(e) => updateMember(i, "name", e.target.value)} data-testid={`input-member-name-${i}`} />
                <Input placeholder="Role" value={member.role} onChange={(e) => updateMember(i, "role", e.target.value)} data-testid={`input-member-role-${i}`} />
                <Textarea placeholder="Biographie" value={member.bio} onChange={(e) => updateMember(i, "bio", e.target.value)} data-testid={`input-member-bio-${i}`} />
                <Input placeholder="URL de la photo" value={member.image} onChange={(e) => updateMember(i, "image", e.target.value)} data-testid={`input-member-image-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-team" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function ProjectEditor({ data }: { data: ProjectContent }) {
  const [form, setForm] = useState(data);
  const update = useUpdateContent("project");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Pedagogie mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  const guessIcon = (title: string): string => {
    const t = title.toLowerCase();
    const keywords: Record<string, string[]> = {
      Moon: ["sommeil", "sieste", "dormir", "dodo", "nuit", "repos", "dortoir"],
      BedDouble: ["lit", "coucher", "bercer"],
      Sprout: ["motricite", "grandir", "croissance", "developpe", "nature", "pousse"],
      Users: ["social", "ensemble", "groupe", "partage", "collectif", "equipe"],
      BookOpen: ["lecture", "lire", "livre", "histoire", "conte", "apprendre"],
      Music: ["musique", "comptine", "chanson", "son", "rythme", "melodie"],
      Heart: ["amour", "bienveillance", "affection", "emotion", "doux", "tendresse", "coeur"],
      Star: ["reussite", "progres", "succes", "bravo", "etoile"],
      Palette: ["art", "peinture", "dessin", "couleur", "creat"],
      Baby: ["bebe", "nourrisson", "tout-petit", "enfant"],
      HandHeart: ["soin", "accompagne", "aide", "soutien", "confiance"],
      Brain: ["reflexion", "penser", "intelligence", "cognitif", "cerveau"],
      Eye: ["observation", "regard", "voir", "decouvr", "eveil", "sensoriel", "motrice"],
      Footprints: ["marche", "pas", "autonomie", "independ", "moteur", "socialisation", "premier"],
      Smile: ["joie", "sourire", "bonheur", "plaisir", "rire", "heureux"],
      Sun: ["soleil", "exterieur", "dehors", "lumiere", "jardin"],
      TreePine: ["foret", "arbre", "plein air", "sortie"],
      Puzzle: ["jeu", "jouet", "logique", "construction", "manipul"],
      Apple: ["repas", "manger", "aliment", "nutrition", "cuisine", "gout"],
      Flower2: ["fleur", "jardin", "plante", "botanique"],
      Bird: ["oiseau", "chouette", "animal", "animaux"],
      Shield: ["securite", "proteg", "cadre", "regle", "confiance"],
      Clock: ["rythme", "temps", "routine", "horaire", "patience"],
      Lightbulb: ["idee", "curiosite", "decouverte", "imagination", "inspir"],
      MessageCircle: ["parole", "langage", "communic", "mot", "parler", "echange"],
      Globe: ["monde", "culture", "divers", "ouverture"],
      Leaf: ["eco", "vert", "environnement", "durable"],
      Sparkles: ["magie", "merveille", "fete", "special"],
      GraduationCap: ["education", "pedagogie", "formation", "savoir"],
      Home: ["maison", "accueil", "foyer", "interieur", "cocon"],
    };
    for (const [icon, words] of Object.entries(keywords)) {
      if (words.some((w) => t.includes(w))) return icon;
    }
    return "Sprout";
  };

  const updatePillar = (index: number, field: string, value: string) => {
    const pillars = [...form.pillars];
    pillars[index] = { ...pillars[index], [field]: value };
    if (field === "title") {
      pillars[index].icon = guessIcon(value);
    }
    setForm({ ...form, pillars });
  };

  const addPillar = () => setForm({ ...form, pillars: [...form.pillars, { icon: "Sprout", title: "", description: "" }] });
  const removePillar = (index: number) => setForm({ ...form, pillars: form.pillars.filter((_, i) => i !== index) });

  return (
    <div>
      <SectionHeader title="Section Pedagogie" description="Modifiez le projet pedagogique" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Titre</FieldLabel>
          <Input data-testid="input-project-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <Textarea data-testid="input-project-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[80px]" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Piliers pedagogiques</FieldLabel>
            <Button variant="outline" size="sm" onClick={addPillar} data-testid="button-add-pillar">
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          <div className="space-y-3">
            {form.pillars.map((pillar, i) => (
              <div key={i} className="p-4 border rounded-md bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Pilier {i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removePillar(i)} className="text-destructive" data-testid={`button-remove-pillar-${i}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="Titre" value={pillar.title} onChange={(e) => updatePillar(i, "title", e.target.value)} data-testid={`input-pillar-title-${i}`} />
                <Textarea placeholder="Description" value={pillar.description} onChange={(e) => updatePillar(i, "description", e.target.value)} data-testid={`input-pillar-desc-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-project" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function FamiliarisationEditor({ data }: { data: ProjectContent }) {
  const [form, setForm] = useState(data);
  const update = useUpdateContent("project");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Familiarisation mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  return (
    <div>
      <SectionHeader title="Section Familiarisation" description="Modifiez la periode de familiarisation" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Titre</FieldLabel>
          <Input data-testid="input-approach-title" value={form.approachTitle} onChange={(e) => setForm({ ...form, approachTitle: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Texte d'introduction</FieldLabel>
          <Textarea data-testid="input-approach-text" value={form.approachText} onChange={(e) => setForm({ ...form, approachText: e.target.value })} className="min-h-[80px]" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Etapes de familiarisation</FieldLabel>
            <Button variant="outline" size="sm" onClick={() => setForm({ ...form, familiarisationSteps: [...(form.familiarisationSteps || []), { day: "", title: "", description: "" }] })} data-testid="button-add-step">
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          <div className="space-y-3">
            {(form.familiarisationSteps || []).map((step, i) => (
              <div key={i} className="p-4 border rounded-md bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Etape {i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, familiarisationSteps: (form.familiarisationSteps || []).filter((_, j) => j !== i) })} className="text-destructive" data-testid={`button-remove-step-${i}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="ex: Jour 1" value={step.day} onChange={(e) => { const steps = [...(form.familiarisationSteps || [])]; steps[i] = { ...steps[i], day: e.target.value }; setForm({ ...form, familiarisationSteps: steps }); }} data-testid={`input-step-day-${i}`} />
                <Textarea placeholder="Description de l'etape" value={step.description} onChange={(e) => { const steps = [...(form.familiarisationSteps || [])]; steps[i] = { ...steps[i], description: e.target.value }; setForm({ ...form, familiarisationSteps: steps }); }} data-testid={`input-step-desc-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-familiarisation" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function ContactEditor({ data }: { data: ContactContent }) {
  const safeData = {
    ...data,
    schedule: data.schedule || [
      { day: "Lundi", hours: "08:00 - 18:30" },
      { day: "Mardi", hours: "08:00 - 18:30" },
      { day: "Mercredi", hours: "08:00 - 18:30" },
      { day: "Jeudi", hours: "08:00 - 18:30" },
      { day: "Vendredi", hours: "08:00 - 18:30" },
    ],
  };
  const [form, setForm] = useState(safeData);
  const update = useUpdateContent("contact");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Contact mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  const updateSchedule = (index: number, value: string) => {
    const schedule = [...form.schedule];
    schedule[index] = { ...schedule[index], hours: value };
    setForm({ ...form, schedule });
  };

  return (
    <div>
      <SectionHeader title="Section Contact" description="Modifiez les informations de contact" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Description</FieldLabel>
          <Textarea data-testid="input-contact-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Adresse</FieldLabel>
          <Textarea data-testid="input-contact-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Telephone</FieldLabel>
          <Input data-testid="input-contact-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <Input data-testid="input-contact-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Horaires d'accueil</FieldLabel>
          <div className="space-y-3 mt-2">
            {form.schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
                <span className="text-sm font-medium text-foreground w-24 shrink-0">{s.day}</span>
                <Input value={s.hours} onChange={(e) => updateSchedule(i, e.target.value)} data-testid={`input-schedule-${i}`} placeholder="ex: 08:00 - 18:30" />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-contact" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function SocialLinksEditor({ data }: { data: SocialLinksContent }) {
  const safeData = data || { facebook: "", instagram: "" };
  const [form, setForm] = useState(safeData);
  const update = useUpdateContent("socialLinks");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Reseaux sociaux mis a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  return (
    <div>
      <SectionHeader title="Reseaux sociaux" description="Modifiez les liens vers vos reseaux sociaux" />
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 border rounded-md bg-muted/50">
          <SiFacebook className="h-5 w-5 text-[#1877F2] shrink-0" />
          <div className="flex-1">
            <FieldLabel>Facebook</FieldLabel>
            <Input
              data-testid="input-social-facebook"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              placeholder="https://facebook.com/votrepage"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-md bg-muted/50">
          <SiInstagram className="h-5 w-5 text-[#E4405F] shrink-0" />
          <div className="flex-1">
            <FieldLabel>Instagram</FieldLabel>
            <Input
              data-testid="input-social-instagram"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="https://instagram.com/votrecompte"
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-social" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function CommunicationEditor() {
  const [text, setText] = useState("Des places sont disponibles\npour la rentrée 2026 !");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [owlImg, setOwlImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setOwlImg(img);
    img.src = owlAvatar;
  }, []);

  const drawFlyer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !owlImg) return;
    const ctx = canvas.getContext("2d")!;
    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    const drawStar = (cx: number, cy: number, r: number, color: string, rot = 0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](r * Math.cos(angle), r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (cx: number, cy: number, size: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);
      ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.1, 0, size);
      ctx.bezierCurveTo(size, size * 0.1, size * 0.5, -size * 0.3, 0, size * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawCloud = (cx: number, cy: number, s: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, s, 0, Math.PI * 2);
      ctx.arc(cx + s * 1.2, cy - s * 0.2, s * 0.8, 0, Math.PI * 2);
      ctx.arc(cx - s * 1.1, cy - s * 0.1, s * 0.7, 0, Math.PI * 2);
      ctx.arc(cx + s * 0.5, cy - s * 0.6, s * 0.65, 0, Math.PI * 2);
      ctx.arc(cx - s * 0.4, cy - s * 0.5, s * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawBottle = (cx: number, cy: number, s: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(-s * 0.35, -s, s * 0.7, s * 2, s * 0.3);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(-s * 0.15, -s * 1.5, s * 0.3, s * 0.6, s * 0.1);
      ctx.fill();
      ctx.fillStyle = color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.6})`);
      ctx.beginPath();
      ctx.roundRect(-s * 0.25, -s * 0.2, s * 0.5, s * 0.8, s * 0.15);
      ctx.fill();
      ctx.restore();
    };

    const drawPacifier = (cx: number, cy: number, s: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = s * 0.3;
      ctx.beginPath();
      ctx.arc(0, -s * 0.4, s * 1.4, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
      ctx.fillStyle = color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.7})`);
      ctx.beginPath();
      ctx.ellipse(0, s * 0.3, s * 0.45, s * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawFootprint = (cx: number, cy: number, s: number, color: string, rot = 0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      const toeOffsets = [[-s * 0.35, -s * 0.85], [0, -s * 1.0], [s * 0.35, -s * 0.85]];
      toeOffsets.forEach(([tx, ty]) => {
        ctx.beginPath();
        ctx.arc(tx, ty, s * 0.18, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    const drawRattle = (cx: number, cy: number, s: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, -s * 0.6, s * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`);
      ctx.beginPath();
      ctx.roundRect(-s * 0.15, 0, s * 0.3, s * 1.4, s * 0.1);
      ctx.fill();
      ctx.fillStyle = color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.6})`);
      ctx.beginPath();
      ctx.arc(-s * 0.3, -s * 0.8, s * 0.15, 0, Math.PI * 2);
      ctx.arc(s * 0.3, -s * 0.5, s * 0.15, 0, Math.PI * 2);
      ctx.arc(0, -s * 1.2, s * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawBlock = (cx: number, cy: number, s: number, color: string, letter: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(-s, -s, s * 2, s * 2, s * 0.25);
      ctx.fill();
      ctx.fillStyle = color.replace(/[\d.]+\)$/, (m) => `${Math.min(parseFloat(m) * 2.5, 0.9)})`);
      ctx.font = `bold ${s * 1.2}px 'Comic Sans MS', cursive`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(letter, 0, 2);
      ctx.restore();
    };

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#fef6ff");
    grad.addColorStop(0.5, "#f5e6fa");
    grad.addColorStop(1, "#e8f4fd");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const colors = ["#c9a0dc", "#f9c6d9", "#a8d8ea", "#f7e4a3", "#b5e8c3"];
    const rnd = (seed: number) => {
      const x = Math.sin(seed * 9301 + 49297) % 1;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 25; i++) {
      const x = rnd(i * 3) * W;
      const y = rnd(i * 7 + 1) * H;
      const s = 4 + rnd(i * 11) * 8;
      ctx.fillStyle = colors[i % colors.length] + "40";
      ctx.beginPath();
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.fill();
    }

    drawCloud(120, 100, 35, "rgba(168,216,234,0.45)");
    drawCloud(900, 150, 30, "rgba(201,160,220,0.4)");
    drawCloud(180, 950, 28, "rgba(249,198,217,0.45)");
    drawCloud(850, 900, 32, "rgba(181,232,195,0.4)");

    drawStar(100, 200, 24, "rgba(247,228,163,0.75)", 0.3);
    drawStar(950, 250, 20, "rgba(201,160,220,0.7)", 0.8);
    drawStar(130, 700, 18, "rgba(249,198,217,0.7)", 0.5);
    drawStar(920, 750, 22, "rgba(168,216,234,0.75)", 1.2);
    drawStar(200, 450, 16, "rgba(181,232,195,0.7)", 0.1);
    drawStar(880, 500, 19, "rgba(247,228,163,0.7)", 0.6);

    drawHeart(80, 400, 20, "rgba(249,198,217,0.6)");
    drawHeart(980, 420, 18, "rgba(201,160,220,0.55)");
    drawHeart(150, 830, 16, "rgba(249,198,217,0.65)");
    drawHeart(930, 850, 19, "rgba(201,160,220,0.6)");

    drawBottle(75, 300, 22, "rgba(168,216,234,0.65)");
    drawBottle(990, 330, 19, "rgba(201,160,220,0.6)");
    drawBottle(110, 600, 17, "rgba(249,198,217,0.65)");

    drawPacifier(960, 600, 18, "rgba(249,198,217,0.65)");
    drawPacifier(90, 500, 15, "rgba(201,160,220,0.6)");
    drawPacifier(950, 480, 14, "rgba(168,216,234,0.65)");

    drawFootprint(140, 260, 15, "rgba(201,160,220,0.55)", -0.3);
    drawFootprint(165, 310, 15, "rgba(201,160,220,0.55)", 0.2);
    drawFootprint(900, 680, 14, "rgba(249,198,217,0.55)", 0.4);
    drawFootprint(925, 730, 14, "rgba(249,198,217,0.55)", -0.1);
    drawFootprint(85, 780, 13, "rgba(181,232,195,0.6)", 0.5);

    drawRattle(960, 180, 18, "rgba(247,228,163,0.7)");
    drawRattle(80, 880, 15, "rgba(201,160,220,0.6)");

    drawBlock(940, 880, 20, "rgba(168,216,234,0.55)", "A");
    drawBlock(110, 150, 18, "rgba(249,198,217,0.55)", "B");
    drawBlock(960, 80, 16, "rgba(181,232,195,0.55)", "C");

    const owlSize = 220;
    const owlX = (W - owlSize) / 2;
    const owlY = 75;
    ctx.save();
    ctx.shadowColor = "rgba(201,160,220,0.4)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(owlX + owlSize / 2, owlY + owlSize / 2, owlSize / 2 + 8, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.arc(owlX + owlSize / 2, owlY + owlSize / 2, owlSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(owlImg, owlX, owlY, owlSize, owlSize);
    ctx.restore();
    ctx.strokeStyle = "#c9a0dc";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(owlX + owlSize / 2, owlY + owlSize / 2, owlSize / 2, 0, Math.PI * 2);
    ctx.stroke();

    drawStar(owlX - 20, owlY + 20, 12, "rgba(247,228,163,0.6)", 0.4);
    drawStar(owlX + owlSize + 20, owlY + 30, 10, "rgba(249,198,217,0.6)", 0.9);
    drawHeart(owlX + owlSize + 10, owlY + owlSize - 20, 9, "rgba(249,198,217,0.5)");

    ctx.fillStyle = "#7c5a9a";
    ctx.font = "bold 48px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.textAlign = "center";
    ctx.save();
    ctx.shadowColor = "rgba(201,160,220,0.3)";
    ctx.shadowBlur = 8;
    ctx.fillText("MAM La Chouette Violette", W / 2, owlY + owlSize + 70);
    ctx.restore();

    ctx.fillStyle = "#c9a0dc";
    ctx.font = "bold 22px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.fillText("Maison d'Assistantes Maternelles", W / 2, owlY + owlSize + 110);

    const sepY = owlY + owlSize + 135;
    const sepColors = ["#c9a0dc", "#f9c6d9", "#a8d8ea", "#f7e4a3", "#b5e8c3", "#c9a0dc"];
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = sepColors[i];
      ctx.beginPath();
      ctx.arc(W / 2 - 60 + i * 24, sepY, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    const textZoneY = 490;
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.roundRect(120, textZoneY - 30, W - 240, 230, 30);
    ctx.fill();
    ctx.strokeStyle = "rgba(201,160,220,0.3)";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.roundRect(120, textZoneY - 30, W - 240, 230, 30);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    const lines = text.split("\n");
    ctx.fillStyle = "#5a3d7a";
    ctx.font = "bold 40px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.textAlign = "center";
    const lineHeight = 55;
    const totalTextH = lines.length * lineHeight;
    const startY = textZoneY + (200 - totalTextH) / 2 + 15;
    lines.forEach((line, i) => {
      ctx.fillText(line.trim(), W / 2, startY + i * lineHeight);
    });

    const infoY = 780;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.roundRect(160, infoY - 30, W - 320, 230, 25);
    ctx.fill();

    ctx.fillStyle = "#c9a0dc";
    ctx.font = "bold 28px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.fillText("07 69 15 92 42", W / 2, infoY + 10);

    ctx.fillStyle = "#7c5a9a";
    ctx.font = "20px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.fillText("2 bis, allée des aubépines", W / 2, infoY + 55);
    ctx.fillText("31810 Castanet-Tolosan", W / 2, infoY + 85);

    ctx.fillStyle = "#c9a0dc";
    ctx.font = "bold 22px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.fillText("www.lachouetteviolette.fr", W / 2, infoY + 130);

    ctx.fillStyle = "#7c5a9a";
    ctx.font = "18px 'Comic Sans MS', 'Segoe Print', cursive";
    ctx.fillText("Facebook : La Chouette Violette", W / 2, infoY + 170);

    const footerY = H - 50;
    const footerIcons = ["#c9a0dc", "#f9c6d9", "#a8d8ea", "#f7e4a3", "#b5e8c3", "#f9c6d9", "#c9a0dc"];
    for (let i = 0; i < 7; i++) {
      const x = 140 + i * ((W - 280) / 6);
      if (i % 2 === 0) {
        drawStar(x, footerY, 10, footerIcons[i] + "80", i * 0.5);
      } else {
        drawHeart(x, footerY - 8, 8, footerIcons[i] + "80");
      }
    }
  }, [text, owlImg]);

  useEffect(() => {
    drawFlyer();
  }, [drawFlyer]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `communication-chouette-violette-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <SectionHeader title="Communication" description="Générez une fiche de communication à partager sur les réseaux sociaux." />
      <div className="space-y-6">
        <div>
          <FieldLabel>Texte de la fiche</FieldLabel>
          <Textarea
            data-testid="input-comm-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Saisissez votre texte ici..."
            className="text-base"
          />
          <p className="text-xs text-muted-foreground mt-1">Utilisez Entrée pour créer des sauts de ligne.</p>
        </div>
        <div className="border border-border rounded-xl overflow-hidden bg-white">
          <div className="p-4 border-b border-border bg-muted/30">
            <p className="text-sm font-medium text-foreground">Aperçu (1080 x 1080)</p>
          </div>
          <div className="p-4 flex justify-center">
            <canvas
              ref={canvasRef}
              data-testid="canvas-comm-preview"
              className="w-full max-w-[500px] rounded-lg shadow-md"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        </div>
        <Button
          onClick={handleDownload}
          data-testid="button-download-comm"
          className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger l'image
        </Button>
      </div>
    </div>
  );
}


const PERIOD_OPTIONS = [
  { value: "day", label: "Aujourd'hui" },
  { value: "week", label: "7 derniers jours" },
  { value: "month", label: "30 derniers jours" },
  { value: "year", label: "12 derniers mois" },
];

const SOURCE_COLORS = ["#c9a0dc", "#a8d8ea", "#f9c6d9", "#b5e8c3", "#f7e4a3", "#d4b0e8"];

const PAGE_SIZE = 20;

function AnalyticsEditor() {
  const [period, setPeriod] = useState("month");
  const [sourcePage, setSourcePage] = useState(0);

  const handlePeriodChange = (p: string) => {
    setPeriod(p);
    setSourcePage(0);
  };

  const { data, isLoading, refetch } = useQuery<{
    byDay: { date: string; count: number }[];
    bySource: { source: string; count: number }[];
    total: number;
    since: string;
  }>({
    queryKey: ["/api/analytics", period],
    queryFn: async () => {
      const res = await fetch(`/api/analytics?period=${period}`, { credentials: "include" });
      if (!res.ok) throw new Error("Erreur");
      return res.json();
    },
    refetchInterval: 60000,
  });

  const total = data?.total ?? 0;
  const byDay = data?.byDay ?? [];
  const bySource = data?.bySource ?? [];
  const totalSourcePages = Math.ceil(bySource.length / PAGE_SIZE);
  const pagedSources = bySource.slice(sourcePage * PAGE_SIZE, (sourcePage + 1) * PAGE_SIZE);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    if (period === "year") return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  return (
    <div>
      <SectionHeader
        title="Analyse du site"
        description="Statistiques de fréquentation du site public. Les connexions administrateur sont exclues."
      />

      <div className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          {PERIOD_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              data-testid={`button-period-${opt.value}`}
              variant={period === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange(opt.value)}
              className={period === opt.value ? "bg-[#c9a0dc] hover:bg-[#b88fd0] text-white border-0" : ""}
            >
              {opt.label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => refetch()} data-testid="button-refresh-analytics">
            <TrendingUp className="h-4 w-4 mr-1" /> Actualiser
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border rounded-xl p-5 bg-gradient-to-br from-[#f5e6fa] to-white">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users2 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide font-medium">Visites totales</span>
            </div>
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-[#c9a0dc]" />
            ) : (
              <p className="text-3xl font-bold text-[#7c5a9a]">{total.toLocaleString("fr-FR")}</p>
            )}
          </div>
          <div className="border border-border rounded-xl p-5 bg-gradient-to-br from-[#e8f4fd] to-white">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Globe className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide font-medium">Sources différentes</span>
            </div>
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-[#c9a0dc]" />
            ) : (
              <p className="text-3xl font-bold text-[#4a7fa5]">{bySource.length.toLocaleString("fr-FR")}</p>
            )}
          </div>
        </div>

        <div className="border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#c9a0dc]" />
            Visites par jour
          </h3>
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#c9a0dc]" />
            </div>
          ) : byDay.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Aucune donnée pour cette période
            </div>
          ) : (
            <div data-testid="chart-visits-by-day" className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={byDay} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a0dc" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#c9a0dc" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0e8f5" />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    labelFormatter={formatDate}
                    formatter={(v: number) => [v, "Visites"]}
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#c9a0dc" strokeWidth={2} fill="url(#visitGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#c9a0dc]" />
            Visites par source
          </h3>
          {isLoading ? (
            <div className="h-36 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#c9a0dc]" />
            </div>
          ) : bySource.length === 0 ? (
            <div className="h-36 flex items-center justify-center text-muted-foreground text-sm">
              Aucune donnée pour cette période
            </div>
          ) : (
            <>
              <div className="space-y-3" data-testid="list-visits-by-source">
                {pagedSources.map((item, i) => {
                  const globalIndex = sourcePage * PAGE_SIZE + i;
                  const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <div key={item.source} className="space-y-1" data-testid={`source-item-${globalIndex}`}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground capitalize">{item.source}</span>
                        <span className="text-muted-foreground">{item.count} visite{item.count > 1 ? "s" : ""} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: SOURCE_COLORS[globalIndex % SOURCE_COLORS.length] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalSourcePages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Page {sourcePage + 1} / {totalSourcePages} — {bySource.length} sources au total
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSourcePage((p) => Math.max(0, p - 1))}
                      disabled={sourcePage === 0}
                      data-testid="button-sources-prev"
                    >
                      ← Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSourcePage((p) => Math.min(totalSourcePages - 1, p + 1))}
                      disabled={sourcePage >= totalSourcePages - 1}
                      data-testid="button-sources-next"
                    >
                      Suivant →
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
