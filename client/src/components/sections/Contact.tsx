import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { useSectionContent } from "@/hooks/use-content";
import type { ContactContent } from "@shared/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send, MapPin, Phone, Mail, ArrowUp, Clock } from "lucide-react";
import owlSeparator from "@assets/owl_orange.png";
import { SiFacebook, SiInstagram } from "react-icons/si";
import type { SocialLinksContent } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const createMessage = useCreateMessage();
  const { data } = useSectionContent<ContactContent>("contact");
  const { data: socialLinks } = useSectionContent<SocialLinksContent>("socialLinks");

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

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (formData: InsertMessage) => {
    createMessage.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Message envoye !",
          description: "Nous vous repondrons dans les plus brefs delais.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "Erreur",
          description: err.message || "Une erreur est survenue lors de l'envoi.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section id="contact" data-testid="section-contact" className="min-h-[calc(100vh-53px)] flex items-center py-20">
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
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {address}
                  </p>
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
                {schedule.filter((s) => s.day.toLowerCase() !== "mercredi").map((s, i) => {
                  const hasRange = s.hours.includes("-");
                  const displayHours = hasRange ? s.hours : "Fermé";
                  const parts = hasRange ? displayHours.split(/\s*-\s*/) : null;
                  return (
                    <div key={i} className="flex justify-between gap-2 py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{s.day}</span>
                      {parts ? (
                        <span className="font-medium text-foreground text-right leading-relaxed">
                          {parts[0]}<br />- {parts[1]}
                        </span>
                      ) : (
                        <span className="font-medium text-muted-foreground italic">{displayHours}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {(() => {
              const mercredi = schedule.find((s) => s.day.toLowerCase() === "mercredi");
              if (!mercredi) return null;
              const hasRange = mercredi.hours.includes("-");
              const displayHours = hasRange ? mercredi.hours : "Fermé";
              const parts = hasRange ? displayHours.split(/\s*-\s*/) : null;
              return (
                <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                      <Clock size={18} />
                    </div>
                    Horaires du mercredi
                  </h4>
                  <div className="text-sm">
                    <div className="flex justify-between gap-2 py-1">
                      <span className="text-muted-foreground">Mercredi</span>
                      {parts ? (
                        <span className="font-medium text-foreground text-right leading-relaxed">
                          {parts[0]}<br />- {parts[1]}
                        </span>
                      ) : (
                        <span className="font-medium text-muted-foreground italic">{displayHours}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {(socialLinks?.facebook || socialLinks?.instagram) && (
              <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500">
                <h4 className="font-semibold text-foreground mb-4">Retrouvez-nous</h4>
                <div className="flex gap-3">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-link-facebook"
                      className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <SiFacebook size={18} />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-link-instagram"
                      className="w-10 h-10 rounded-xl bg-[#E4405F] text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <SiInstagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card border border-card-border rounded-xl p-8 md:p-10 hover:shadow-lg hover:border-[#c9a0dc]/25 transition-all duration-500"
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c9a0dc]/10 text-[#c9a0dc] flex items-center justify-center shrink-0">
                <Send size={18} />
              </div>
              Envoyez-nous un message
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-medium">
                        Nom complet
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-name"
                          placeholder="Marie Dupont"
                          {...field}
                          className="rounded-lg border-border bg-background"
                        />
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
                      <FormLabel className="text-foreground text-sm font-medium">
                        Adresse email
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-email"
                          placeholder="marie@exemple.fr"
                          type="email"
                          {...field}
                          className="rounded-lg border-border bg-background"
                        />
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
                      <FormLabel className="text-foreground text-sm font-medium">
                        Votre message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          data-testid="input-message"
                          placeholder="Bonjour, je souhaiterais me renseigner pour une place..."
                          className="rounded-lg border-border bg-background min-h-[130px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  data-testid="button-submit-contact"
                  disabled={createMessage.isPending}
                  className="w-full rounded-lg bg-[#c9a0dc] hover:bg-[#b88fd0] text-white tracking-wider uppercase text-sm py-3"
                >
                  {createMessage.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>

        <div className="flex justify-center mt-14">
          <a
            href="#"
            data-testid="button-back-to-top"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-[#c9a0dc] transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="text-sm tracking-[0.2em] uppercase font-light">
              Retour en haut
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
