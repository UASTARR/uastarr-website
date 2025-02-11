import React from 'react';

const RipplingBackground = () => {
  return (
    <div className="fixed top-0 justify-center w-screen h-screen z-0">
      {/* <video autoPlay muted loop className="object-cover min-w-full min-h-full playsInline"> */}
      <video
        muted
        loop
        className="object-cover min-w-full min-h-full playsInline"
      >
        <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default RipplingBackground;
