import { h } from "preact";
import { useState } from "preact/hooks";
import { createImageURLFromFile } from "../utilities/split-image-async";
import { v4 as uuid } from "uuid";
import { Avatar } from "../types";
import { Plus, TrashSimple } from "../icons";

export const AvatarUpload = ({ avatars, setAvatars }) => {
  const acceptedFileTypes = ["image/x-png", "image/png", "image/jpeg"];
  const [hover, setHover] = useState<string>("");

  const onFileUpload = (event: any) => {
    let newImages: Avatar[] = [];

    for (const file of event.target.files) {
      if (acceptedFileTypes.includes(file.type)) {
        newImages.push({
          id: uuid(),
          url: createImageURLFromFile(file),
          file,
        });
      }
    }

    setAvatars([...avatars, ...newImages]);
  };

  const removeAvatar = (id: string) => {
    setAvatars(avatars.filter((avatar) => avatar.id !== id));
  };

  const overlap = 20;

  return (
    <div
      style={{
        display: "flex",
        columnGap: 8,
        height: 48,
        alignItems: "center",
      }}
    >
      {avatars.length > 0 && (
        <div
          style={{
            display: "flex",
            columnGap: 8,
            height: 48,
            alignItems: "center",
            paddingLeft: overlap,
          }}
        >
          {avatars.map((avatar, index) => (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                marginLeft: -overlap,
                position: "relative",
              }}
              onMouseEnter={() => setHover(avatar.id)}
              onMouseLeave={() => setHover("")}
            >
              <img
                src={avatar.url}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "3px solid #ffffff",
                  objectFit: "cover",
                }}
              />
              {hover == avatar.id && (
                <div
                  onClick={() => removeAvatar(avatar.id)}
                  style={{
                    backgroundColor: "rgba(246, 25, 25, 83%)",
                    color: "#fff",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "3px solid #ffffff",
                  }}
                >
                  <TrashSimple width={24} height={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div>
        <input
          accept={acceptedFileTypes.join(",")}
          id="avatar-file"
          type="file"
          style={{ display: "none" }}
          multiple={true}
          onChange={onFileUpload}
        />
        <label
          htmlFor="avatar-file"
          style={{
            backgroundColor: "#18A0FB",
            width: 32,
            height: 32,
            borderRadius: "50%",
            color: "#fff",
            fontSize: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Plus width={18} height={18} />
        </label>
      </div>
    </div>
  );
};
