import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "ru", title: "Русский", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Réponse",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "text", rows: 4 }),
        defineField({ name: "en", title: "English", type: "text", rows: 4 }),
        defineField({ name: "ru", title: "Русский", type: "text", rows: 4 }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Les FAQ sont triées par ordre croissant",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question.fr", subtitle: "order" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Sans titre", subtitle: `Ordre : ${subtitle ?? 0}` };
    },
  },
});
