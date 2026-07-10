export function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.5 12.5L10.3 15.3L16.5 8.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SupportClosedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#e6231e" />
      <circle cx="50" cy="34" r="13" stroke="white" strokeWidth="4" />
      <path
        d="M30 34a20 20 0 0 1 40 0"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="26" y="32" width="8" height="12" rx="3" fill="white" />
      <rect x="66" y="32" width="8" height="12" rx="3" fill="white" />
      <path
        d="M66 40q6 4 2 10h-8"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 78C22 58 34 50 50 50C66 50 78 58 78 78"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M14 78H86" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 78V94" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <circle cx="78" cy="80" r="17" fill="white" />
      <path
        d="M71 73L85 87M85 73L71 87"
        stroke="#e6231e"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SupportOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#16a34a" />
      <circle cx="50" cy="34" r="13" stroke="white" strokeWidth="4" />
      <path
        d="M30 34a20 20 0 0 1 40 0"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="26" y="32" width="8" height="12" rx="3" fill="white" />
      <rect x="66" y="32" width="8" height="12" rx="3" fill="white" />
      <path
        d="M66 40q6 4 2 10h-8"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 78C22 58 34 50 50 50C66 50 78 58 78 78"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M14 78H86" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 78V94" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <circle cx="78" cy="80" r="17" fill="white" />
      <path
        d="M70 80l6 6l12-13"
        stroke="#16a34a"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13v-1a8 8 0 0 1 16 0v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="3" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
      <path
        d="M19 19v1a3 3 0 0 1-3 3h-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
