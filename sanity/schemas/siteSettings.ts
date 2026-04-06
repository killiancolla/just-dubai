import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "aboutContent",
      title: "Contenu | Qui sommes-nous",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "array", of: [{ type: "block" }] },
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "ru", title: "Русский", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({ name: "aboutImage", title: "Photo équipe / Dubaï", type: "image", options: { hotspot: true } }),
  ],
});
