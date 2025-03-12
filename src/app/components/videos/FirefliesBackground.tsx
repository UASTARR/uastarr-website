import React from 'react';

const FirefliesBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video playsInline autoPlay muted loop className="w-full h-full object-cover">
        <source
          src="/assets/backgrounds/fireflies_background.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default FirefliesBackground;
