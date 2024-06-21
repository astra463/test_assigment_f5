document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial-container');
  const totalTestimonials = testimonials.length;
  let currentIndex = 0;
  let intervalId;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, idx) => {
      if (idx === index) {
        testimonial.style.opacity = '1';
        testimonial.style.pointerEvents = 'auto';
      } else {
        testimonial.style.opacity = '0';
        testimonial.style.pointerEvents = 'none';
      }
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentIndex);
  }

  function startSlider() {
    intervalId = setInterval(nextTestimonial, 1500); 
  }

  function pauseSlider() {
    clearInterval(intervalId);
  }

  const prevButton = document.getElementById('fade_prev');
  const nextButton = document.getElementById('fade_next');

  prevButton.addEventListener('click', function() {
    prevTestimonial();
    pauseSlider(); 
  });

  nextButton.addEventListener('click', function() {
    nextTestimonial();
    pauseSlider(); 
  });

  testimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseover', pauseSlider);
    testimonial.addEventListener('mouseleave', startSlider);
  });

  startSlider();
});
