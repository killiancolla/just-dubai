import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Pages légales",
  type: "document",
  fields: [
    defineField({
      name: "pageId",
      title: "Identifiant de la page",
      type: "string",
      options: {
        list: [
          { title: "Mentions légales", value: "mentions-legales" },
          { title: "Conditions de réservation (CGV)", value: "cgv" },
          { title: "Politique de confidentialité", value: "confidentialite" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
        { name: "ru", title: "Русский", type: "string" },
      ],
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "array", of: [{ type: "block" }] },
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "ru", title: "Русский", type: "array", of: [{ type: "block" }] },
      ],
    }),
  ],
  preview: {
    select: { title: "title.fr", subtitle: "pageId" },
  },
});
