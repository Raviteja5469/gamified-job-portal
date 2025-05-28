import React from 'react'

function Badge({ name, className }) {
  return (
    <span className={`badge ${className}`}>
      {name} Badge
    </span>
  );
}

export default Badge;
