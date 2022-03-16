import { h } from "preact";
import { Document } from "../icons";
import { Text } from "@create-figma-plugin/ui";

export const Preview = ({
  avatars,
  project,
  status,
  statusOptions,
  description,
}) => {
  const overlap = 10;

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
            height: 154,
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
            <p
              style={{
                fontSize: 15,
                color: "#fff",
                margin: 0,
                marginBottom: 10,
              }}
            >
              {status || statusOptions[0].value}
            </p>
            <p
              style={{
                fontSize: 24,
                color: "#fff",
                fontWeight: "bold",
                margin: 0,
                marginBottom: 10,
              }}
            >
              {project || "File Name"}
            </p>
            <p
              style={{
                fontSize: 9,
                color: "#d2d2d2",
                margin: 0,
                lineHeight: 1.5,
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
                    height: 48,
                    alignItems: "center",
                    paddingLeft: overlap,
                  }}
                >
                  {avatars.map((avatar, index) => (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        marginLeft: -overlap,
                        position: "relative",
                      }}
                    >
                      <img
                        src={avatar.url}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "1px solid #1c1c1e",
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
                fontSize: 15,
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
