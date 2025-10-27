// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Hlavní kód – spustí se po načtení DOMu
document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Swipe support
  const containers = [
    { id: "cards-container-it4b", name: "radio-card-it4b" },
    { id: "cards-container-scb", name: "radio-card-scb" }
  ];
  containers.forEach(({ id, name }) => {
    const container = document.getElementById(id);
    if (!container) return;
    let startX = 0;
    container.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    container.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) < 50) return;
      const inputs = [...document.querySelectorAll(`input[name="${name}"]`)];
      const current = document.querySelector(`input[name="${name}"]:checked`);
      const currentIndex = inputs.indexOf(current);
      const nextIndex = (currentIndex + (diff < 0 ? 1 : -1) + inputs.length) % inputs.length;
      inputs[nextIndex].checked = true;
    });
  });

  // Class toggle
  const classToggle = document.querySelector('#class-toggle');
  const it4bContent = document.querySelector('.it4b-content');
  const scbContent = document.querySelector('.scb-content');
  const switchSpan = document.querySelector('.switch');

  if (classToggle && it4bContent && scbContent) {
    classToggle.addEventListener('change', () => {
      document.body.classList.toggle('scb-mode', classToggle.checked);
      it4bContent.style.display = classToggle.checked ? 'none' : 'block';
      scbContent.style.display = classToggle.checked ? 'block' : 'none';
    });
    switchSpan.addEventListener('click', () => {
      classToggle.checked = !classToggle.checked;
      classToggle.dispatchEvent(new Event('change'));
    });
  }

  // Fullscreen modal
  const modal = document.getElementById("fullscreen-modal");
  const fullscreenImg = document.getElementById("fullscreen-img");
  const closeModal = document.querySelector(".close-modal");
  const images = document.querySelectorAll(".card-img, .intro-item img");

  if (modal && fullscreenImg && closeModal) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        const fullSrc = img.dataset.full || img.src;
        fullscreenImg.src = img.src;
        fullscreenImg.classList.remove('loaded');
        modal.style.display = "flex";
        const fullImg = new Image();
        fullImg.onload = () => {
          fullscreenImg.src = fullSrc;
          fullscreenImg.classList.add('loaded');
        };
        fullImg.src = fullSrc;
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      fullscreenImg.src = "";
      fullscreenImg.classList.remove('loaded');
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        fullscreenImg.src = "";
        fullscreenImg.classList.remove('loaded');
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        fullscreenImg.src = "";
        fullscreenImg.classList.remove('loaded');
      }
    });

    let touchStartY = 0;
    modal.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
    modal.addEventListener('touchmove', e => {
      const diff = e.touches[0].clientY - touchStartY;
      if (diff > 100) {
        modal.style.display = "none";
        fullscreenImg.src = "";
      }
    });
  }

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("is-active");

      const icon = hamburger.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Zavření po kliku na odkaz
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("is-active");
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
});