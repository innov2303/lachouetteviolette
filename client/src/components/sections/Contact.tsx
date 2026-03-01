import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, insertPreinscriptionSchema, type InsertMessage, type InsertPreinscription } from "@shared/schema";
import { useCreateMessage, useCreatePreinscription } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { useSectionContent } from "@/hooks/use-content";
import { queryClient } from "@/lib/queryClient";
import type { ContactContent, SocialLinksContent } from "@shared/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, MapPin, Phone, Mail, ArrowUp, Clock, MessageCircle, ClipboardList, Map } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const createMessage = useCreateMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (formData: InsertMessage) => {
    createMessage.mutate(formData, {
      onSuccess: () => {
        toast({ title: "Message envoye !", description: "Nous vous repondrons dans les plus brefs delais." });
        form.reset();
        onOpenChange(false);
      },
      onError: (err) => {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" data-testid="dialog-contact">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
              <MessageCircle size={18} />
            </div>
            Nous contacter
          </DialogTitle>
          <DialogDescription>Envoyez-nous un message, nous vous repondrons rapidement.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input data-testid="input-contact-name" placeholder="Marie Dupont" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input data-testid="input-contact-email" placeholder="marie@exemple.fr" type="email" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input data-testid="input-contact-phone" placeholder="06 12 34 56 78" type="tel" {...field} value={field.value ?? ""} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre message</FormLabel>
                  <FormControl>
                    <Textarea data-testid="input-contact-message" placeholder="Bonjour, je souhaiterais me renseigner..." className="rounded-lg min-h-[120px] resize-y" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              data-testid="button-submit-contact"
              disabled={createMessage.isPending}
              className="w-full rounded-lg bg-[#c9a0dc] hover:bg-[#b88fd0] text-white"
            >
              {createMessage.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Envoyer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function PreinscriptionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const createPreinscription = useCreatePreinscription();

  const form = useForm<InsertPreinscription>({
    resolver: zodResolver(insertPreinscriptionSchema),
    defaultValues: {
      lastName: "", firstName: "", address: "", email: "", phone: "",
      familySituation: "", familySituationOther: "", employment: "",
      childName: "", childBirthdate: "", hasSiblings: "", onWaitingList: "",
      startDate: "", scheduleDays: "", expectations: "",
    },
  });

  const familySituation = form.watch("familySituation");

  const onSubmit = (formData: InsertPreinscription) => {
    createPreinscription.mutate(formData, {
      onSuccess: () => {
        toast({ title: "Pre-inscription envoyee !", description: "Nous reviendrons vers vous rapidement." });
        form.reset();
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["/api/preinscriptions"] });
      },
      onError: (err) => {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-preinscription">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            Pre-inscription
          </DialogTitle>
          <DialogDescription>Remplissez ce formulaire pour pre-inscrire votre enfant.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-lastname" placeholder="Dupont" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prenom</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-firstname" placeholder="Marie" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse postale</FormLabel>
                  <FormControl>
                    <Input data-testid="input-pre-address" placeholder="12 Rue des Lilas, 31320 Castanet-Tolosan" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-email" placeholder="marie@exemple.fr" type="email" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-phone" placeholder="06 12 34 56 78" type="tel" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="familySituation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situation familiale</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-pre-family" className="rounded-lg">
                          <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Marie(e)">Marie(e)</SelectItem>
                        <SelectItem value="Pacse(e)">Pacse(e)</SelectItem>
                        <SelectItem value="Celibataire">Celibataire</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {familySituation === "Autre" && (
                <FormField
                  control={form.control}
                  name="familySituationOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preciser</FormLabel>
                      <FormControl>
                        <Input data-testid="input-pre-family-other" placeholder="A preciser..." {...field} value={field.value ?? ""} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="employment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emploi</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-employment" placeholder="Votre profession" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prenom de l'enfant</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-child" placeholder="Lucas" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childBirthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input data-testid="input-pre-birthdate" type="date" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hasSiblings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>A-t-il des freres et soeurs ?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-pre-siblings" className="rounded-lg">
                          <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Oui">Oui</SelectItem>
                        <SelectItem value="Non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="onWaitingList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sur liste d'attente en creche ?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-pre-waitinglist" className="rounded-lg">
                          <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Oui">Oui</SelectItem>
                        <SelectItem value="Non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date du debut d'accueil souhaite</FormLabel>
                  <FormControl>
                    <Input data-testid="input-pre-start" type="date" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduleDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jours et horaires de garde souhaites</FormLabel>
                  <FormControl>
                    <Input data-testid="input-pre-schedule" placeholder="Ex: Lundi au Vendredi, 8h30 - 17h30" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vos attentes concernant l'accueil de votre enfant</FormLabel>
                  <FormControl>
                    <Textarea data-testid="input-pre-expectations" placeholder="Decrivez en quelques mots vos attentes..." className="rounded-lg min-h-[100px] resize-y" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              data-testid="button-submit-preinscription"
              disabled={createPreinscription.isPending}
              className="w-full rounded-lg bg-[#c9a0dc] hover:bg-[#b88fd0] text-white"
            >
              {createPreinscription.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardList className="mr-2 h-4 w-4" />}
              Envoyer la pre-inscription
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function Contact() {
  const { data } = useSectionContent<ContactContent>("contact");
  const { data: socialLinks } = useSectionContent<SocialLinksContent>("socialLinks");
  const [contactOpen, setContactOpen] = useState(false);
  const [preinscriptionOpen, setPreinscriptionOpen] = useState(false);

  const sectionLabel = data?.sectionLabel || "Contactez-nous";
  const title = data?.title || "Rencontrons-nous";
  const description = data?.description || "";
  const address = data?.address || "123 Rue des Petits Pas\n75000 Paris, France";
  const phone = data?.phone || "01 23 45 67 89";
  const email = data?.email || "contact@lachouetteviolette.fr";
  const schedule = data?.schedule || [
    { day: "Lundi", hours: "08:00 - 18:30" },
    { day: "Mardi", hours: "08:00 - 18:30" },
    { day: "Mercredi", hours: "08:00 - 18:30" },
    { day: "Jeudi", hours: "08:00 - 18:30" },
    { day: "Vendredi", hours: "08:00 - 18:30" },
  ];

  return (
    <section id="contact" data-testid="section-contact" aria-label="Contactez la MAM La Chouette Violette à Castanet-Tolosan" className="min-h-[calc(100vh-53px)] flex items-center py-20">
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
            <MapPin className="w-5 h-5 text-[#c9a0dc]" />
            <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-card border border-card-border rounded-xl p-6 space-y-5 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Adresse</h4>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Telephone</h4>
                  <p className="text-muted-foreground text-sm">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">{email}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                Horaires d'accueil
              </h4>
              <div className="space-y-2.5 text-sm">
                {schedule.map((s, i) => {
                  const hasRange = s.hours.includes("-");
                  const displayHours = hasRange ? s.hours : "Ferme";
                  return (
                    <div key={i} className="flex items-center py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground min-w-[90px]">{s.day}</span>
                      <span className={`font-medium flex-1 text-center ${hasRange ? "text-foreground" : "text-muted-foreground italic"}`}>{displayHours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                data-testid="button-open-contact"
                className="flex items-center justify-center gap-2 bg-[#c9a0dc] hover:bg-[#b88fd0] text-white rounded-xl px-6 py-3 font-semibold transition-colors duration-300 cursor-pointer"
              >
                <MessageCircle size={18} />
                Nous contacter
              </button>

              <button
                type="button"
                onClick={() => setPreinscriptionOpen(true)}
                data-testid="button-open-preinscription"
                className="flex items-center justify-center gap-2 border-2 border-[#c9a0dc] text-[#c9a0dc] hover:bg-[#c9a0dc] hover:text-white rounded-xl px-6 py-3 font-semibold transition-colors duration-300 cursor-pointer"
              >
                <ClipboardList size={18} />
                Pre-inscription
              </button>
            </div>

            <div className="bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500 flex-1 flex flex-col">
              <iframe
                data-testid="map-embed"
                title="Localisation de La chouette violette"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address.replace(/\n/g, ", "))}&output=embed`}
                className="w-full flex-1 min-h-[250px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {(socialLinks?.facebook || socialLinks?.instagram) && (
              <div className="bg-card border border-card-border rounded-xl p-5 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500">
                <h4 className="font-semibold text-foreground mb-3 text-sm">Retrouvez-nous</h4>
                <div className="flex gap-3">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" data-testid="contact-link-facebook" className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <SiFacebook size={18} />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" data-testid="contact-link-instagram" className="w-10 h-10 rounded-xl bg-[#E4405F] text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <SiInstagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex justify-center mt-14">
          <a
            href="#"
            data-testid="button-back-to-top"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-[#c9a0dc] transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="text-sm tracking-[0.2em] uppercase font-light">Retour en haut</span>
          </a>
        </div>
      </div>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <PreinscriptionDialog open={preinscriptionOpen} onOpenChange={setPreinscriptionOpen} />
    </section>
  );
}
