import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress
        size={64}
        thicknexx={6}
        sx={{
          color: 'gray',
          animationDuration: '0.5s', // Adjusts the speed of the spinner
        }}
      />
    </div>
  );
};

export default Spinner;
