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

// Students data for IT4B
const IT4Bstudents = [
  { name: "Daniel Bock", img: "images/DSC_0378.jpg", text: "Danovo nejoblíbenější aktivita je spánek. Rád si zahraje s kámošema videohry. Radši tráví čas doma než venku. Poslouchá muziku 24/7." },
  { name: "Borislav Boyanov", img: "images/DSC_0155.jpg", text: "Borislav rád sází, zbožňuje hrát a koukat na sporty. Miluje řídit auta. Nonstop pracuje a baví ho vydělávat peníze." },
  { name: "Martin Brunclík", img: "images/DSC_0197.jpg", text: "Jeho vevodská výsost Martin Brunclík brunšvický, veleprogramátor plzeňský a arcisysadmin třemošenský jest člověk srdečně zapálený technokrat se sklony k (často) nežádoucímu šíření zbytečných informací a faktoidů. Možno též říci: celkem fajn člověk." },
  { name: "Gabriel Čonka", img: "images/DSC_0115.jpg", text: "Gabriel je kamarádský, sympatický a hodně milý hoch. Gabriel se rád prochází a potkáva nové lidi. Má hrozně specifický smysl pro humor." },
  { name: "Roman Damianenko", img: "images/DSC_0106.jpg", text: "Roman je docela slušný a klidný kluk. Ve volném čase rád poslouchá různou hudbu. Taky si občas rád trošku zacvičí." },
  { name: "Marat Fedorov", img: "images/DSC_0108.jpg", text: "Marat Fedorov má rád vytváření webových stránek. Většinu času dělá na své maturitní stránce nebo je se svojí polovičkou. A jako každý nesnáší pondělní rána." },
  { name: "Vítek Fikrle", img: "images/DSC_0447.jpg", text: "Vítek je kluk, který tráví nezdravé množství času (a peněz) hraním videoher. Je blázen do technologie, volný čas tráví sledováním novinek a sestavou nebo konfigurací počítačů." },
  { name: "Ivan Gemela", img: "images/DSC_0230.jpg", text: "Sundal by z ulice každou kameru. Přál by si aby lidi víc mysleli a míň mluvili. Co je nahoře domovní bratře? No tak baby nestyď se ukaž mu tu žábu." },
  { name: "Daniel Holý", img: "images/DSC_0180.jpg", text: "Dan je profesionální prokrastinátor, bez jediný motivace k dokončení studia." },
  { name: "Alexander Kavnjanyk", img: "images/DSC_0272.jpg", text: "Saša je fajnšmekr piva. Jeho nejoblíbenější aktivita je grilování. Má rád sekanou. Nejradši tráví čas s kamarády a spolužáky." },
  { name: "Jan Kirpal", img: "images/DSC_0246.jpg", text: "Honza je sleeperbuild master. Vůbec se nezdá ale svali má. Dokáže zaspat i na akci v 17:00. Má neprůstřelné argumenty a vždy má pravdu." },
  { name: "Jakub Kořínský", img: "images/DSC_0345.jpg", text: "Jeho hraběcí excelence Jakub Kořínský z Kohořína jest poněkud zamlklý intelektuál se zálibami v mnoha oblastech. Rád poslouchá vážnou hudbu a nepohrdne ani historickými, politickými či matematickými fakty. Pohrda menšinami a lidskou spodinou." },
  { name: "Daniel Koukolík", img: "images/DSC_0236.jpg", text: "Daniel je profesionální uživatel tabáku. Jeho hlavní zálibou posilování. Má větší bicák než ty hlavu. Je také hodný a zdvořilý. Rád papá hodně jídla." },
  { name: "David Lavička", img: "images/DSC_0140.jpg", text: "David má v oblibě auta, líbi se mu zejména jejich design. Kromě toho rád sportuje, přičemž jeho nejoblíbenějším sportem je fotbal. Ve svém volném čase ho baví sledovat různe filmy nebo seriály." },
  { name: "Adam Lavrikov", img: "images/DSC_0453.jpg", text: "Adam vás překvapí svou energii a pracovitostí. Nejvíce ho baví tvorba nových projektu, plánovat a organizovat akce, při kterých dokáže skloubit hudbu, zábavu a zároveň práci. Je workoholick a všechno se snaží mít takzvaně 'ŤIP-ŤOP'." },
  { name: "Nguyen Cong Tien Dung", img: "images/DSC_0323.jpg", text: "On je profesionální hráč ve valorantu/lolku. A každý den pracuje ve večerce neboli 24/7. A je to tallass asian" },
  { name: "Šimon Opatrný", img: "images/DSC_0303.jpg", text: "Šimon se rád zabývá písničkami. Je to člověk, který v sobě spojuje introvertní i extrovertní rysy. Rád traví čas o samotě, ale i s přáteli. Snaží se být co nejvíce pozitivní a šířit dobrou náladu." },
  { name: "David Šticha", img: "images/DSC_0361.jpg", text: "David se zajímá o historii, především druhé světové války. Hraje airsoft a rád s přáteli podnikne spontánní aktivity. Dokáže pobavit svými pohotovými poznámkami a humorem." },
  { name: "Daryna Toporovska", img: "images/DSC_0128.jpg", text: "Dáša je holka, co miluje spánek víc než ranní rozvrhy. Přestávky tráví s kamarádkama a neomluvený hodiny ji dokážou vytočit víc než pondělní budík" },
  { name: "Vojtěch Vašmucius", img: "images/DSC_0427.jpg", text: "Rád si dá šlofíka kdykoliv kdy může. Velmi rád si zapálí a popije. Rád si zahraje s kamarády videohry." },
  { name: "Tobiáš Veverka", img: "images/DSC_0287.jpg", text: "Tobiáš rád poslouchá tvrdou muziku jako Korn, Ill Niño nebo Slipknot. Miluje hraní her (je to jeho závislost). Umí si udělat ze všeho srandu (doslova ze všeho)." },
  { name: "Jakub Vlček", img: "images/DSC_0376.jpg", text: "Jakub rád cestuje a užívá si procházky přírodou. Rád se opije ale vždy jen s Mírou (jeho táta). Nikdo ho v životě neviděl nosit brýle." },
  { name: "Vaclav Vostatek", img: "images/DSC_0241.jpg", text: "Vašek je cigán prej ale jenom z 1/4 (jedný čtvrtiny) takže gádžovskéj gen převláda. (HEHE). Není mu zima, je zloba, je stále dole. Miluje pouličné kurvy, vočúvaj ho more." },
  { name: "Daniel Zeman", img: "images/DSC_0199.jpg", text: "Velice rád dělá co nejmíň aktivit co může. K tomu jeho spánkový režim je velice rozbitý. A jeho oblíbená aktivita je hrát videohry." }
];

// Students data for 4SCB
const SCBstudents = [
  { name: "Annie Bílá", img: "images/DSC_0415.jpg", text: "Lorem ipsum..." },
  { name: "Natálie Burdová", img: "images/DSC_0218.jpg", text: "Lorem ipsum..." },
  { name: "Julie Heclová", img: "images/DSC_0263.jpg", text: "Lorem ipsum..." },
  { name: "Kristýna Herejková", img: "images/DSC_0218_2.jpg", text: "Lorem ipsum..." },
  { name: "Aneta Hřebíková", img: "images/DSC_0245.jpg", text: "Lorem ipsum..." },
  { name: "Anna Janková", img: "images/DSC_0153.jpg", text: "Lorem ipsum..." },
  { name: "Vladimíra Jirsová", img: "images/DSC_0109.jpg", text: "Lorem ipsum..." },
  { name: "Hana Kanalošová", img: "images/DSC_0190.jpg", text: "Lorem ipsum..." },
  { name: "Aneta Mrázová", img: "images/DSC_0286.jpg", text: "Lorem ipsum..." },
  { name: "Eliška Novotná", img: "images/DSC_0268.jpg", text: "Lorem ipsum..." },
  { name: "Nguyen Quang Truong", img: "images/DSC_0397.jpg", text: "Lorem ipsum..." },
  { name: "Linda Pfeiferová", img: "images/DSC_0171.jpg", text: "Lorem ipsum..." },
  { name: "Veronika Pivoňková", img: "images/DSC_0143.jpg", text: "Lorem ipsum..." },
  { name: "Adéla Prskavcová", img: "images/DSC_0210.jpg", text: "Lorem ipsum..." },
  { name: "Barbora Sedláková", img: "images/DSC_0163.jpg", text: "Lorem ipsum..." },
  { name: "Natálie Šedivcová", img: "images/DSC_0296.jpg", text: "Lorem ipsum..." },
  { name: "Julie Šambergrová", img: "images/DSC_0178.jpg", text: "Lorem ipsum..." },
  { name: "Eva Štědrá", img: "images/DSC_0260.jpg", text: "Lorem ipsum..." },
  { name: "Eva Šváchová", img: "images/DSC_0213.jpg", text: "Lorem ipsum..." }
]

// Teachers data
const it4bTeachers = [
  { name: "Ing. Lenka Zedníková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Zedníková", subject: "Třídní učitelka, Aplikovaný software v praxi" },
  { name: "Mgr. Petr Breit", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Breit", subject: "Tvorba webových stránek" },
  { name: "Mgr. Jan Bezděka, Ph.D.", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Bezděka", subject: "Počítačové sítě" },
  { name: "Jakub Kovářík", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Kovářík", subject: "Algoritmizace a programování" },
  { name: "Mgr. Zuzana Kadlecová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Kadlecová", subject: "Anglický jazyk" },
  { name: "Mgr. Renata Hašková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Hašková", subject: "Anglický jazyk" },
  { name: "Mgr. Veronika Schejbalová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Schejbalová", subject: "Český jazyk a literatura" },
  { name: "Mgr. Kateřina Bláhová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Bláhová", subject: "Ekonomika" },
  { name: "Mgr. Šárka Kůsová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Kůsová", subject: "Matematika" },
  { name: "Ing. Martin Zábrodský", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Zábrodský", subject: "Operační systémy" },
  { name: "Mgr. Michal Šilhánek", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Šilhánek", subject: "Tělesná výchova" },
  { name: "Ing. Jiří Formánek", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Formánek", subject: "Hardware" }
];

const scbTeachers = [
  { name: "Jana Lechmanová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Lechmanová", subject: "Anglický jazyk" },
  { name: "Jana Šváchová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Šváchová", subject: "Český jazyk a literatura" },
  { name: "Helena Klajdáčová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Klajdáčová", subject: "Matematika" },
  { name: "Iva Vydrová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Vydrová", subject: "Občanská nauka" },
  { name: "Eva Sevelková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Sevelková", subject: "Praxe, Sociální péče" },
  { name: "Jana Žižková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Žižková", subject: "Pečovatelství" },
  { name: "Adéla Brunnerová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Brunnerová", subject: "Pedagogika" },
  { name: "Lucie Bartovská", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Bartovská", subject: "Psychologie" },
  { name: "Lenka Zemanová Lindová", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Zemanová Lindová", subject: "Právo" },
  { name: "Květoslava Mužíková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Mužíková", subject: "Zdravotní tělesná výchova" },
  { name: "Denisa Kabourková", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", alt: "Kabourková", subject: "Tělesná výchova" }
];

// Function to render student cards
function renderCards(containerId, list) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  list.forEach((item, i) => {
    const next = (i + 1) % list.length;
    const prev = (i - 1 + list.length) % list.length;
    container.innerHTML += `
      <input type="radio" id="radio-${containerId}-${i + 1}" name="radio-card-${containerId}" ${i === 0 ? "checked" : ""}>
      <article class="card" style="--angle:${(Math.random() * 40 - 20).toFixed(1)}deg">
        <img class="card-img" src="${item.img}" alt="${item.name}">
        <div class="card-data">
          <span class="card-num">${i + 1}/${list.length}</span>
          <h2>${item.name}</h2>
          <p>${item.text}</p>
          <footer>
            <label for="radio-${containerId}-${prev + 1}" aria-label="Previous">&#10094;</label>
            <label for="radio-${containerId}-${next + 1}" aria-label="Next">&#10095;</label>
          </footer>
        </div>
      </article>
    `;
  });
}

// Function to render teacher cards in grid
function renderTeacherCards(containerId, list) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  list.forEach(item => {
    container.innerHTML += `
      <div class="teacher-card">
        <img src="${item.img}" alt="${item.alt}">
        <h3>${item.name}</h3>
        <p>${item.subject}</p>
      </div>
    `;
  });
}

// Render cards for students and teachers
document.addEventListener("DOMContentLoaded", () => {
  renderCards("cards-container-it4b", IT4Bstudents);
  renderCards("cards-container-scb", SCBstudents);
  renderTeacherCards("teachers-container-it4b", it4bTeachers);
  renderTeacherCards("teachers-container-scb", scbTeachers);

  // Swipe functionality for IT4B students
  const cardsContainerIt4b = document.querySelector('#cards-container-it4b');
  let startXIt4b = 0;
  cardsContainerIt4b.addEventListener('touchstart', e => startXIt4b = e.touches[0].clientX);
  cardsContainerIt4b.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startXIt4b;
    if (Math.abs(diff) > 50) {
      const current = document.querySelector('input[name="radio-card-cards-container-it4b"]:checked');
      const currentIndex = [...document.querySelectorAll('input[name="radio-card-cards-container-it4b"]')].indexOf(current);
      const nextIndex = (currentIndex + (diff < 0 ? 1 : -1) + IT4Bstudents.length) % IT4Bstudents.length;
      document.getElementById(`radio-cards-container-it4b-${nextIndex + 1}`).checked = true;
    }
  });

  // Swipe functionality for 4SCB students
  const cardsContainerScb = document.querySelector('#cards-container-scb');
  let startXScb = 0;
  cardsContainerScb.addEventListener('touchstart', e => startXScb = e.touches[0].clientX);
  cardsContainerScb.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startXScb;
    if (Math.abs(diff) > 50) {
      const current = document.querySelector('input[name="radio-card-cards-container-scb"]:checked');
      const currentIndex = [...document.querySelectorAll('input[name="radio-card-cards-container-scb"]')].indexOf(current);
      const nextIndex = (currentIndex + (diff < 0 ? 1 : -1) + SCBstudents.length) % SCBstudents.length;
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