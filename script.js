// Smooth scroll na kliknutí navbaru
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

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

const students = [
  { name: "Annie Bílá", img: "images/DSC_0415.jpg", text: "Lorem ipsum..." },
  { name: "Daniel Bock", img: "images/DSC_0378.jpg", text: "Lorem ipsum..." },
  { name: "Borislav Boyanov", img: "images/DSC_0155.jpg", text: "Lorem ipsum..." },
  { name: "Martin Brunclík", img: "images/DSC_0197.jpg", text: "Lorem ipsum..." },
  { name: "Natálie Burdová", img: "images/DSC_0218.jpg", text: "Lorem ipsum..." },
  { name: "Gabriel Čonka", img: "images/DSC_0115.jpg", text: "Lorem ipsum..." },
  { name: "Marat Fedorov", img: "images/DSC_0108.jpg", text: "Lorem ipsum..." },
  { name: "Vítek Fikrle", img: "images/DSC_0447.jpg", text: "Lorem ipsum..." },
  { name: "Ivan Gemela", img: "images/DSC_0230.jpg", text: "Lorem ipsum..." },
  { name: "Julie Heclová", img: "images/DSC_0263.jpg", text: "Lorem ipsum..." },
  { name: "Kristýna Herejková", img: "images/DSC_0218.jpg", text: "Lorem ipsum..." },
  { name: "Daniel Holý", img: "images/DSC_0180.jpg", text: "Lorem ipsum..." },
  { name: "Aneta Hřebíková", img: "images/DSC_0245.jpg", text: "Lorem ipsum..." },
  { name: "Anna Janková", img: "images/DSC_0153.jpg", text: "Lorem ipsum..." },
  { name: "Hana Kanalošová", img: "XXXX", text: "Lorem ipsum..." },
  { name: "Alexander Kavnjanyk", img: "images/DSC_0272.jpg", text: "Lorem ipsum..." },
  { name: "Jan Kirpal", img: "images/DSC_0246.jpg", text: "Lorem ipsum..." },
  { name: "Jakub Kořínský", img: "images/DSC_0345.jpg", text: "Lorem ipsum..." },
  { name: "Daniel Koukolík", img: "images/DSC_0236.jpg", text: "Lorem ipsum..." },
  { name: "Adam Lavrikov", img: "XXXX", text: "Lorem ipsum..." },
  { name: "David Lavička", img: "images/DSC_0140.jpg", text: "Lorem ipsum..." },
  { name: "Aneta Mrázová", img: "XXXX", text: "Lorem ipsum..." },
  { name: "Eliška Novotná", img: "images/DSC_0268.jpg", text: "Lorem ipsum..." },
  { name: "Nguyen Cong Tien Dung", img: "images/DSC_0323.jpg", text: "Lorem ipsum..." },
  { name: "Nguyen Quang Truong", img: "images/DSC_0397.jpg", text: "Lorem ipsum..." },
  { name: "Šimon Opatrný", img: "images/DSC_0303.jpg", text: "Lorem ipsum..." },
  { name: "Linda Pfeiferová", img: "images/DSC_0171.jpg", text: "Lorem ipsum..." },
  { name: "Veronika Pivoňková", img: "images/DSC_0143.jpg", text: "Lorem ipsum..." },
  { name: "Adéla Prskavcová", img: "images/DSC_0210.jpg", text: "Lorem ipsum..." },
  { name: "Barbora Sedláková", img: "images/DSC_0163.jpg", text: "Lorem ipsum..." },
  { name: "Natálie Šedivcová", img: "images/DSC_0296.jpg", text: "Lorem ipsum..." },
  { name: "Julie Šambergrová", img: "images/DSC_0178.jpg", text: "Lorem ipsum..." },
  { name: "Eva Štědrá", img: "images/DSC_0260.jpg", text: "Lorem ipsum..." },
  { name: "David Šticha", img: "images/DSC_0361.jpg", text: "Lorem ipsum..." },
  { name: "Eva Šváchová", img: "images/DSC_0213.jpg", text: "Lorem ipsum..." },
  { name: "Daryna Toporovska", img: "images/DSC_0128.jpg", text: "Lorem ipsum..." },
  { name: "Vojtěch Vašmucius", img: "images/DSC_0427.jpg", text: "Lorem ipsum..." },
  { name: "Tobiáš Veverka", img: "images/DSC_0287.jpg", text: "Lorem ipsum..." },
  { name: "Jakub Vlček", img: "images/DSC_0376.jpg", text: "Lorem ipsum..." },
  { name: "Vaclav Vostatek", img: "images/DSC_0241.jpg", text: "Lorem ipsum..." },
  { name: "Daniel Zeman", img: "images/DSC_0199.jpg", text: "Lorem ipsum..." }
];

// Split students into IT4B (boys) and 4SCB (girls) based on name inference with exceptions
const it4bStudents = students.filter(student => {
  const fullName = student.name;
  const firstName = fullName.split(' ')[0];
  return fullName === "Daryna Toporovska" || [
    'Daniel', 'Borislav', 'Martin', 'Gabriel', 'Marat', 'Vítek', 'Ivan',
    'Alexander', 'Jan', 'Jakub', 'Adam', 'David', 'Šimon', 'Tobiáš',
    'Vojtěch', 'Vaclav'
  ].includes(firstName);
});

const scbStudents = students.filter(student => {
  const fullName = student.name;
  const firstName = fullName.split(' ')[0];
  return fullName === "Nguyen Quang Truong" || [
    'Annie', 'Natálie', 'Julie', 'Kristýna', 'Aneta', 'Anna', 'Hana',
    'Linda', 'Veronika', 'Adéla', 'Barbora', 'Eva'
  ].includes(firstName);
});

// Function to render cards
function renderCards(containerId, studentList) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  studentList.forEach((student, i) => {
    const next = (i + 1) % studentList.length;
    const prev = (i - 1 + studentList.length) % studentList.length;
    container.innerHTML += `
      <input type="radio" id="radio-${containerId}-${i + 1}" name="radio-card-${containerId}" ${i === 0 ? "checked" : ""}>
      <article class="card" style="--angle:${(Math.random() * 40 - 20).toFixed(1)}deg">
        <img class="card-img" src="${student.img}" alt="${student.name}">
        <div class="card-data">
          <span class="card-num">${i + 1}/${studentList.length}</span>
          <h2>${student.name}</h2>
          <p>${student.text}</p>
          <footer>
            <label for="radio-${containerId}-${prev + 1}" aria-label="Previous">&#10094;</label>
            <label for="radio-${containerId}-${next + 1}" aria-label="Next">&#10095;</label>
          </footer>
        </div>
      </article>
    `;
  });
}

// Render cards for both classes
document.addEventListener("DOMContentLoaded", () => {
  renderCards("cards-container-it4b", it4bStudents);
  renderCards("cards-container-scb", scbStudents);

  // Swipe functionality for IT4B
  const cardsContainerIt4b = document.querySelector('#cards-container-it4b');
  let startXIt4b = 0;
  cardsContainerIt4b.addEventListener('touchstart', e => startXIt4b = e.touches[0].clientX);
  cardsContainerIt4b.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startXIt4b;
    if (Math.abs(diff) > 50) {
      const current = document.querySelector('input[name="radio-card-cards-container-it4b"]:checked');
      const currentIndex = [...document.querySelectorAll('input[name="radio-card-cards-container-it4b"]')].indexOf(current);
      const nextIndex = (currentIndex + (diff < 0 ? 1 : -1) + it4bStudents.length) % it4bStudents.length;
      document.getElementById(`radio-cards-container-it4b-${nextIndex + 1}`).checked = true;
    }
  });

  // Swipe functionality for 4SCB
  const cardsContainerScb = document.querySelector('#cards-container-scb');
  let startXScb = 0;
  cardsContainerScb.addEventListener('touchstart', e => startXScb = e.touches[0].clientX);
  cardsContainerScb.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startXScb;
    if (Math.abs(diff) > 50) {
      const current = document.querySelector('input[name="radio-card-cards-container-scb"]:checked');
      const currentIndex = [...document.querySelectorAll('input[name="radio-card-cards-container-scb"]')].indexOf(current);
      const nextIndex = (currentIndex + (diff < 0 ? 1 : -1) + scbStudents.length) % scbStudents.length;
      document.getElementById(`radio-cards-container-scb-${nextIndex + 1}`).checked = true;
    }
  });

  // Class toggle
  const classToggle = document.querySelector('#class-toggle');
  const switchSpan = document.querySelector('.switch');
  const it4bContent = document.querySelector('.it4b-content');
  const scbContent = document.querySelector('.scb-content');
  if (classToggle && switchSpan && it4bContent && scbContent) {
    classToggle.addEventListener('change', () => {
      document.body.classList.toggle('scb-mode', classToggle.checked);
      if (classToggle.checked) {
        it4bContent.style.display = 'none';
        scbContent.style.display = 'block';
      } else {
        it4bContent.style.display = 'block';
        scbContent.style.display = 'none';
      }
    });
    switchSpan.addEventListener('click', () => {
      classToggle.checked = !classToggle.checked;
      classToggle.dispatchEvent(new Event('change'));
    });
  }
});

// Fullscreen image modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("fullscreen-modal");
  const fullscreenImg = document.getElementById("fullscreen-img");
  const closeModal = document.querySelector(".close-modal");
  const images = document.querySelectorAll(".card-img, .intro-item img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      let src = img.src;
      fullscreenImg.src = src;
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    fullscreenImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      fullscreenImg.src = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      fullscreenImg.src = "";
    }
  });
});

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});