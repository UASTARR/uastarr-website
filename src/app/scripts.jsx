'use client'
import React, { useEffect, useState } from 'react';

// const countdown = ({ date }) => {
//   const calculateTimeLeft = () => {
//     const countdownDate = new Date(date).getTime();
//     const now = new Date().getTime();
//     const timeRemaining = countdownDate - now;

//     return {
//       days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//       minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
//       seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   });

//   if (timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds <= 0) {
//     return <div>Countdown is over!</div>;
//   }

//   return (
//     <div>
//       <div id="days">{timeLeft.days}</div>
//       <div id="hours">{timeLeft.hours}</div>
//       <div id="minutes">{timeLeft.minutes}</div>
//       <div id="seconds">{timeLeft.seconds}</div>
//     </div>
//   );
// };

// Assuming usePopup is a custom hook that manages the visibility of the popup
function usePopup(initialState) {
  const [isVisible, setIsVisible] = useState(initialState);
  useEffect(() => {
    const popup = document.getElementById('popup');
    return () => {
      if (popup) {
        popup.classList.toggle("hidden", !isVisible);
      }
    };
  }, [isVisible]); // Depend on the `isVisible` state to re-run this effect

  return [isVisible, setIsVisible];
}

let timer; // Declare timer outside so it's accessible by both functions

function delayedHidePopup(setIsVisible) {
  clearTimeout(timer); // Clear existing timer to prevent multiple triggers
  timer = setTimeout(() => setIsVisible(false), 500);
}

function delayHidePopup() {
  clearTimeout(timer);
}

export function ShowPopupA({ className, children }) {
  const [isVisible, setIsVisible] = usePopup(false);

  const handleMouseOver = () => setIsVisible(true);
  const handleMouseOut = () => delayedHidePopup(setIsVisible); 
  return (
    <a
      className={className}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </a>
  );
}

export function ShowPopupDiv({ className, children, id }) {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}



//   function toggleShow(element_id){
//     element = document.getElementById(element_id);
//     if (element.classList.contains("hidden")) {
//       $('#' + element_id).slideDown("slow");
//       console.log("hidden still");
//       element.classList.remove("hidden");
//     } else {
//       $('#' + element_id).slideUp("slow");
//       element.classList.add("hidden");
//     }
//   }


//   const transition_elements = document.querySelectorAll('.fade_in, .flow_in_left, .flow_in_top, .flow_in_bottom');

//   function isInViewport(el) {
//     // checks whether an elements bounding box is completely within the vertical space of the window
//     const rect = el.getBoundingClientRect();  // rect is the bounding box of the element
//     return (
//       // compare rects top and bottom to the top and bottom of the window
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function checkElements() {
//     // checks if each element is within the window and makes it visible if it is
//     transition_elements.forEach((el) => {
//         if (el.classList.contains("no_check") || isInViewport(el)) {
//             el.classList.add('visible');
//             // set delay attribute and duration attribute to a baseline for all buttons
//             if (el.tagName == 'BUTTON'){
//                 style = getComputedStyle(el);
//                 delay = style.getPropertyValue("transition-delay");
//                 delay = parseFloat(delay) * 1000;
//                 // it appear you do not have to wait till the transtion is over, just till when it starts
//                 //duration = style.getPropertyValue("transition-duration");
//                 //duration = parseFloat(duration) * 1000;
//                 setTimeout(removeDelay, delay, el);
//             }
//         }
//     });
// }

// function removeDelay(el) {
//     el.style.transitionDelay = '0s';
//     el.style.transitionDuration = '200ms';
// }

// // run checkElements on page load
// checkElements();
// // run each time the user scrolls
// window.addEventListener('scroll', checkElements);

//   function hideHeader() {
//     const scrollThreshold = 200;
//     if (window.scrollY > scrollThreshold) {
//       header = document.getElementById('header');
//       header.classList.add('header_hidden');
//     }
//   }

//   window.addEventListener('scroll', hideHeader);

//   function showHeader() {
//     if (window.scrollY <= 0) {
//       header = document.getElementById('header');
//       header.classList.remove('header_hidden');
//     }
//   }
//   window.addEventListener('scroll', showHeader);

  
//   function moveBkg() {
//     var value = window.scrollY;
//     bkg = document.getElementById('bg-image');
//     rect = bkg.getBoundingClientRect();
//     rect_width = rect.right - rect.left;
//     extra = (rect_width - window.innerWidth);
//     distance = window.innerHeight - rect.top;
//     percent = (1.0 * distance) / (rect.bottom - rect.top);
//     if (percent >= 1){
//       percent = 1;  
//     }

//     pos_x = - (extra * percent);
//     pos_y = ((rect.bottom - rect.top));
    
//     postion_string = pos_x + 'px 50%'

//     bkg.style.backgroundPosition = postion_string;
//   };
  
//   window.addEventListener('scroll', moveBkg);
//   window.addEventListener('resize', moveBkg);

//   export {countdown, showPopup, hidePopup, delayedHidePopup, delayHidePopup, toggleShow, checkElements, hideHeader, showHeader, moveBkg}