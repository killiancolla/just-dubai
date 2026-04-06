import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "socialProof",
      title: "Preuves sociales (homepage)",
      type: "object",
      fields: [
        defineField({ name: "clientsCount", title: "Clients satisfaits", type: "number", description: "Ex: 1500" }),
        defineField({ name: "followersCount", title: "Abonnés réseaux sociaux", type: "number", description: "Ex: 12000" }),
        defineField({ name: "weeklyVehicleBookings", title: "Réservations voitures / semaine", type: "number", description: "Ex: 40" }),
        defineField({ name: "weeklyYachtBookings", title: "Réservations yachts / semaine", type: "number", description: "Ex: 15" }),
      ],
    }),
  ],
});
