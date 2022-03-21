import {
  emit,
  once,
  on,
  showUI,
  updateNodesSortOrder,
  formatSuccessMessage,
  pluralize,
} from "@create-figma-plugin/utilities";
import { InProgressPath } from "./icons";
import svgPathPrettify from "svg-path-prettify";

import {
  Avatar,
  CloseHandler,
  CreateThumbnailHandler,
  StatusOption,
} from "./types";
import { hexToRgb } from "./utilities/colors";

export default async function (): Promise<void> {
  const result: Array<SceneNode> = [];

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  on<CreateThumbnailHandler>(
    "CREATE_THUMBNAIL",
    async function (options: {
      project: string;
      description: string;
      status: StatusOption;
      avatars: Avatar[];
    }) {
      console.log("create thumbnail", options);

      const { project, description, status, avatars } = options;
      

      // Code goes here for plugin to run
      const thumbnailFrame = figma.createFrame();

       //conditional frame name logic
       if (project.length > 1) {
        thumbnailFrame.name = project;
      }
      if (project.length < 1) {
        thumbnailFrame.name = "Cover";
      }


     

      // Set Autolayout for frame and direction, padding, spacing etc
      thumbnailFrame.resize(960, 480);
      // Set Background color

      thumbnailFrame.fills = [
        {
          type: "SOLID",
          color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 },
        },
      ];

      // Create Safe Zone
      const safeZone = figma.createFrame();
      safeZone.name = "Safe Zone Container";
      thumbnailFrame.appendChild(safeZone);
      safeZone.fills = [
        {
          type: "SOLID",
          color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 },
        },
      ];
      safeZone.resize(610, 360);

      // Center safe zone container
      safeZone.x = 175;
      safeZone.y = 60;

      // Create title
      let metaTitle = figma.createText();
      let blackFont = { family: "Inter", style: "Black" };
      await figma.loadFontAsync(blackFont);
      metaTitle.fontName = blackFont;
      thumbnailFrame.appendChild(metaTitle);

      //conditional project name logic
      if (project.length > 1) {
        metaTitle.characters = project;
      }
      if (project.length < 1) {
        metaTitle.characters = "Project name";
      }


     
      metaTitle.fontSize = 64;
      metaTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      metaTitle.x = 420;
      metaTitle.y = 209;

      // Create tag
      let tag = figma.createText();
      tag.fontName = blackFont;
      tag.characters = status.value;
      tag.textCase = "UPPER";
      tag.fills = [
        {
          type: "SOLID",
          color: hexToRgb(status.textColor),
        },
      ];
      tag.fontSize = 20;
      const tagContainer = figma.createFrame();
      tagContainer.layoutMode = "HORIZONTAL";
      tagContainer.fills = [
        { type: "SOLID", color: hexToRgb(status.backgroundColor) },
      ];

      // let tagIcon = figma.createVector();
      // tagIcon.vectorPaths = InProgressPath.map((path) => ({
      //   ...path,
      //   data: svgPathPrettify(path.data),
      // }));
      // tagIcon.fills = [
      //   {
      //     type: "SOLID",
      //     color: hexToRgb(status.textColor),
      //   },
      // ];

      const horizontalPadding = 32;
      const veritcalPadding = 16;

      tagContainer.resize(
        tag.width + horizontalPadding * 2,
        20 + veritcalPadding * 2
      );
      tagContainer.itemSpacing = 12;
      tagContainer.horizontalPadding = horizontalPadding;
      tagContainer.verticalPadding = veritcalPadding;
      tagContainer.cornerRadius = 12;
      tagContainer.primaryAxisSizingMode = "AUTO";

      // Create title + description container
      const titleContainer = figma.createFrame();
      titleContainer.name = "Title Container";
      titleContainer.layoutMode = "VERTICAL";
      titleContainer.fills = [
        {
          type: "SOLID",
          color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 },
        },
      ];
      titleContainer.appendChild(tag);
      titleContainer.appendChild(tagContainer);
      tagContainer.appendChild(tag);
      // tagContainer.appendChild(tagIcon);
      titleContainer.appendChild(metaTitle);
      titleContainer.clipsContent = false;
      titleContainer.itemSpacing = 16

      // Create tag container
      const tagContainerFrame = figma.createFrame();
      tagContainerFrame.name = "Tag Container";
      tagContainerFrame.appendChild(tagContainer);
      tagContainerFrame.layoutMode = "VERTICAL";
      tagContainerFrame.primaryAxisSizingMode = "AUTO";
      tagContainerFrame.clipsContent = false;
      tagContainerFrame.fills = [
        {
          type: "SOLID",
          color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 },
        },
      ];

      // Create content container
      const contentContainer = figma.createFrame();
      contentContainer.name = "Content Container";
      contentContainer.layoutMode = "VERTICAL";
      safeZone.appendChild(contentContainer);
      //insert tag into content container
      contentContainer.appendChild(tagContainerFrame);
      // insert title into contentcontainer
      contentContainer.appendChild(titleContainer);
      contentContainer.clipsContent = false;
      contentContainer.resize(contentContainer.width, 360);
      contentContainer.fills = [
        {
          type: "SOLID",
          color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 },
        },
      ];
      contentContainer.primaryAxisAlignItems = "CENTER";

      // Create description
      let descriptionNode = figma.createText();
      let regularFont = { family: "Inter", style: "Regular" };
      await figma.loadFontAsync(regularFont);
      descriptionNode.fontName = regularFont;


       //conditional project name logic
       if (description.length > 1) {
        descriptionNode.characters = description;
      }
      if (description.length < 1) {
        descriptionNode.characters = "Figma connects everyone in the design process so teams can deliver better products, faster.";
      }
      descriptionNode.fontSize = 24;
      descriptionNode.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      descriptionNode.opacity = 0.8;
      titleContainer.appendChild(descriptionNode);

      // set spacing
      contentContainer.itemSpacing = 32;


      function renderAvatarStack(avatars) {
       
        if (avatars.length > 1) {
          let avatarStack = figma.createFrame();
          avatarStack.layoutMode = "HORIZONTAL";
          avatarStack.fills = [];
          avatarStack.clipsContent = false;
          

          for (const avatar of avatars) {
            let avatarItem = figma.createFrame();
            avatarItem.resize(40, 56);
            let innerAvatarItem = figma.createEllipse();
            innerAvatarItem.resize(56, 56);
            avatarItem.clipsContent = false;
            let image = figma.createImage(avatar.bytes || new Uint8Array(0));
            avatarItem.fills = [];
            innerAvatarItem.fills = [
              {
                type: "IMAGE",
                scaleMode: "FILL",
                imageHash: image.hash,
              },
            ];
            innerAvatarItem.strokes = [
              {
                type: "SOLID",
                color: hexToRgb("#1C1C1E"),
              },
            ];
            innerAvatarItem.strokeWeight = 3;
    
            avatarItem.appendChild(innerAvatarItem);
            avatarStack.appendChild(avatarItem);
          }

          avatarStack.resize(avatarStack.height, 56)
    
          contentContainer.appendChild(avatarStack);
        }
       
        
      }
      renderAvatarStack(avatars);

      result.push(contentContainer);

      figma.setFileThumbnailNodeAsync(thumbnailFrame);


      // set width of title + description
      metaTitle.resize(safeZone.width,metaTitle.height)
      descriptionNode.resize(safeZone.width,descriptionNode.height)
  


      // Zoom in thumbnail

      const newPage = figma.createPage();
    newPage.name = 'Cover';
    figma.currentPage = newPage;

    newPage.appendChild(thumbnailFrame);

      const frameScene: Array<SceneNode> = []
      frameScene.push(thumbnailFrame);
      figma.viewport.scrollAndZoomIntoView(result);


      figma.closePlugin(
        formatSuccessMessage(
          `✨ Thumbnail created`
        )
      );
    }
  );
  showUI({
    width: 450,
    height: 700,
  });
}
