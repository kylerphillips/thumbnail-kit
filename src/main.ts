import { once, showUI } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateThumbnailHandler } from './types'

export default function () {

  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  once<CreateThumbnailHandler>('CREATE_THUMBNAIL', async function (project) {
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



    
  })
  showUI({
    width: 450,
    height: 500
  })
}
