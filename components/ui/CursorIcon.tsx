type CursorIconProps = {
  className?: string;
  size?: number;
};

export function CursorIcon({ className, size = 18 }: CursorIconProps) {
  const height = Math.round((size * 22) / 18);

  return (
    <svg
      className={className}
      width={size}
      height={height}
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        d="M1 1L1 16.5L5.2 12.8L8.1 20.2L10.6 19.2L7.6 11.9H13.8L1 1Z"
        fill="#2a2a2a"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
