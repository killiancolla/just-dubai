import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Article de blog",
  type: "document",
  fields: [
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
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.fr" }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Date de publication", type: "datetime" }),
    defineField({ name: "coverImage", title: "Image de couverture", type: "image", options: { hotspot: true } }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text" },
        { name: "en", title: "English", type: "text" },
        { name: "ru", title: "Русский", type: "text" },
      ],
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "array", of: [{ type: "block" }] },
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "ru", title: "Русский", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({ name: "categories", title: "Catégories", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text" },
      ],
    }),
  ],
  preview: {
    select: { title: "title.fr", media: "coverImage" },
  },
});
