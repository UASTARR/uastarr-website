import React from 'react';

const RipplingBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video playsInline autoPlay muted loop className="min-w-full min-h-full object-cover">
        <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default RipplingBackground;
