import React, { ChangeEvent } from "react";

interface SelectProps {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <label>
      {label}:
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
