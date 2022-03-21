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
  Avatar,
  CloseHandler,
  CreateThumbnailHandler,
  DropImagesHandler,
  DroppedImage,
  InsertBigImageHandler,
  StatusOption,
} from "./types";

import { AvatarUpload, Preview } from "./components";
import {
  InProgress,
  Completed,
  OutdatedArchive,
  ReadyDev,
  ReadyFeedback,
} from "./icons";

import { fileToBytes } from "./utilities/images";

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

  const statusOptions: StatusOption[] = [
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

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = (e: any) => {
    setDarkMode(e.target.checked);
  };

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  const currentStatus =
    statusOptions.find((statusOption) => statusOption.value === status) ||
    statusOptions[0];

  const handleCreateThumbnailClick = useCallback(
    async function () {
      const convertedAvatars = await Promise.all(
        avatars.map(async (avatar) => ({
          ...avatar,
          file: null,
          bytes: avatar.file ? await fileToBytes(avatar.file) : null,
        }))
      );

      emit<CreateThumbnailHandler>("CREATE_THUMBNAIL", {
        project: project,
        description: description,
        status: { ...currentStatus, svg: null },
        avatars: convertedAvatars,
      });
    },
    [project, description, currentStatus]
  );

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
          {/* <Text>Dark mode</Text>
          <Toggle onChange={handleDarkModeToggle} value={darkMode} /> */}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
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
          darkMode={darkMode}
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

      <VerticalSpace space="small"></VerticalSpace>
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
      <AvatarUpload
        avatars={avatars}
        setAvatars={setAvatars}
        darkMode={darkMode}
      />
      <VerticalSpace space="small"></VerticalSpace>

      <VerticalSpace space="extraLarge"></VerticalSpace>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          columnGap: 8,
        }}
      >
        <Button onClick={handleCloseButtonClick} secondary>
          Cancel
        </Button>
        <Button onClick={handleCreateThumbnailClick}>Create Thumbnail</Button>
      </div>
    </Container>
  );
}

export default render(Plugin);
