import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";

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
import { Loader2, Send, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const createMessage = useCreateMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    createMessage.mutate(data, {
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
    <section id="contact" data-testid="section-contact" className="min-h-[calc(100vh-53px)] flex items-center py-16 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Contactez-nous
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Rencontrons-nous
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vous cherchez une place pour votre enfant ? N'hesitez pas a nous contacter
            pour organiser une visite de notre structure.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                <p className="text-muted-foreground text-sm">
                  123 Rue des Petits Pas<br />75000 Paris, France
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Telephone</h4>
                <p className="text-muted-foreground text-sm">01 23 45 67 89</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">contact@lachouetteviolette.fr</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3">Horaires d'accueil</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium text-foreground">08:00 - 18:30</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Samedi - Dimanche</span>
                  <span>Ferme</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card p-8 md:p-10 rounded-md border border-border"
          >
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
                          className="rounded-md border-border bg-background"
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
                          className="rounded-md border-border bg-background"
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
                          className="rounded-md border-border bg-background min-h-[130px] resize-none"
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
                  className="w-full rounded-none bg-primary text-primary-foreground tracking-wider uppercase text-sm py-3"
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

        <div className="flex justify-center mt-12">
          <a
            href="#"
            data-testid="button-back-to-top"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
