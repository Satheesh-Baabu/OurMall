"use client";

import Dropdown, { type DropdownOption } from "@/components/Dropdown";

export default function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const options: DropdownOption[] = [
    {
      label: "All Categories",
      value: "all",
    },
    ...categories.map((category) => ({
      label: category,
      value: category,
    })),
  ];

  return (
    <div className="w-full sm:max-w-xs">
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Select category"
      />
    </div>
  );
}
