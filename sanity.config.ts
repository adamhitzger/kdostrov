import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { locate } from './sanity/presentation/locate'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
})
