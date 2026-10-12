import React from "react";
import { STATUS } from "../../data/projects";

function StatusChip({ status }) {
  const s = STATUS[status];
  if (!s) return null;
  return <span className={`chip chip--${s.tone}`}>{s.label}</span>;
}

export default StatusChip;
