  function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
  }
  function hidePopup() {
    document.getElementById("popup").classList.add("hidden");
  }
  function delayedHidePopup() {
    timer = setTimeout(hidePopup, 500);              
  }
  function delayHidePopup() {
    clearTimeout(timer);
  }


  function toggleShow(element_id){
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


  const transition_elements = document.querySelectorAll('.fade_in, .flow_in_left, .flow_in_top, .flow_in_bottom');

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
        if (isInViewport(el)) {
            el.classList.add('visible');
            // set delay attribute and duration attribute to a baseline for all buttons
            if (el.tagName == 'BUTTON'){
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

  function hideHeader() {
    const scrollThreshold = 200;
    if (window.scrollY > scrollThreshold) {
      header = document.getElementById('header');
      header.classList.add('header_hidden');
    }
  }

  window.addEventListener('scroll', hideHeader);

  function showHeader() {
    if (window.scrollY <= 0) {
      header = document.getElementById('header');
      header.classList.remove('header_hidden');
    }
  }
  window.addEventListener('scroll', showHeader);

  
  function moveBkg() {
    var value = window.scrollY;
    bkg = document.getElementById('bg-image');
    rect = bkg.getBoundingClientRect();
    rect_width = rect.right - rect.left;
    extra = (rect_width - window.innerWidth);
    distance = window.innerHeight - rect.top;
    percent = (1.0 * distance) / (rect.bottom - rect.top);
    if (percent >= 1){
      percent = 1;  
    }

    pos_x = - (extra * percent);
    pos_y = ((rect.bottom - rect.top));
    
    postion_string = pos_x + 'px 50%'

    bkg.style.backgroundPosition = postion_string;
  };
  
  window.addEventListener('scroll', moveBkg);
  window.addEventListener('resize', moveBkg);
