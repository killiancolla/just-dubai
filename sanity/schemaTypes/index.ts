import { type SchemaTypeDefinition } from 'sanity'
import vehicle from '../schemas/vehicle'
import yacht from '../schemas/yacht'
import blogPost from '../schemas/blogPost'
import siteSettings from '../schemas/siteSettings'
import faq from '../schemas/faq'
import legalPage from '../schemas/legalPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicle, yacht, blogPost, siteSettings, faq, legalPage],
}
