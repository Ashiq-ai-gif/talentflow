import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icons = {
  home: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </Base>
  ),
  search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </Base>
  ),
  briefcase: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </Base>
  ),
  plus: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  ),
  building: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      <path d="M10 21v-3h4v3" />
    </Base>
  ),
  user: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </Base>
  ),
  users: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 7M22 20a6 6 0 0 0-4-5.7" />
    </Base>
  ),
  folder: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </Base>
  ),
  handshake: (p: IconProps) => (
    <Base {...p}>
      <path d="m11 17 2 2a1 1 0 0 0 3-3" />
      <path d="m14 16 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.4.4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 0-1.4 0L3 14" />
      <path d="m18 12 .5-.5a2 2 0 0 0 0-2.8L14 4.3a2 2 0 0 0-2.8 0L9 6.5" />
    </Base>
  ),
  shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  flag: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-1.5 3L16 10H5" />
    </Base>
  ),
  settings: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.8 7.8 0 0 0 0-2l1.6-1.2-1.5-2.6-1.9.6a7.6 7.6 0 0 0-1.7-1L14.6 4h-3l-.3 1.8a7.6 7.6 0 0 0-1.7 1l-1.9-.6L6.2 8.8 7.8 10a7.8 7.8 0 0 0 0 2l-1.6 1.2 1.5 2.6 1.9-.6c.5.4 1.1.7 1.7 1l.3 1.8h3l.3-1.8c.6-.3 1.2-.6 1.7-1l1.9.6 1.5-2.6Z" />
    </Base>
  ),
  logout: (p: IconProps) => (
    <Base {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </Base>
  ),
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Base>
  ),
  arrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  sparkles: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z" />
      <path d="M19 14l.8 1.9L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-1.1Z" />
    </Base>
  ),
  mapPin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  ),
  bolt: (p: IconProps) => (
    <Base {...p}>
      <path d="M13 3 4 14h7l-1 7 9-11h-7Z" />
    </Base>
  ),
  star: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19l1-5.8-4.3-4.1 5.9-.9Z" />
    </Base>
  ),
  chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </Base>
  ),
  calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </Base>
  ),
  document: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3h8l4 4v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0Z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
    </Base>
  ),
  rocket: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M9 13s1-4 4-7c2.6-2.6 6-2 6-2s.6 3.4-2 6c-3 3-7 4-7 4Z" />
      <path d="M9 13l2 2" />
      <circle cx="14.5" cy="8.5" r="1" />
    </Base>
  ),
  verified: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 2 2.2 1.6 2.7-.3 1.1 2.5 2.5 1.1-.3 2.7L24 12l-1.6 2.2.3 2.7-2.5 1.1-1.1 2.5-2.7-.3L12 22l-2.2-1.6-2.7.3-1.1-2.5L3.5 17l.3-2.7L2 12l1.8-2.2-.3-2.7 2.5-1.1L7.1 3.5l2.7.3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  video: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </Base>
  ),
  menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  ),
  x: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  ),
};

export type IconName = keyof typeof Icons;
