import { h } from "preact";

export const Plus = ({
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
      width={width || 14}
      height={height || 14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M2.1875 7.00182H11.8125"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.00182 2.1875V11.8125"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
