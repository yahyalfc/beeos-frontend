import { type FC, type SVGProps } from "react";

export const XIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 16 14"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.0384828 0L6.21586 7.72172L0 14H1.39935L6.84186 8.50354L11.2389 14H16L9.47536 5.84394L15.2614 0H13.862L8.8503 5.06211L4.80057 0H0.0394108H0.0384828ZM2.09573 0.96346H4.2825L13.9409 13.0365H11.7541L2.09573 0.96346Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const XLGIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.03848 3L8.21586 10.7217L2 17H3.39935L8.84186 11.5035L13.2389 17H18L11.4754 8.84394L17.2614 3H15.862L10.8503 8.06211L6.80057 3H2.03941H2.03848ZM4.09573 3.96346H6.2825L15.9409 16.0365H13.7541L4.09573 3.96346Z"
        fill="currentColor"
      />
    </svg>
  );
};
