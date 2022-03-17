import { h } from "preact";

export const InProgress = ({
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
        fill="#A96D25"
      />
    </svg>
  );
};

export const InProgressPath: VectorNode["vectorPaths"] = [
  {
    windingRule: "EVENODD",
    data: "M25.1875 6.81251C23.37 4.99304 21.0536 3.75354 18.5315 3.25081C16.0094 2.74808 13.3948 3.00472 11.0185 3.98825C8.6423 4.97178 6.61116 6.63802 5.18209 8.77616C3.75302 10.9143 2.99023 13.4283 2.99023 16C2.99023 18.5718 3.75302 21.0857 5.18209 23.2239C6.61116 25.362 8.6423 27.0282 11.0185 28.0118C13.3948 28.9953 16.0094 29.2519 18.5315 28.7492C21.0536 28.2465 23.37 27.007 25.1875 25.1875C26.3947 23.9814 27.3523 22.5491 28.0057 20.9727C28.6591 19.3962 28.9954 17.7065 28.9954 16C28.9954 14.2935 28.6591 12.6038 28.0057 11.0273C27.3523 9.45088 26.3947 8.01865 25.1875 6.81251ZM20.5 18.5C20.5 18.7652 20.3947 19.0196 20.2071 19.2071C20.0196 19.3946 19.7652 19.5 19.5 19.5C19.2348 19.5 18.9804 19.3946 18.7929 19.2071C18.6054 19.0196 18.5 18.7652 18.5 18.5V14.9125L13.2125 20.2125C13.0192 20.3939 12.7651 20.4964 12.5 20.5C12.2345 20.4989 11.9795 20.396 11.7875 20.2125C11.5997 20.0229 11.4944 19.7669 11.4944 19.5C11.4944 19.2332 11.5997 18.9771 11.7875 18.7875L17.0875 13.5H13.5C13.2348 13.5 12.9804 13.3946 12.7929 13.2071C12.6054 13.0196 12.5 12.7652 12.5 12.5C12.5 12.2348 12.6054 11.9804 12.7929 11.7929C12.9804 11.6054 13.2348 11.5 13.5 11.5H19.5C19.6288 11.4997 19.7563 11.5252 19.875 11.575C20.1219 11.6749 20.3195 11.868 20.425 12.1125C20.474 12.2359 20.4994 12.3673 20.5 12.5V18.5Z",
  },
];
