document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.gallery');

  galleries.forEach(gallery => {
    const leftButton = gallery.closest('.page__section').querySelector('.arrow-button.prev');
    const rightButton = gallery.closest('.page__section').querySelector('.arrow-button.right');
    const cards = gallery.querySelectorAll('.company-card, .blog-card');
    const cardWidth = cards[0].offsetWidth + 24; // Ширина карточки + gap (24px)
    const maxIndex = Math.ceil(cards.length - 1);
    let currentIndex = 0;
    let autoScrollInterval;

    function scrollGallery(direction) {
      currentIndex += direction;
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      const translateValue = -currentIndex * cardWidth;
      gallery.style.transform = `translateX(${translateValue}px)`;
      updateButtons();
    }

    function updateButtons() {
      leftButton.classList.toggle('disabled', currentIndex === 0);
      rightButton.classList.toggle('disabled', currentIndex === maxIndex);
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
          scrollGallery(1);
        } else {
          currentIndex = -1; // начнем сначала
        }
      }, 2500);
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    leftButton.addEventListener('click', () => scrollGallery(-1));
    rightButton.addEventListener('click', () => scrollGallery(1));
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
    updateButtons();
  });
});
