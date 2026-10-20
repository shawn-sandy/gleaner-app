import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

import { gleanerReleasesLoader } from '#libs/gleaner-releases'

const baseSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string(),
  breadcrumbSlug: z.string().optional(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  publish: z.boolean().default(false),
  featured: z.boolean().default(false),
  youtube: z
    .object({
      id: z.string(),
      title: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
})

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: baseSchema,
})

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    }),
  }),
})

const content = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/content' }),
  schema: baseSchema,
})

/** Gleaner's GitHub releases, loaded at build time. Each release rebuilds the site via a Netlify build hook. */
const releases = defineCollection({
  loader: gleanerReleasesLoader({ token: import.meta.env.GITHUB_TOKEN }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    publishedAt: z.coerce.date(),
  }),
})

export const collections = {
  posts,
  docs,
  content,
  releases,
}
