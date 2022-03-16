import { emit, once, on, showUI, loadSettingsAsync, saveSettingsAsync, updateNodesSortOrder,formatSuccessMessage, pluralize } from '@create-figma-plugin/utilities'

import { defaultSettings, settingsKey } from './utilities/settings.js'
import { createImageNode } from './utilities/create-image-node.js'

import { CloseHandler, CreateThumbnailHandler,
  DropImagesHandler,
  DroppedImage,
  ImageNodePlainObject,
  InsertBigImageHandler,
  SaveSettingsHandler,
 } from './types'

 export default async function (): Promise<void> {


  let xOffset = Math.round(figma.viewport.center.x)
  let yOffset = Math.round(figma.viewport.center.y)
  const result: Array<SceneNode> = []
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  figma.on('drop', function (event: DropEvent): boolean {
    xOffset = event.absoluteX
    yOffset = event.absoluteY
  const promises: Array<Promise<Uint8Array>> = []
  for (const file of event.files) {
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      promises.push(file.getBytesAsync())
    }
  }
  if (promises.length === 0) {
    return true
  }
  Promise.all(promises).then(function (result: Array<Uint8Array>): void {
    const droppedImages: Array<DroppedImage> = result.map(function (
      bytes: Uint8Array,
      index: number
    ) {
      const file = event.files[index]
      return { bytes, name: file.name, type: file.type }
    })
    emit<DropImagesHandler>('DROP_IMAGES', droppedImages)
  })
  return false
})


  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  once<CreateThumbnailHandler>('CREATE_THUMBNAIL', async function (project, imageNodePlainObjects: Array<ImageNodePlainObject>,
    options: { name: string; done: boolean }) {
{
        const { name, done } = options
        const { insertAs2x } = await loadSettingsAsync(
          defaultSettings,
          settingsKey
        )
        const imageNodes: Array<RectangleNode> = []
        for (const imageNodePlainObject of imageNodePlainObjects) {
          const imageNode = createImageNode(imageNodePlainObject, {
            resolution: insertAs2x === true ? 2 : 1,
            xOffset,
            yOffset
          })
          imageNodes.push(imageNode)
        }
        if (imageNodes.length === 1) {
          imageNodes[0].name = name
          result.push(imageNodes[0])
          xOffset += imageNodes[0].width
        } else {
          updateNodesSortOrder(imageNodes)
          const group = figma.group(imageNodes, figma.currentPage)
          group.name = name
          result.push(group)
          xOffset += group.width
        }
        if (done === false) {
          return
        }
        updateNodesSortOrder(result)
        figma.currentPage.selection = result
        figma.viewport.scrollAndZoomIntoView(result)




 // Code goes here for plugin to run
 const thumbnailFrame =  figma.createFrame();
 thumbnailFrame.name = project

 // Set Autolayout for frame and direction, padding, spacing etc
 thumbnailFrame.resize(960,480);
  // Set Background color

 thumbnailFrame.fills=[{type: 'SOLID', color: {r:0.1098039216, g: 0.1098039216, b:0.1176470588}}]
 
// Create Safe Zone
const safeZone = figma.createFrame();
safeZone.name = 'Safe Zone Container'
thumbnailFrame.appendChild(safeZone);
safeZone.fills=[{type: 'SOLID', color: {r:0.1098039216, g: 0.1098039216, b:0.1176470588}}]
safeZone.resize(610,360)

// Center safe zone container
safeZone.x = 175
safeZone.y = 60

// Create title
let metaTitle = figma.createText();
let blackFont = {family: "Inter", style: "Black"};
await figma.loadFontAsync(blackFont);
metaTitle.fontName = blackFont;
thumbnailFrame.appendChild(metaTitle);
metaTitle.characters = project
metaTitle.fontSize=50;
metaTitle.fills=[{type: 'SOLID', color: {r:1, g: 1, b:1}}]
metaTitle.x = 400
metaTitle.y = 209



// Create title + description container
const titleContainer = figma.createFrame();
titleContainer.name = 'Title Container'
titleContainer.layoutMode = 'VERTICAL'
titleContainer.fills=[{type: 'SOLID', color: {r:0.1098039216, g: 0.1098039216, b:0.1176470588}}]
titleContainer.appendChild(metaTitle);
titleContainer.clipsContent = false;

// Create content container
const contentContainer = figma.createFrame();
contentContainer.name = 'Content Container'
contentContainer.layoutMode = 'VERTICAL'
safeZone.appendChild(contentContainer);
contentContainer.appendChild(titleContainer);
contentContainer.clipsContent = false;
contentContainer.resize(contentContainer.width, 360)
contentContainer.fills=[{type: 'SOLID', color: {r:0.1098039216, g: 0.1098039216, b:0.1176470588}}]
contentContainer.primaryAxisAlignItems = 'CENTER';


// Create description
let description = figma.createText();
let regularFont = {family: "Inter", style: "Regular"};
await figma.loadFontAsync(regularFont);
description.fontName = regularFont;
description.characters = 'This is a long test description'
description.fontSize=24;
description.fills=[{type: 'SOLID', color: {r:1, g: 1, b:1}}]
titleContainer.appendChild(description);

figma.setFileThumbnailNodeAsync(thumbnailFrame);
  figma.closePlugin()



        figma.closePlugin(
          formatSuccessMessage(
            `Inserted ${result.length} ${pluralize(result.length, 'image')}`
          )
        )
      }

  })
  showUI({
    width: 450,
    height: 500
  }, )}
