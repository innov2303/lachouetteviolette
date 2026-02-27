import { useState } from "react";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { useAllContent, useUpdateContent, useMessages } from "@/hooks/use-content";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, Save, Home, Image, Users, BookOpen, Mail, Plus, Trash2 } from "lucide-react";
import type { HeroContent, GalleryContent, TeamContent, ProjectContent, ContactContent, Message } from "@shared/schema";

const sectionTabs = [
  { id: "gallery", label: "Notre Maison", icon: Image },
  { id: "team", label: "Equipe", icon: Users },
  { id: "project", label: "Pedagogie", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "messages", label: "Messages", icon: Mail },
];

export default function Admin() {
  const auth = useAuth();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("gallery");
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
        <aside className="w-56 border-r border-border min-h-[calc(100vh-53px)] p-4">
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
              {activeTab === "gallery" && <GalleryEditor data={(content.data as Record<string, unknown>).gallery as GalleryContent} />}
              {activeTab === "team" && <TeamEditor data={(content.data as Record<string, unknown>).team as TeamContent} />}
              {activeTab === "project" && <ProjectEditor data={(content.data as Record<string, unknown>).project as ProjectContent} />}
              {activeTab === "contact" && <ContactEditor data={(content.data as Record<string, unknown>).contact as ContactContent} />}
              {activeTab === "messages" && <MessagesViewer />}
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
          <FieldLabel>Label de section</FieldLabel>
          <Input data-testid="input-team-label" value={form.sectionLabel} onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Titre</FieldLabel>
          <Input data-testid="input-team-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
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

  const updatePillar = (index: number, field: string, value: string) => {
    const pillars = [...form.pillars];
    pillars[index] = { ...pillars[index], [field]: value };
    setForm({ ...form, pillars });
  };

  return (
    <div>
      <SectionHeader title="Section Pedagogie" description="Modifiez le projet pedagogique" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Label de section</FieldLabel>
          <Input data-testid="input-project-label" value={form.sectionLabel} onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Titre</FieldLabel>
          <Input data-testid="input-project-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <Textarea data-testid="input-project-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[80px]" />
        </div>

        <div>
          <FieldLabel>Piliers pedagogiques</FieldLabel>
          <div className="space-y-3">
            {form.pillars.map((pillar, i) => (
              <div key={i} className="p-3 border rounded-md bg-muted/50 space-y-2">
                <Input placeholder="Titre" value={pillar.title} onChange={(e) => updatePillar(i, "title", e.target.value)} data-testid={`input-pillar-title-${i}`} />
                <Textarea placeholder="Description" value={pillar.description} onChange={(e) => updatePillar(i, "description", e.target.value)} data-testid={`input-pillar-desc-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel>Titre - Notre approche</FieldLabel>
          <Input data-testid="input-approach-title" value={form.approachTitle} onChange={(e) => setForm({ ...form, approachTitle: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Texte - Notre approche</FieldLabel>
          <Textarea data-testid="input-approach-text" value={form.approachText} onChange={(e) => setForm({ ...form, approachText: e.target.value })} className="min-h-[80px]" />
        </div>
        <div>
          <FieldLabel>Titre - Nos inspirations</FieldLabel>
          <Input data-testid="input-inspiration-title" value={form.inspirationTitle} onChange={(e) => setForm({ ...form, inspirationTitle: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Texte - Nos inspirations</FieldLabel>
          <Textarea data-testid="input-inspiration-text" value={form.inspirationText} onChange={(e) => setForm({ ...form, inspirationText: e.target.value })} className="min-h-[80px]" />
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-project" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function ContactEditor({ data }: { data: ContactContent }) {
  const [form, setForm] = useState(data);
  const update = useUpdateContent("contact");
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast({ title: "Section Contact mise a jour" }),
      onError: () => toast({ title: "Erreur", variant: "destructive" }),
    });
  };

  return (
    <div>
      <SectionHeader title="Section Contact" description="Modifiez les informations de contact" />
      <div className="space-y-4">
        <div>
          <FieldLabel>Label de section</FieldLabel>
          <Input data-testid="input-contact-label" value={form.sectionLabel} onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Titre</FieldLabel>
          <Input data-testid="input-contact-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
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
          <FieldLabel>Horaires (Lundi-Vendredi)</FieldLabel>
          <Input data-testid="input-contact-hours" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Jours fermes</FieldLabel>
          <Input data-testid="input-contact-closed" value={form.closedDays} onChange={(e) => setForm({ ...form, closedDays: e.target.value })} />
        </div>

        <Button onClick={handleSave} disabled={update.isPending} data-testid="button-save-contact" className="bg-[#c9a0dc] hover:bg-[#b88fd0] text-white">
          {update.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function MessagesViewer() {
  const messages = useMessages();

  return (
    <div>
      <SectionHeader title="Messages recus" description="Les messages envoyes depuis le formulaire de contact" />
      {messages.isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-[#c9a0dc]" />
        </div>
      ) : (messages.data as Message[])?.length === 0 ? (
        <p className="text-muted-foreground text-sm" data-testid="text-no-messages">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {(messages.data as Message[])?.map((msg) => (
            <div key={msg.id} className="p-4 border rounded-md bg-card" data-testid={`message-card-${msg.id}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground" data-testid={`text-msg-name-${msg.id}`}>{msg.name}</span>
                <span className="text-xs text-muted-foreground">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1" data-testid={`text-msg-email-${msg.id}`}>{msg.email}</p>
              <p className="text-sm text-foreground whitespace-pre-wrap" data-testid={`text-msg-content-${msg.id}`}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
