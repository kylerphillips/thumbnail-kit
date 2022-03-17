import { h } from "preact";

export const Completed = ({
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
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.7071 5.70711L11.2929 4.29289L6.5 9.08579L4.70711 7.29289L3.29289 8.70711L6.5 11.9142L12.7071 5.70711Z"
        fill="#3F7000"
      />
    </svg>
  );
};
