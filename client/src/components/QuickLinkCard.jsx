import React from 'react'
import { Link } from 'react-router-dom';

function QuickLinkCard({ title, description, link }) {
  return (
    <Link to={link} className="quick-link-card">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </Link>
  );
}

export default QuickLinkCard;
