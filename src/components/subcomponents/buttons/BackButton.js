import React from "react";
import {Link} from 'react-router-dom'

export default function BackButton() {
  return (
    <div className="back-btn-container">
      <Link className="btn back-btn" to="/">
        <i className="fas fa-angle-left"></i>
        Back
      </Link>
    </div>
  );
}
