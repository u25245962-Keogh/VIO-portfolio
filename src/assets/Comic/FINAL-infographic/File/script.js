document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  observer.observe(mapImage);
});

window.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;
  const swirlL = document.getElementById("swirlsL");
  const swirlR = document.getElementById("swirlsR");

  if (swirlL && swirlR) {
    swirlL.style.transform = `translateX(-${scrollValue * 0.0005}px)`;
    swirlR.style.transform = `translateX(${scrollValue * 0.0005}px)`;
    swirlL.style.opacity = 1 - scrollValue / 2000;
    swirlR.style.opacity = 1 - scrollValue / 2000;
  }
});

const mapImage = document.getElementById("map-open");
const freezingGif = document.getElementById("freezing");

const staticImageUrl = "map-open.png";
const openGifUrl = "../animations infographic/mapOpen.gif";
const freezingGifUrl = "../animations infographic/map-freezing.gif";

let hasBeenOpened = false;

mapImage.addEventListener("mouseenter", () => {
  if (!hasBeenOpened) {
    mapImage.src = openGifUrl + "?t=" + new Date().getTime();
  }
});

mapImage.addEventListener("mouseleave", () => {
  if (!hasBeenOpened) {
    mapImage.src = staticImageUrl;
  }
});

mapImage.addEventListener("click", () => {
  hasBeenOpened = true;
  mapImage.style.display = "none";
  freezingGif.style.display = "block";
  freezingGif.src = freezingGifUrl + "?t=" + new Date().getTime();
});

const canvas = document.getElementById("snowfall");
const ctx = canvas.getContext("2d");
const section = document.querySelector(".reveal-section");
canvas.width = section.offsetWidth;
canvas.height = section.offsetHeight;
let numOfFlakes = 100;
const snowflakes = [];

function createSnowFlakes() {
  const snowFlake = {
    x: Math.random() * canvas.width + 5,
    y: Math.random() * canvas.height,
    size: Math.random() * 5.5,
    speedX: Math.random() * 1.5,
    speedY: Math.random() * 4,
  };
  snowflakes.push(snowFlake);
}

for (let i = 0; i < numOfFlakes; i++) {
  createSnowFlakes();
}

function drawSnowFlake(snowFlake) {
  ctx.beginPath();
  ctx.arc(snowFlake.x, snowFlake.y, snowFlake.size, 0, Math.PI * 1.5);
  ctx.fillStyle = "white";
  ctx.fill();
}

function updateSnowFlake(snowFlake) {
  snowFlake.x += snowFlake.speedX;
  snowFlake.y += snowFlake.speedY;
  if (snowFlake.y > canvas.height) {
    snowFlake.x = Math.random() * canvas.width;
    snowFlake.y = -50;
  }
}

function snowfall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snowflakes.length; i++) {
    drawSnowFlake(snowflakes[i]);
    updateSnowFlake(snowflakes[i]);
  }
  requestAnimationFrame(snowfall);
}

snowfall();

const orb = document.getElementById("orb");
let orbClicked = false; // prevents scroll handler from fighting the fade-out

window.addEventListener("scroll", () => {
  if (orbClicked) return; // don't touch orb once clicked

  const scrollY = window.scrollY;
  const orbTop = orb.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (orbTop < windowHeight) {
    const progress = 1 - orbTop / windowHeight;
    const translateY = 200 - progress * 200;
    const opacity = Math.min(progress * 2, 1);
    orb.style.transform = `translateY(${translateY}px)`;
    orb.style.opacity = opacity;
  } else {
    orb.style.transform = `translateY(200px)`;
    orb.style.opacity = 0;
  }
});

// Set initial state so it's hidden before scrolling
orb.style.opacity = 0;
orb.style.transform = `translateY(200px)`;

// Orb click: trigger all the ability reveal transitions
orb.addEventListener("click", () => {
  if (orbClicked) return;
  orbClicked = true;

  const ice = document.getElementById("ice");
  const iceMelted = document.getElementById("ice-melted");
  const finWithOrb = document.getElementById("FinWorb");
  const finAbility = document.getElementById("FinleyAbilty");
  // Fade out ice ontop
  ice.style.transition = "opacity 1.2s ease";
  ice.style.opacity = 0;
  ice.addEventListener(
    "transitionend",
    () => {
      ice.style.display = "none";
    },
    { once: true },
  );

  // Fade in ice-melted
  iceMelted.hidden = false;
  iceMelted.style.opacity = 0;
  iceMelted.style.transition = "opacity 1.2s ease";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      iceMelted.style.opacity = 1;
    }),
  );

  // Fade out FinleyWithOrb
  finWithOrb.style.transition = "opacity 1s ease";
  finWithOrb.style.opacity = 0;

  // Fade in FinleyAbilty with pulsing glow after fade completes
  finAbility.hidden = false;
  finAbility.style.opacity = 0;
  finAbility.style.transition = "opacity 1s ease 0.2s";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      finAbility.style.opacity = 1;
    }),
  );
  setTimeout(() => {
    finAbility.classList.add("glowing");
  }, 1400);

  // Fade out orb and fully remove it so scroll handler can't bring it back
  // orb.style.transition = "opacity 0.8s ease";
  //  orb.style.opacity = 0;
  //orb.addEventListener(
  //  "transitionend",
  //() => {
  // orb.style.display = "none";
  //  },
  //  { once: true },
  // );
});

// ── Pen interaction ──────────────────────────────────────────────
const pen = document.getElementById("pen");
const penPress = document.getElementById("penPress");
const inkSpread = document.getElementById("ink-spread");
const ink = document.getElementById("ink");

// Info images in reveal order (click 1 = inkInfo1, click 2 = face, …)
const infoSequence = [
  document.getElementById("inkInfo1"),
  document.getElementById("inkInfo3"), // face.png
  document.getElementById("inkInfo5"), // likeDraw.png
  document.getElementById("inkInfo4"), // favBlue.png
  document.getElementById("inkInfo6"), // 2ndYear.png
  document.getElementById("inkInfo7"), // 19.png
];

let inkSpreadDone = false;
let infoStep = 0;

// Helper: fade an element in
function fadeIn(el, duration = "0.6s", delay = "0s") {
  el.style.transition = `opacity ${duration} ease ${delay}`;
  el.style.opacity = 0;
  el.hidden = false;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      el.style.opacity = 1;
    }),
  );
}

// 1. Click pen → swap to penPress, play ink-spread gif once
pen.addEventListener("click", () => {
  // Swap pen → penPress instantly
  pen.style.display = "none";
  penPress.hidden = false;

  // Restart the gif by re-setting src with cache-bust
  const inkSrc = inkSpread.src.split("?")[0];
  inkSpread.src = inkSrc + "?t=" + Date.now();
  inkSpread.style.display = "block";

  // When gif ends, show the ink.png and make it clickable
  // Use a timeout matching the gif duration — adjust ms to your gif length
  const GIF_DURATION_MS = 2000; // ← change this to match your gif
  setTimeout(() => {
    inkSpreadDone = true;
    fadeIn(ink);
    ink.style.cursor = "pointer";
    ink.style.pointerEvents = "auto";
  }, GIF_DURATION_MS);
});

// 2. Click ink → reveal info images one by one
ink.addEventListener("click", () => {
  if (!inkSpreadDone) return;
  if (infoStep < infoSequence.length) {
    fadeIn(infoSequence[infoStep]);
    infoStep++;
  }
});
