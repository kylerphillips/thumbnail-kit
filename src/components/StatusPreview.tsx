import { h } from "preact";

export const StatusPreview = ({ status, statusOptions, darkMode }) => {
  const {
    textColor,
    backgroundColor,
    value,
    svg: Icon,
  } = statusOptions.find((statusOption) => statusOption.value === status) ||
  statusOptions[0];

  return (
    <div
      style={{
        padding: "2px 8px",
        backgroundColor: backgroundColor,
        width: "fit-content",
        marginBottom: 8,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      <Icon width={12} height={12} />
      <p
        style={{
          fontSize: 8,
          color: textColor,
          fontWeight: 900,
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {value}
      </p>
    </div>
  );
};
