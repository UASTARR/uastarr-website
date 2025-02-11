import React from 'react';

const VectorBackground = () => {
  return (
    <div className="fixed top-0 justify-center w-screen h-screen">
      <video autoPlay muted loop className="object-cover min-w-full min-h-full">
        <source src="/assets/backgrounds/VectorBkg.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VectorBackground;
