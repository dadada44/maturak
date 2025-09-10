

// Smooth fade-in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));
});

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const items = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");

    let index = 0;

    // Přidáme klony pro nekonečný efekt
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    const allItems = Array.from(track.children);
    const itemWidth = items[0].offsetWidth + 20; // šířka + mezera
    let position = -itemWidth; // začínáme od prvního "skutečného" itemu
    track.style.transform = `translateX(${position}px)`;

    // Funkce pro posun
    function moveCarousel(dir) {
      position -= dir * itemWidth;
      track.style.transition = "transform 0.4s ease-in-out";
      track.style.transform = `translateX(${position}px)`;

      track.addEventListener("transitionend", () => {
        if (allItems[index + 1] === firstClone && dir === 1) {
          // Konec -> vrať se na začátek
          track.style.transition = "none";
          position = -itemWidth;
          track.style.transform = `translateX(${position}px)`;
          index = 0;
        }
        if (allItems[index + 1] === lastClone && dir === -1) {
          // Začátek -> vrať se na konec
          track.style.transition = "none";
          position = -(items.length * itemWidth);
          track.style.transform = `translateX(${position}px)`;
          index = items.length - 1;
        }
      }, { once: true });

      index += dir;
    }

    // Ovládací tlačítka
    nextBtn?.addEventListener("click", () => moveCarousel(1));
    prevBtn?.addEventListener("click", () => moveCarousel(-1));

    // Automatické posouvání
    setInterval(() => moveCarousel(1), 3000);

    // Swipe na mobilu
    let startX = 0;
    track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    track.addEventListener("touchend", e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) moveCarousel(-1);
      if (diff < -50) moveCarousel(1);
    });
  });
});
