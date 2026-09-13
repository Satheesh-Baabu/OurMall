"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className={`flex flex-col gap-1 ${className}`} ref={ref}>
      {label && (
        <label className="text-xs font-medium text-body">{label}</label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((open) => !open)}
          className={`
            flex w-full items-center justify-between
            rounded-full border px-4 py-3
            text-left text-sm
            outline-none
            transition-colors duration-200
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${
              error
                ? "border-red-500/60 bg-red-50"
                : open
                  ? "border-primary bg-white ring-2 ring-primary/20"
                  : "border-slate-200 bg-white hover:border-primary/50"
            }
          `}
        >
          <span className={selected ? "text-heading capitalize" : "text-body"}>
            {selected ? selected.label : placeholder}
          </span>

          <ChevronDown
            size={16}
            className={`text-body transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul
            className="
              absolute z-50 mt-2 w-full
              overflow-hidden rounded-2xl
              border border-slate-200
              bg-white
              py-1
              shadow-lg
            "
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`
                  flex cursor-pointer items-center justify-between
                  px-4 py-2.5
                  text-sm capitalize
                  transition-colors duration-150
                  ${
                    option.value === value
                      ? "bg-primary/10 text-primary"
                      : "text-heading hover:bg-primary/5"
                  }
                `}
              >
                {option.label}

                {option.value === value && (
                  <Check size={15} className="text-primary" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
