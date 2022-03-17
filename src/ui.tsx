import {
  Button,
  Columns,
  Container,
  render,
  Text,
  Textbox,
  VerticalSpace,
  Toggle,
  TextboxAutocomplete,
  TextboxMultiline,
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import {
  splitImageAsync,
  createImageURLFromFile,
} from "./utilities/split-image-async.js";

import {
  Avatar,
  CloseHandler,
  CreateThumbnailHandler,
  DropImagesHandler,
  DroppedImage,
  InsertBigImageHandler,
} from "./types";

import { AvatarUpload, Preview } from "./components";
import {
  InProgress,
  Completed,
  OutdatedArchive,
  ReadyDev,
  ReadyFeedback,
} from "./icons";

function Plugin() {
  // handle image uploaded files

  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);

  const [images, setImages] = useState<any[]>([]);

  // accepted file uploads
  const acceptedFileTypes = ["image/x-png", "image/jpeg"];

  const [project, setProject] = useState("");
  function handleProjectInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setProject(newValue);
  }

  const [description, setDescription] = useState("");
  function handleDescriptionInput(
    event: JSX.TargetedEvent<HTMLTextAreaElement>
  ) {
    const newValue = event.currentTarget.value;
    setDescription(newValue);
  }

  const options: { value: string }[] = [
    { value: "In Progress" },
    { value: "Ready for Dev" },
    { value: "Ready for Feedback" },
    { value: "Completed" },
    { value: "Outdated/Archive" },
  ];

  const statusOptions: {
    value: string;
    backgroundColor: string;
    textColor: string;
    svg?: (props: any) => h.JSX.Element;
  }[] = [
    {
      value: "In Progress",
      backgroundColor: "#F5E3C7",
      textColor: "#A96D25",
      svg: InProgress,
    },

    {
      value: "Ready for Dev",
      backgroundColor: "#DED9FF",
      textColor: "#4C4096",
      svg: ReadyDev,
    },

    {
      value: "Ready for Feedback",
      backgroundColor: "#CEE2FF",
      textColor: "#314B73",
      svg: ReadyFeedback,
    },

    {
      value: "Completed",
      backgroundColor: "#E0EDCD",
      textColor: "#3F7000",
      svg: Completed,
    },

    {
      value: "Outdated/Archive",
      backgroundColor: "#E3E5F2",
      textColor: "#4B4E5F",
      svg: OutdatedArchive,
    },
  ];

  const [status, setStatus] = useState(options[0].value);
  function handleStatus(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setStatus(newValue);
  }

  const handleSelectedFiles = useCallback(
    async function (files: Array<File>) {
      const total = files.length;
      setTotal(total);
      let index = 0;
      let newImages: string[] = [];
      console.log(files);
      for (const file of files) {
        const images = await splitImageAsync(file);
        const name = trimExtension(file.name);
        console.log(images);
        emit<CreateThumbnailHandler>("CREATE_THUMBNAIL", project, images, {
          done: index === total - 1,
          name,
        });
        setIndex(index);
        index += 1;
        newImages.push(createImageURLFromFile(file));
      }
      setImages([...images, ...newImages]);
    },
    [setIndex, setTotal]
  );

  useEffect(
    function () {
      return on<DropImagesHandler>(
        "DROP_IMAGES",
        async function (droppedImages: Array<DroppedImage>) {
          const files: Array<File> = [];
          for (const droppedImage of droppedImages) {
            const blob = new Blob([droppedImage.bytes], {
              type: droppedImage.type,
            });
            const file = new File([blob], droppedImage.name);
            files.push(file);
          }
          await handleSelectedFiles(files);
        }
      );
    },
    [handleSelectedFiles]
  );

  function trimExtension(fileName: string): string {
    return fileName.substring(0, fileName.lastIndexOf("."));
  }

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = (e: any) => {
    setDarkMode(e.target.checked);
  };

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  const [avatars, setAvatars] = useState<Avatar[]>([]);

  return (
    <Container>
      <VerticalSpace space="extraLarge"></VerticalSpace>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text bold>Preview</Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 8,
            overflow: "hidden",
          }}
        >
          <Text>Dark mode</Text>
          <Toggle onChange={handleDarkModeToggle} value={darkMode} />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fbfbfb",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <VerticalSpace space="small"></VerticalSpace>

        <Preview
          avatars={avatars}
          project={project}
          status={status}
          statusOptions={statusOptions}
          description={description}
        />

        <VerticalSpace space="small"></VerticalSpace>
      </div>

      <div
        style={{
          display: "flex",
          columnGap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <Text bold>Project Name</Text>
          <VerticalSpace space="small"></VerticalSpace>
          <Textbox
            onInput={handleProjectInput}
            placeholder="e.g. File name"
            value={project}
          />
          <VerticalSpace space="extraLarge"></VerticalSpace>
        </div>
        <div style={{ flex: 1 }}>
          <Text bold>Project Status</Text>

          <VerticalSpace space="small"></VerticalSpace>
          <TextboxAutocomplete
            onInput={handleStatus}
            placeholder="e.g. In Progress"
            options={options}
            value={status}
            strict
          />
          <VerticalSpace space="extraLarge"></VerticalSpace>
        </div>
      </div>

      <VerticalSpace space="medium"></VerticalSpace>
      <Text bold>Description</Text>
      <VerticalSpace space="small"></VerticalSpace>
      <TextboxMultiline
        onInput={handleDescriptionInput}
        placeholder="Enter description for your file"
        value={description}
      />

      <VerticalSpace space="large"></VerticalSpace>

      <Text bold>Collaborators</Text>
      <VerticalSpace space="extraSmall"></VerticalSpace>
      <Text
        style={{
          color: "909090",
        }}
      >
        Tap the + to upload an avatar for someone working on this file
      </Text>
      <VerticalSpace space="small"></VerticalSpace>
      <AvatarUpload avatars={avatars} setAvatars={setAvatars} />
      <VerticalSpace space="small"></VerticalSpace>

      <VerticalSpace space="extraLarge"></VerticalSpace>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          columnGap: 8,
        }}
      >
        <Button secondary>Cancel</Button>
        <Button>Create Thumbnail</Button>
      </div>
    </Container>
  );
}

export default render(Plugin);
