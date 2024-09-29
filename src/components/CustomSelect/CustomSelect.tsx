import React from "react";
import Select, { ActionMeta } from "react-select";

interface CustomSelectProps {
  label: string;
  value?: SelectOption;
  options: SelectOption[];
  onChange: (
    option: SelectOption | null,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  return (
    <label>
      {`${label}:`}
      <Select options={options} value={value} onChange={onChange} />
    </label>
  );
}

export default CustomSelect;
