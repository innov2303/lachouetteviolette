import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertMessage, InsertPreinscription } from "@shared/schema";

export function useCreateMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.messages.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      
      return api.messages.create.responses[201].parse(await res.json());
    },
  });
}

export function useCreatePreinscription() {
  return useMutation({
    mutationFn: async (data: InsertPreinscription) => {
      const { insertPreinscriptionSchema } = await import("@shared/schema");
      const validated = insertPreinscriptionSchema.parse(data);
      const res = await fetch("/api/preinscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Erreur" }));
        throw new Error(err.message);
      }
      return res.json();
    },
  });
}
