import React from "react";
import "./Filter.css";
import CustomSelect, { SelectOption } from "../CustomSelect/CustomSelect";

interface FilterProps {
  selects: FilterSelect[];
}

export interface FilterSelect {
  label: string;
  value?: SelectOption;
  options: SelectOption[];
  onChange: (newValue: string | undefined, field: string) => void;
  filterFieldName: string;
}

function Filter({ selects }: FilterProps) {
  return (
    <div className="filter">
      {selects.map((select, index) => (
        <div key={`filter-select-${index}`} className="filter__item">
          <CustomSelect
            label={select.label}
            value={select.value}
            options={select.options}
            onChange={(newOption) =>
              select.onChange(newOption?.value, select.filterFieldName)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default Filter;
