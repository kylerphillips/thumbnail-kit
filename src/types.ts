import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreateThumbnailHandler extends EventHandler {
  name: 'CREATE_THUMBNAIL'
  handler: (project: string) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}
