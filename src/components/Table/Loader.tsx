import React from "react";

interface LoaderProps {
  isLoading: boolean;
}

function Loader({ isLoading }: LoaderProps) {
  return isLoading ? (
    <div className="table__loader">
      <span className="table__loader__spinner"></span>
    </div>
  ) : null;
}

export default Loader;
