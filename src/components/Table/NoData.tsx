import React from "react";

interface NoDataProps {
  noDataText?: string | undefined;
}

function NoData({ noDataText }: NoDataProps) {
  return noDataText ? (
    <div className="table--no-data">
      <span>{noDataText}</span>
    </div>
  ) : null;
}

export default NoData;
