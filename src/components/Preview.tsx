import { h } from "preact";
import { Document } from "../icons";
import { IconWorld16, Text } from "@create-figma-plugin/ui";
import { StatusPreview } from "./StatusPreview";

export const Preview = ({
  avatars,
  project,
  status,
  statusOptions,
  description,
  darkMode,
}) => {
  const overlap = 13;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 315,
            height: 170,
            backgroundColor: "#1c1c1e",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 50,
              paddingRight: 50,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <StatusPreview
              status={status || statusOptions[0].value}
              statusOptions={statusOptions}
              darkMode={darkMode}
            />
            <p
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "900",
                fontFamily: 'Inter',
                margin: 0,
                marginBottom: 10,
                width:230,
                wordBreak: "break-word",
                lineHeight: 1.2
              }}
            >
              {project || "File Name"}
            </p>
            <p
              style={{
                fontSize: 9,
                color: "#d2d2d2",
                margin: 0,
                width:230,
                wordBreak: "break-word",
                lineHeight: 1.3
              }}
            >
              {description ||
                "Figma connects everyone in the design process so teams can deliver better products, faster."}
            </p>
            <div>
              {avatars.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    columnGap: 8,
                    alignItems: "center",
                    paddingLeft: overlap,
                    marginTop: 5,
                  }}
                >
                  {avatars.map((avatar, index) => (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        marginLeft: -overlap,
                        position: "relative",
                      }}
                    >
                      <img
                        src={avatar.url}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "2px solid #1c1c1e",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 315,
            height: 62,
            backgroundColor: "#ffffff",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
            columnGap: 8,
          }}
        >
          <Document width={40} height={40} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 13,
              }}
              bold
            >
              {project || "File Name"}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#909090",
              }}
            >
              Edited 2 minutes ago
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
