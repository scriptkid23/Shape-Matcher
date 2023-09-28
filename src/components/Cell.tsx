import React from "react";
import "./Cell.css";

interface CellProps {
  // Your code here
  shape: string;
  color: string;
  isOpen: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const cellStype = `cell ${props.isOpen ? "open" : ""}`;
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div className={cellStype} onClick={props.onClick}>
      <div
        className={`shape ${props.shape}`}
        style={{ backgroundColor: props.isOpen ? props.color : "lightgray" }}
      ></div>
    </div>
  );
};

export default Cell;
