import { h } from "preact";

export const Document = ({
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
      width={width || 32}
      height={height || 32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
    >
      <path
        d="M7 28h18c.552 0 1-.448 1-1V9.914c0-.265-.105-.52-.293-.707l-4.914-4.914C20.605 4.105 20.35 4 20.086 4H7c-.552 0-1 .448-1 1v22c0 .552.448 1 1 1z"
        fill-rule="nonzero"
        fill-opacity="1"
        fill="#18a0fb"
        stroke="none"
      ></path>
      <path
        d="M16.858 12.995l-.011-.003-4.403-1.255 3.257 3.257c.116-.04.24-.062.37-.062.628 0 1.138.51 1.138 1.139 0 .628-.51 1.138-1.138 1.138-.629 0-1.139-.51-1.139-1.138 0-.13.022-.254.062-.37l-3.252-3.251 1.202 4.192.01.036.008.038c.298 1.443 1.578 2.528 3.109 2.528.349 0 .683-.056.995-.159l.585-.193.435.436 1.231 1.23 1.269-1.268-1.245-1.244-.43-.431.184-.58c.097-.303.15-.627.15-.964 0-1.476-1.009-2.719-2.375-3.073l-.012-.003zm4.435 5.588l.707.707-.707.707-1.269 1.269-.707.707-.707-.707-1.23-1.231c-.412.136-.852.21-1.31.21-2.014 0-3.696-1.428-4.087-3.328l-1.658-5.785L10 10l1.133.323 5.988 1.707c1.797.466 3.123 2.098 3.123 4.04 0 .443-.068.869-.196 1.268l1.245 1.245z"
        fill-rule="evenodd"
        fill-opacity="1"
        fill="#fff"
        stroke="none"
      ></path>
      <path
        d="M20.5 8.5V4l1.707 1.707 2.086 2.086L26 9.5h-4.5c-.552 0-1-.448-1-1z"
        fill-rule="nonzero"
        fill-opacity="1"
        fill="#9bd5fd"
        stroke="none"
      ></path>
    </svg>
  );
};
