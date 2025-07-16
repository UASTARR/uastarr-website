import React from 'react';

const PrintingBackground = () => {
  return (
    <div className="fixed inset-0 z-0 justify-center w-screen h-screen brightness-50">
      <video playsInline autoPlay muted loop className="min-w-full min-h-full object-cover">
        <source src="/assets/backgrounds/3dPrinting.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default PrintingBackground;
