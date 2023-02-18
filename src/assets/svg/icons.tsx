import { FC } from 'react';

type Props = {
  fill: string;
};

export const DeleteSvgIcon: FC<Props> = ({ fill = 'gray.800' }) => (
  <svg fill="none" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10ZM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1Z"
      fill={fill}
    />
  </svg>
);

export const AddCircleSvgIcon: FC<Props> = ({ fill = 'gray.800' }) => (
  <svg
    fill="none"
    viewBox="0 0 33 32"
    height={24}
    width={24}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.8333 2.66669C9.47333 2.66669 3.5 8.64002 3.5 16C3.5 23.36 9.47333 29.3334 16.8333 29.3334C24.1933 29.3334 30.1667 23.36 30.1667 16C30.1667 8.64002 24.1933 2.66669 16.8333 2.66669ZM22.1667 17.3334H18.1667V21.3334C18.1667 22.0667 17.5667 22.6667 16.8333 22.6667C16.1 22.6667 15.5 22.0667 15.5 21.3334V17.3334H11.5C10.7667 17.3334 10.1667 16.7334 10.1667 16C10.1667 15.2667 10.7667 14.6667 11.5 14.6667H15.5V10.6667C15.5 9.93335 16.1 9.33335 16.8333 9.33335C17.5667 9.33335 18.1667 9.93335 18.1667 10.6667V14.6667H22.1667C22.9 14.6667 23.5 15.2667 23.5 16C23.5 16.7334 22.9 17.3334 22.1667 17.3334Z"
      fill={fill}
    />
  </svg>
);

export const ArrowLeftSvgIcon: FC<Props> = ({ fill = 'gray.800' }) => (
  <svg fill="none" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="M8.635 5.636A1 1 0 0 1 10.05 7.05L6.1 11H20a1 1 0 1 1 0 2H6.1l3.95 3.95a1 1 0 0 1-1.414 1.414l-4.95-4.95a2 2 0 0 1 0-2.828l4.95-4.95Z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);
