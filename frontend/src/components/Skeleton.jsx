import React from 'react';
import '../styles/skeleton.css';

const Skeleton = ({ type, className = '' }) => {
  const classes = `skeleton skeleton-${type} ${className}`;
  return <div className={classes} />;
};

export default Skeleton;
