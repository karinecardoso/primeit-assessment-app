import React, { useState } from "react";
import "./Table.css";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import CustomSelect from "../CustomSelect/CustomSelect";
import NoData from "./NoData";
import Loader from "./Loader";

interface TableProps<DataType> {
  columns: ColumnDef<DataType>[];
  data: Array<DataType>;
  subRowsField: string;
  isLoading: boolean;
  noDataText?: string | undefined;
}

function Table<T>({
  columns,
  data,
  subRowsField,
  isLoading,
  noDataText,
}: TableProps<T>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [style, setStyle] = useState("");

  const styleOptions = [
    { label: "Default", value: "" },
    { label: "Zebra", value: "zebra" },
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row as any)[subRowsField as keyof T],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualFiltering: true,
  });

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : data && data.length > 0 ? (
        <table className={`table ${style}`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="table__row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th className="table__header" key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr className="table__row" key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className="table__cell" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <NoData noDataText={noDataText} />
      )}

      <div className="table__style">
        <CustomSelect
          value={styleOptions.find((styleOption) => styleOption.value == style)}
          options={styleOptions}
          label="Style"
          onChange={(newOption) => {
            setStyle(newOption?.value ?? "");
          }}
        />
      </div>
    </>
  );
}

export default Table;
