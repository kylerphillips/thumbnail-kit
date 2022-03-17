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
        padding: "6px 12px",
        backgroundColor: backgroundColor,
        width: "fit-content",
        marginBottom: 16,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      <Icon width={12} height={12} />
      <p
        style={{
          fontSize: 12,
          color: textColor,
          fontWeight: 700,
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {value}
      </p>
    </div>
  );
};
