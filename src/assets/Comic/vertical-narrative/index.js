function createRangeAudioTrigger(audioEl, rangeTop, rangeHeight) {
  return function check() {
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const inRange =
      viewportCenter >= rangeTop && viewportCenter <= rangeTop + rangeHeight;

    if (inRange && audioEl.paused) {
      audioEl.play().catch((err) => {
        console.warn(`${audioEl.id} blocked:`, err);
      });
    } else if (!inRange && !audioEl.paused) {
      audioEl.pause();
    }
  };
}

const introWind = document.getElementById("introWind");
const introCheck = createRangeAudioTrigger(introWind, 0, 1336.5);

let introArmed = false;

function checkIntroRange() {
  if (!introArmed) return;
  introCheck();
}

function armIntroTrigger() {
  introArmed = true;
  checkIntroRange();
}

window.addEventListener("scroll", checkIntroRange);
window.addEventListener("load", armIntroTrigger);

document.addEventListener("click", armIntroTrigger, { once: true });

//KRAK-THOOM

const thoom = document.getElementById("THOOM");
const thoomCheck = createRangeAudioTrigger(thoom, 1884.465, 700);

let thoomArmed = false;

function checkthoomRange() {
  if (!thoomArmed) return;
  thoomCheck();
}

function armthoomTrigger() {
  thoomArmed = true;
  checkthoomRange();
}

window.addEventListener("scroll", checkthoomRange);
window.addEventListener("load", armthoomTrigger);

document.addEventListener("click", armthoomTrigger, { once: true });



//zip

const zip = document.getElementById("zip");
const zipGif = document.getElementById("zipGif");
const zipTop = 6615.675;
const zipHeight = 445.5;
const zipDuration = 2000;

let zipArmed = false;
let zipGifInView = false;
let zipStarted = false;

function checkZipRange() {
  if (!zipArmed || zipStarted) return;

  const viewportCenter = window.scrollY + window.innerHeight / 2;
  const zipInRange =
    viewportCenter >= zipTop && viewportCenter <= zipTop + zipHeight;

  if (zipGifInView && zipInRange) {
    zipStarted = true;
    zipGif.src = zipGif.dataset.src;
    zipGif.style.visibility = "visible";
    zip.play().catch((err) => {
      console.warn(`${zip.id} blocked:`, err);
    });

    window.setTimeout(() => {
      zipGif.src = "zip.png";
    }, zipDuration);
  }
}

const zipObserver = new IntersectionObserver(
  ([entry]) => {
    zipGifInView = entry.isIntersecting;
    checkZipRange();
  },
  { threshold: 0.01 },
);

zipObserver.observe(zipGif);
window.addEventListener("scroll", checkZipRange);

function armZipTrigger() {
  zipArmed = true;
  checkZipRange();
}

window.addEventListener("load", armZipTrigger);
document.addEventListener("click", armZipTrigger, { once: true });

//snow

const loudStepsSnow = document.getElementById("LoudStepsSnow");
const loudStepsSnowCheck = createRangeAudioTrigger(loudStepsSnow, 6936.435, 1559.25);

let loudStepsSnowArmed = false;

function checkloudStepsSnowRange() {
  if (!loudStepsSnowArmed) return;
  loudStepsSnowCheck();
}

function armloudStepsSnowTrigger() {
  loudStepsSnowArmed = true;
  checkloudStepsSnowRange();
}

window.addEventListener("scroll", checkloudStepsSnowRange);
window.addEventListener("load", armloudStepsSnowTrigger);

document.addEventListener("click", armloudStepsSnowTrigger, { once: true });

//Bridge-krak

const KRAK = document.getElementById("KRAK");
const KRAKCheck = createRangeAudioTrigger(KRAKaudio, 9342.135, 445.5);

let KRAKArmed = false;

function checkKRAKRange() {
  if (!KRAKArmed) return;
  KRAKCheck();
}

function armKRAKTrigger() {
    KRAKArmed = true;
  checkKRAKRange();
}

window.addEventListener("scroll", checkKRAKRange);
window.addEventListener("load", armKRAKTrigger);

document.addEventListener("click", armKRAKTrigger, { once: true });

//fire


const fire = document.getElementById("crackles");
const fireCheck = createRangeAudioTrigger(fire, 16012.606, 1336.5);

let fireArmed = false;

function checkfireRange() {
  if (!fireArmed) return;
  fireCheck();
}

function armfireTrigger() {
    fireArmed = true;
  checkfireRange();
}

window.addEventListener("scroll", checkfireRange);
window.addEventListener("load", armfireTrigger);

document.addEventListener("click", armfireTrigger, { once: true });


//thring

const thring = document.getElementById("thring");
const thringCheck = createRangeAudioTrigger(thring, 18764.014, 1400);

let thringArmed = false;

function checkthringRange() {
  if (!thringArmed) return;
  thringCheck();
}

function armthringTrigger() {
  thringArmed = true;
  checkthringRange();
}

window.addEventListener("scroll", checkthringRange);
window.addEventListener("load", armthringTrigger);

document.addEventListener("click", armthringTrigger, { once: true });



//shrou

const shrou = document.getElementById("SHROU");
const shrouCheck = createRangeAudioTrigger(shrou, 25379, 1800);

let shrouArmed = false;

function checkshrouRange() {
  if (!shrouArmed) return;
  shrouCheck();
}

function armshrouTrigger() {
  shrouArmed = true;
  checkshrouRange();
}

window.addEventListener("scroll", checkshrouRange);
window.addEventListener("load", armshrouTrigger);

document.addEventListener("click", armshrouTrigger, { once: true });

//hm

const hm = document.getElementById("hm");
const hmCheck = createRangeAudioTrigger(hm, 20790, 300);

let hmArmed = false;

function checkhmRange() {
  if (!hmArmed) return;
  hmCheck();
}

function armhmTrigger() {
  hmArmed = true;
  checkhmRange();
}

window.addEventListener("scroll", checkhmRange);
window.addEventListener("load", armhmTrigger);

document.addEventListener("click", armhmTrigger, { once: true });



//hu

const hu = document.getElementById("hu");
const huCheck = createRangeAudioTrigger(hu, 21394, 300);

let huArmed = false;

function checkhuRange() {
  if (!huArmed) return;
  huCheck();
}

function armhuTrigger() {
  huArmed = true;
  checkhuRange();
}

window.addEventListener("scroll", checkhuRange);
window.addEventListener("load", armhuTrigger);

document.addEventListener("click", armhuTrigger, { once: true });






function getGifDuration(gifData) {
  const bytes = new Uint8Array(gifData);
  let offset = 13;
  let duration = 0;

  while (offset < bytes.length) {
    const block = bytes[offset++];

    if (block === 0x3b) break;
    if (block === 0x21 && bytes[offset++] === 0xf9) {
      const blockSize = bytes[offset++];
      duration += (bytes[offset + 2] << 8 | bytes[offset + 1]) * 10;
      offset += blockSize + 1;
      continue;
    }

    if (block === 0x2c) {
      const packedFields = bytes[offset + 9];
      offset += 10;
      if (packedFields & 0x80) offset += 3 * (2 ** ((packedFields & 7) + 1));
    } else if (block === 0x21) {
      offset += 1;
    }

    while (offset < bytes.length && bytes[offset]) offset += bytes[offset] + 1;
    offset++;
  }

  return duration || 1000;
}

function setupOneShotGif(imageId, pngSrc, visibilityThreshold = 0.1, durationOverride) {
  const image = document.getElementById(imageId);
  const gifSrc = image.dataset.gifSrc;
  let playbackId = 0;
  let playbackTimer;
  const gifDurationPromise = fetch(gifSrc)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to read ${gifSrc}`);
      return response.arrayBuffer();
    })
    .then(getGifDuration)
    .catch(() => 3000);

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      playbackId++;
      window.clearTimeout(playbackTimer);
      return;
    }

    const currentPlaybackId = ++playbackId;
    image.addEventListener("load", async () => {
      const gifDuration = durationOverride ?? await gifDurationPromise;
      if (currentPlaybackId !== playbackId) return;

      playbackTimer = window.setTimeout(() => {
        if (currentPlaybackId === playbackId) image.src = pngSrc;
      }, gifDuration);
    }, { once: true });
    image.src = `${gifSrc}?replay=${currentPlaybackId}`;
  }, { threshold: visibilityThreshold });

  observer.observe(image);
}

setupOneShotGif("eughFinley", "eughFinley.png");
setupOneShotGif("headDown", "headDown.png", 0.01);
setupOneShotGif("earth", "earth-end.png");
setupOneShotGif("shrou", "shrou.png", 0.1, 2800);
setupOneShotGif("explosion", "explosion.png", 0.1, 4500);


