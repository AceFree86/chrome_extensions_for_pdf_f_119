import * as React from "react";

export const IconLeft = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="30px"
      height="50px"
      {...props}
    >
      <path d="M14.7 15.3a1 1 0 01-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 1.4L11.42 12l3.3 3.3z" />
    </svg>
  );
};

export const IconRight = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="30px"
      height="50px"
      {...props}
    >
      <path d="M9.3 8.7a1 1 0 011.4-1.4l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4l3.29-3.3-3.3-3.3z" />
    </svg>
  );
};
