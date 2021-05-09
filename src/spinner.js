import React from 'react';
import spinner from './spinner2.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '340px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
