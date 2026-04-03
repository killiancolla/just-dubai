import { defineField, defineType } from "sanity";

export default defineType({
  name: "vehicle",
  title: "Véhicule",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "brand", title: "Marque", type: "string", validation: (r) => r.required() }),
    defineField({ name: "model", title: "Modèle", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Année", type: "number" }),
    defineField({
      name: "fuel",
      title: "Carburant",
      type: "string",
      options: { list: ["essence", "hybride", "electrique"] },
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      options: { list: ["automatique", "manuelle"] },
    }),
    defineField({ name: "seats", title: "Nombre de places", type: "number" }),
    defineField({ name: "featured", title: "Mis en avant", type: "boolean", initialValue: false }),
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
    select: { title: "name", subtitle: "brand", media: "photos.0" },
  },
});
