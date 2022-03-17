import { EventHandler } from "@create-figma-plugin/utilities";
import { h } from "preact";

export interface CreateThumbnailHandler extends EventHandler {
  name: "CREATE_THUMBNAIL";
  handler: (options: {
    project: string;
    description: string;
    status: StatusOption;
  }) => void;
}

export type StatusOption = {
  value: string;
  backgroundColor: string;
  textColor: string;
  svg?: ((props: any) => h.JSX.Element) | null;
};

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}

export interface InsertBigImageHandler extends EventHandler {
  name: "INSERT_BIG_IMAGE";
  handler: (
    images: Array<ImageNodePlainObject>,
    options: {
      name: string;
      done: boolean;
    }
  ) => void;
}

export type Settings = {
  insertAs2x: boolean;
};
export type InsertBigImageProps = Settings;

export interface DropImagesHandler extends EventHandler {
  name: "DROP_IMAGES";
  handler: (droppedImages: Array<DroppedImage>) => void;
}

export interface SaveSettingsHandler extends EventHandler {
  name: "SAVE_SETTINGS";
  handler: (insertAs2x: boolean) => void;
}

export type ImageNodePlainObject = {
  bytes: Uint8Array;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DroppedImage = {
  bytes: Uint8Array;
  name: string;
  type: string;
};

export type Avatar = {
  id: string;
  url: string;
  file: File;
};
