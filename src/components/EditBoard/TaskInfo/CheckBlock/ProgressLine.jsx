import React from 'react';

export const ProgressLine = () => {
  return (
    <div className='progress-check'>
      <div className='progress-check__percent'>0%</div>
      <div className='progress-check line'>
        <div className='line__backLayer' />
      </div>
    </div>
  );
};
