import React, { ChangeEvent } from "react";
import Select, { SelectOption } from "./Select";

interface FilterProps {
  selects: FilterSelect[];
}

export interface FilterSelect {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>, field: string) => void;
  filterFieldName: string;
}

function Filter({ selects }: FilterProps) {
  return (
    <div>
      {selects.map((select, index) => (
        <Select
          key={`filter-select-${index}`}
          label={select.label}
          value={select.value}
          options={select.options}
          onChange={(event) => select.onChange(event, select.filterFieldName)}
        />
      ))}
    </div>
  );
}

export default Filter;
