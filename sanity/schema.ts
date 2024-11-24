import { SchemaTypeDefinition } from 'sanity'
import { galleryType} from './schemas/gallery'
import { eventType } from './schemas/event'
import { staffType } from './schemas/staff'
import { equipmentType } from './schemas/equipment'
import { planyType } from './schemas/plany'
import { staffObject } from './schemas/staffObject'
import { textWithImage } from './schemas/twm'
import { historyType } from './schemas/history'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryType, eventType, staffType, equipmentType, planyType, staffObject, textWithImage, historyType],
}
