import { defineField, defineType } from "sanity";

export default defineType({
  name: "yacht",
  title: "Yacht",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "lengthFeet",
      title: "Longueur (pieds)",
      type: "number",
      description: "En pieds, comme le nombre qui figure dans le nom du bateau. Le site convertit en mètres pour le français et le russe.",
    }),
    defineField({ name: "capacity", title: "Capacité (personnes)", type: "number" }),
    defineField({ name: "pricePerHour", title: "Prix par heure (AED)", type: "number", description: "Tarif horaire public." }),
    defineField({ name: "pricePerDay", title: "Prix par jour (AED)", type: "number", description: "Tarif journée public (24 h)." }),
    defineField({ name: "featured", title: "Mis en avant", type: "boolean", initialValue: false }),
    defineField({ name: "amenities", title: "Équipements", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "photos", title: "Photos", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text" },
        { name: "en", title: "English", type: "text" },
        { name: "ru", title: "Русский", type: "text" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "lengthFeet" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(val: any) {
      return { title: val.title, subtitle: val.subtitle ? `${val.subtitle} ft` : "" };
    },
  },
});
