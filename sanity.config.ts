import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { locate } from './sanity/presentation/locate'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import { presentationTool } from 'sanity/presentation'
import { DocumentActionComponent, DocumentActionsResolver } from 'sanity'
import sendMails from './sanity/lib/actions'
export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  document: {
    actions: ((prev: DocumentActionComponent[], context: { schemaType: string }) => {
      // Check if the schema type is 'orders'
      if (context.schemaType === 'event') {
        return [...prev,sendMails, ];
      }
      return prev;
    }) as DocumentActionsResolver,
  },
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
