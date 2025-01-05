import React from 'react';

const PrintingBackground = () => {
  return (
    <div className="fixed top-0 justify-center w-screen h-screen brightness-50">
      {/* <video autoPlay muted loop className="object-cover min-w-full min-h-full playsInline"> */}
      <video
        muted
        loop
        className="object-cover min-w-full min-h-full playsInline"
      >
        <source src="/assets/backgrounds/3dPrinting.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default PrintingBackground;
