"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        placeholder="Search fragrances..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-sand bg-ivory py-3 pl-11 pr-4 text-sm text-ink placeholder:text-stone transition-colors focus:border-accent focus:outline-none"
      />
    </div>
  );
}
