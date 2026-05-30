import React from 'react';
import './SectionBootLabel.css';

const SectionBootLabel = ({ moduleName }) => {
  return (
    <div className="section-boot-label mono" aria-hidden="true">
      <div className="boot-line">[ MODULE_LOADED ]</div>
      <div className="boot-line boot-module">{moduleName}.exe</div>
      <div className="boot-line">[ STATUS ]</div>
      <div className="boot-line boot-ready">READY</div>
    </div>
  );
};

export default SectionBootLabel;
