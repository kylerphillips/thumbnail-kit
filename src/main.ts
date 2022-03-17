import {
  emit,
  once,
  on,
  showUI,
  updateNodesSortOrder,
  formatSuccessMessage,
  pluralize,
} from "@create-figma-plugin/utilities";

import { CloseHandler, CreateThumbnailHandler, StatusOption } from "./types";

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
    }) {
      console.log("create thumbnail", options);

      const { project, description, status } = options;

      // updateNodesSortOrder(result);
      figma.currentPage.selection = result;
      figma.viewport.scrollAndZoomIntoView(result);

      // Code goes here for plugin to run
      const thumbnailFrame = figma.createFrame();
      thumbnailFrame.name = project;

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
      metaTitle.characters = project;
      metaTitle.fontSize = 50;
      metaTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      metaTitle.x = 420;
      metaTitle.y = 209;

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
      titleContainer.appendChild(metaTitle);
      titleContainer.clipsContent = false;

      // Create content container
      const contentContainer = figma.createFrame();
      contentContainer.name = "Content Container";
      contentContainer.layoutMode = "VERTICAL";
      safeZone.appendChild(contentContainer);
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
      descriptionNode.characters = description;
      descriptionNode.fontSize = 24;
      descriptionNode.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      titleContainer.appendChild(descriptionNode);

      result.push(contentContainer);

      figma.setFileThumbnailNodeAsync(thumbnailFrame);

      console.log("got this far");

      figma.closePlugin(
        formatSuccessMessage(
          `Inserted ${result.length} ${pluralize(result.length, "image")}`
        )
      );
    }
  );
  showUI({
    width: 450,
    height: 700,
  });
}
