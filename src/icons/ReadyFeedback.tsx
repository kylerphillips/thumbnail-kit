import { h } from "preact";

export const ReadyFeedback = ({
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8C16 3.58172 12.4183 -1.93129e-07 8 0C3.58172 1.93129e-07 -1.93129e-07 3.58172 0 8C1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8 4V7H3V9H8V12H9L13 8L9 4H8Z"
        fill="#314B73"
      />
    </svg>
  );
};
