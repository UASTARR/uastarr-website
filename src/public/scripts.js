
function startCountdown(date) {
  // Set the countdown end date and time
  const countdownDate = new Date(date).getTime();

  function updateCountdown() {
    // Get the current date and time
    const now = new Date().getTime();

    // Calculate the time remaining
    const timeRemaining = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown HTML elements
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the countdown is finished, clear the interval
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      // Optionally, perform any desired action when the countdown reaches zero
      document.getElementById("countdown").innerHTML = "Countdown is over!";
    }
  }

  // Call the updateCountdown function immediately
  updateCountdown();

  // Update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);
}

function toggleShow(element_id) {
  element = document.getElementById(element_id);
  if (element.classList.contains("hidden")) {
    $('#' + element_id).slideDown("slow");
    console.log("hidden still");
    element.classList.remove("hidden");
  } else {
    $('#' + element_id).slideUp("slow");
    element.classList.add("hidden");
  }
}

var transition_elements = document.querySelectorAll('.fade_in, .flow_in_left, .flow_in_top, .flow_in_bottom');

window.addEventListener('locationchange', function () {
  console.log('location changed!');
});

function isInViewport(el) {
  // checks whether an elements bounding box is completely within the vertical space of the window
  const rect = el.getBoundingClientRect();  // rect is the bounding box of the element
  return (
    // compare rects top and bottom to the top and bottom of the window
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function checkElements() {
  // checks if each element is within the window and makes it visible if it is
  transition_elements.forEach((el) => {
    if (el.classList.contains("no_check") || isInViewport(el)) {
      el.classList.add('visible');
      // set delay attribute and duration attribute to a baseline for all buttons
      if (el.tagName == 'BUTTON') {
        style = getComputedStyle(el);
        delay = style.getPropertyValue("transition-delay");
        delay = parseFloat(delay) * 1000;
        // it appear you do not have to wait till the transtion is over, just till when it starts
        //duration = style.getPropertyValue("transition-duration");
        //duration = parseFloat(duration) * 1000;
        setTimeout(removeDelay, delay, el);
      }
    }
  });
}

function removeDelay(el) {
  el.style.transitionDelay = '0s';
  el.style.transitionDuration = '200ms';
}

// run checkElements on page load
checkElements();
// run each time the user scrolls
window.addEventListener('scroll', checkElements);

var currentScrollY = window.scrollY;

function headerDisplay() {
  const header = document.getElementById('header');
  const headerHeight = header.offsetHeight;
  const scrollY = window.scrollY;

  // If window size is less than 1024px, do not hide the header
  // For mobile view 1024px is the breakpoint for tailwind lg
  if (window.innerWidth < 1024) {
    header.classList.remove('header_hidden');
    return;
  }

  if (scrollY < headerHeight) {
    header.classList.remove('header_hidden');
    return;
  }
  
  if (Math.abs(scrollY - currentScrollY) > headerHeight) {
    if (scrollY > currentScrollY) {
      header.classList.add('header_hidden');
    } else {
      header.classList.remove('header_hidden');
    }
    currentScrollY = scrollY;
  }
}
window.addEventListener('scroll', headerDisplay);


function moveBkg() {
  var value = window.scrollY;
  bkg = document.getElementById('bg-image');
  if (bkg == null) {
    return;
  }
  rect = bkg.getBoundingClientRect();
  rect_width = rect.right - rect.left;
  extra = (rect_width - window.innerWidth);
  distance = window.innerHeight - rect.top;
  percent = (1.0 * distance) / (rect.bottom - rect.top);
  if (percent >= 1) {
    percent = 1;
  }

  pos_x = - (extra * percent);
  pos_y = ((rect.bottom - rect.top));

  postion_string = pos_x + 'px 50%'

  bkg.style.backgroundPosition = postion_string;
};

window.addEventListener('scroll', moveBkg);
window.addEventListener('resize', moveBkg);
