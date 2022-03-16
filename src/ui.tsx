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
    svg?: string;
  }[] = [
    {
      value: "In Progress",
      backgroundColor: "#F5E3C7",
      textColor: "#A96D25",
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 3.58172 12.4183 -1.93129e-07 8 0C3.58172 1.93129e-07 -1.93129e-07 3.58172 0 8C1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8 4V7H3V9H8V12H9L13 8L9 4H8Z" fill="#A96D25"/>
    </svg>`,
    },

    {
      value: "Ready for Dev",
      backgroundColor: "#DED9FF",
      textColor: "#4C4096",
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="#4C4096"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11 4L6 6L4 11L5 12L10 10L12 5L11 4Z" fill="#4C4096"/>
      </svg>`,
    },

    {
      value: "Ready for Feedback",
      backgroundColor: "#CEE2FF",
      textColor: "#314B73",
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 3.58172 12.4183 -1.93129e-07 8 0C3.58172 1.93129e-07 -1.93129e-07 3.58172 0 8C1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8 4V7H3V9H8V12H9L13 8L9 4H8Z" fill="#A96D25"/>
    </svg>`,
    },

    {
      value: "Completed",
      backgroundColor: "#E0EDCD",
      textColor: "#3F7000",
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.7071 5.70711L11.2929 4.29289L6.5 9.08579L4.70711 7.29289L3.29289 8.70711L6.5 11.9142L12.7071 5.70711Z" fill="#3F7000"/>
      </svg>
      `,
    },

    {
      value: "Outdated/Archive",
      backgroundColor: "#E3E5F2",
      textColor: "#4B4E5F",
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.29289 5.70711L6.58579 8L4.29289 10.2929L5.70711 11.7071L8 9.41421L10.2929 11.7071L11.7071 10.2929L9.41421 8L11.7071 5.70711L10.2929 4.29289L8 6.58579L5.70711 4.29289L4.29289 5.70711Z" fill="#4B4E5F"/>
      </svg>`,
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
          statusOptions={options}
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
