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
import { Send, Loader2 } from "lucide-react";

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
          title: "Message envoyé ! 🦉",
          description: "Nous vous répondrons dans les plus brefs délais.",
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
    <section id="contact" className="py-20 md:py-32 bg-primary/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-xl border border-primary/10 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="md:w-5/12 bg-primary text-primary-foreground p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold mb-4">
                Rencontrons-nous
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                Vous cherchez une place pour votre enfant ? Vous avez des questions sur notre fonctionnement ? N'hésitez pas à nous écrire.
              </p>
            </div>
            
            <div className="relative z-10 mt-auto">
              <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <span className="font-display text-xl font-medium italic">
                  "Un cocon pour bien grandir"
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-7/12 p-10 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Nom complet</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Marie Dupont" 
                          {...field} 
                          className="rounded-xl bg-muted/50 border-border py-6 px-4 focus-visible:ring-primary focus-visible:border-primary"
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
                      <FormLabel className="text-foreground font-semibold">Adresse email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="marie@exemple.fr" 
                          type="email"
                          {...field} 
                          className="rounded-xl bg-muted/50 border-border py-6 px-4 focus-visible:ring-primary focus-visible:border-primary"
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
                      <FormLabel className="text-foreground font-semibold">Votre message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Bonjour, je souhaiterais me renseigner pour une place..." 
                          className="rounded-xl bg-muted/50 border-border p-4 min-h-[150px] resize-none focus-visible:ring-primary focus-visible:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={createMessage.isPending}
                  className="w-full rounded-xl py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  {createMessage.isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><Send className="mr-2 h-5 w-5" /> Envoyer le message</>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
