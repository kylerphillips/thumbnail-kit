import { h } from "preact";

export const ReadyDev = ({
  width,
  height,
  style,
}: {
  width?: number;
  height?: number;
  style?: any;
}) => {
  return (
    <svg
      width={width || 16}
      height={height || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z"
        fill="#4C4096"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11 4L6 6L4 11L5 12L10 10L12 5L11 4Z"
        fill="#4C4096"
      />
    </svg>
  );
};
