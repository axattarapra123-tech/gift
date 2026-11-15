/**
 * ANNIVERSARY SURPRISE ENGINE (V3 - REAL MEMORIES & RESPECTFUL TONE)
 * Dedicated to Axat & His Cutest Wifiji 💖
 * 3 Magical Years Together (16 November)
 */

// ==========================================================================
// 1. WEB AUDIO ROMANTIC SYNTHESIZER & SOUND EFFECTS
// ==========================================================================
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.step = 0;
    
    // Soothing Romantic Chords (Fmaj7 -> G -> Em7 -> Am7)
    this.chordNotes = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G
      [164.81, 196.00, 246.94, 329.63], // Em7
      [220.00, 261.63, 329.63, 440.00]  // Am7
    ];

    this.melodyNotes = [
      523.25, 587.33, 659.25, 783.99, 880.00, 659.25, 587.33, 523.25
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 1.2, gainLevel = 0.08, delay = 0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  toggleMusic() {
    this.init();
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isPlaying;
  }

  startMusic() {
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextBar();
  }

  scheduleNextBar() {
    if (!this.isPlaying || !this.ctx) return;

    const currentChord = this.chordNotes[this.step % this.chordNotes.length];
    
    currentChord.forEach((note, idx) => {
      this.playTone(note, 'sine', 2.8, 0.045, idx * 0.08);
    });

    const melodyNote = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
    this.playTone(melodyNote, 'triangle', 1.8, 0.06, 0.4);
    
    const secondMelody = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
    this.playTone(secondMelody, 'sine', 1.6, 0.05, 1.2);

    this.step++;
    this.timer = setTimeout(() => this.scheduleNextBar(), 2400);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  playEnvelopeSound() {
    this.init();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((n, i) => this.playTone(n, 'triangle', 0.8, 0.08, i * 0.08));
  }

  playFanfare() {
    this.init();
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50];
    fanfareNotes.forEach((n, i) => this.playTone(n, 'sine', 1.2, 0.1, i * 0.12));
    setTimeout(() => {
      [783.99, 1046.50, 1318.51].forEach((n, i) => this.playTone(n, 'triangle', 1.8, 0.12, i * 0.06));
    }, 550);
  }

  playCandleBlow() {
    this.init();
    [880, 1174.66, 1318.51].forEach((n, i) => this.playTone(n, 'sine', 1.5, 0.07, i * 0.1));
  }

  playPop() {
    this.init();
    this.playTone(587.33, 'triangle', 0.5, 0.09, 0);
    this.playTone(880.00, 'sine', 0.6, 0.07, 0.08);
  }

  playTick() {
    this.init();
    this.playTone(1200, 'sine', 0.08, 0.04, 0);
  }
}

const audio = new RomanticAudioEngine();

// UI Music Toggle
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');
const musicEq = document.getElementById('musicEq');

if (musicToggleBtn) {
  musicToggleBtn.addEventListener('click', () => {
    const isPlaying = audio.toggleMusic();
    if (isPlaying) {
      musicIcon.textContent = '💖';
      if (musicLabel) musicLabel.textContent = 'Playing Music';
      musicEq.classList.add('playing');
    } else {
      musicIcon.textContent = '🎵';
      if (musicLabel) musicLabel.textContent = 'Romantic Tune';
      musicEq.classList.remove('playing');
    }
  });
}

// Touch or click anywhere initializes audio context for mobile policies
['click', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, function initAudioOnce() {
    audio.init();
    document.removeEventListener(evt, initAudioOnce);
  }, { once: true });
});


// ==========================================================================
// 2. WHATSAPP DIRECT SHARE HELPER
// ==========================================================================
function openWhatsApp(messageText) {
  const encodedText = encodeURIComponent(messageText);
  const waUrl = `https://api.whatsapp.com/send?phone=919723690712&text=${encodedText}`;
  window.open(waUrl, '_blank');
}

function shareTrophyOnWhatsApp() {
  audio.playFanfare();
  const msg = `🏆 Hii Axat ji! 💖\n\nDekhiye mujhe humari anniversary website par officially "WORLD'S BESTEST WIFIJI AWARD" mil gaya hai! 👑✨\n\nAxat ne issue kiya hai aur validity poore 7 Janam tak ki hai! Happy 3rd Anniversary! 💍🥰`;
  openWhatsApp(msg);
}

function sendCouponWhatsApp(msg) {
  audio.playPop();
  openWhatsApp(msg);
}

function sendLetterReplyWhatsApp() {
  audio.playPop();
  const msg = `Mere Pyare Axat! 💌💖\n\nMaine aapka dil se likha prem patra padh liya! Wo suggestion me aayi profile aur ladki ki ID se shuru hua safar sach me meri zindagi ka sabse pyara hissa hai. 3 saal complete ho gaye aur agle 7 janam tak main sirf aapki hu! I love you so much! 🥰💍`;
  openWhatsApp(msg);
}

function sendShayariWhatsApp() {
  audio.playPop();
  const msg = `Mere Pyare Axat! ✍️💖\n\nMaine humari anniversary website par aapka likha hua Shayari Session padha! Bohot hi zyada dil ko chhoo lene wali lines hain: "Aapki muskaan me basti hai meri poori duniya..." 🥰✨\n\nHappy 3rd Anniversary! I love you endlessly! 🌸💍`;
  openWhatsApp(msg);
}

function sendExpressWhatsApp(msg) {
  audio.playPop();
  openWhatsApp(msg);
}


// ==========================================================================
// 3. COUPONS CLAIM SYSTEM & STATE
// ==========================================================================
function claimCoupon(id, name, wpMsg) {
  audio.playFanfare();

  const couponEl = document.getElementById(`coupon-${id}`);
  const badgeEl = document.getElementById(`badge-${id}`);
  const wpBtn = document.getElementById(`wp-btn-${id}`);

  if (couponEl) couponEl.classList.add('claimed');
  if (badgeEl) {
    badgeEl.textContent = 'CLAIMED ✅';
    badgeEl.classList.add('claimed');
  }
  if (wpBtn) wpBtn.style.display = 'inline-flex';

  try {
    localStorage.setItem(`anniversary_coupon_${id}`, 'claimed');
  } catch(e) {}

  if (couponEl) {
    const rect = couponEl.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
  }
}

function claimAllCouponsAndShare() {
  audio.playFanfare();

  for (let i = 1; i <= 4; i++) {
    const couponEl = document.getElementById(`coupon-${i}`);
    const badgeEl = document.getElementById(`badge-${i}`);
    const wpBtn = document.getElementById(`wp-btn-${i}`);

    if (couponEl) couponEl.classList.add('claimed');
    if (badgeEl) {
      badgeEl.textContent = 'CLAIMED ✅';
      badgeEl.classList.add('claimed');
    }
    if (wpBtn) wpBtn.style.display = 'inline-flex';
    try {
      localStorage.setItem(`anniversary_coupon_${i}`, 'claimed');
    } catch(e) {}
  }

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 45);

  const fullWishlistMsg = `🎁 Hii Axat ji! 💖\n\nMaine humari 3rd Anniversary ke SAARE 4 GOLDEN COUPONS ek sath CLAIM kar liye hain:\n\n1. 🧸 Unlimited Hugs & Pampering\n2. 🚗🍦 Midnight Long Drive & Favourite Food\n3. 👑 "Wifiji Is Always Right" Master Pass\n4. 👸✨ Lifetime Princess Treatment\n\nAb jaldi se ready ho jaiye aur in sabko redeem kijiye! Happy 3rd Anniversary! 💍🥰`;
  
  setTimeout(() => {
    openWhatsApp(fullWishlistMsg);
  }, 500);
}

// Restore claimed coupons on load
window.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 4; i++) {
    try {
      if (localStorage.getItem(`anniversary_coupon_${i}`) === 'claimed') {
        const couponEl = document.getElementById(`coupon-${i}`);
        const badgeEl = document.getElementById(`badge-${i}`);
        const wpBtn = document.getElementById(`wp-btn-${i}`);
        if (couponEl) couponEl.classList.add('claimed');
        if (badgeEl) {
          badgeEl.textContent = 'CLAIMED ✅';
          badgeEl.classList.add('claimed');
        }
        if (wpBtn) wpBtn.style.display = 'inline-flex';
      }
    } catch(e) {}
  }
});


// ==========================================================================
// 4. FLOATING PARTICLES CANVAS
// ==========================================================================
const canvas = document.getElementById('heartCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;
let width, height;
let hearts = [];

if (canvas && ctx) {
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FloatingHeart {
    constructor(x, y, isBurst = false) {
      this.x = x || Math.random() * width;
      this.y = y || height + 20;
      this.size = Math.random() * 18 + 10;
      this.speedY = isBurst ? (Math.random() - 0.5) * 8 : -(Math.random() * 1.5 + 0.8);
      this.speedX = isBurst ? (Math.random() - 0.5) * 8 : Math.sin(Math.random() * Math.PI) * 1 - 0.5;
      this.opacity = 1;
      this.fade = isBurst ? Math.random() * 0.02 + 0.015 : Math.random() * 0.004 + 0.002;
      this.color = ['#ff4b72', '#ff758c', '#ff8da1', '#ffb3c1', '#f43f5e', '#ec4899'][Math.floor(Math.random() * 6)];
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(this.size / 20, this.size / 20);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.opacity);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;
      this.opacity -= this.fade;
    }
  }

  function spawnAmbientHearts() {
    if (hearts.length < 32) {
      hearts.push(new FloatingHeart());
    }
  }

  window.burstHearts = function(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      hearts.push(new FloatingHeart(x, y, true));
    }
  };

  function animateHearts() {
    ctx.clearRect(0, 0, width, height);

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.update();
      h.draw();
      if (h.opacity <= 0 || h.y < -50 || h.y > height + 60 || h.x < -50 || h.x > width + 50) {
        hearts.splice(i, 1);
      }
    }

    requestAnimationFrame(animateHearts);
  }
  setInterval(spawnAmbientHearts, 400);
  animateHearts();

  window.addEventListener('click', (e) => {
    if (e.target.closest('.modal-card') || e.target.closest('.btn') || e.target.closest('video')) return;
    burstHearts(e.clientX, e.clientY, 8);
  });
} else {
  window.burstHearts = function() {};
}


// ==========================================================================
// 5. LIVE ANNIVERSARY COUNTER (3 YEARS & COUNTING)
// ==========================================================================
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 3);
startDate.setHours(0, 0, 0, 0);

function updateAnniversaryCounter() {
  const now = new Date();
  const diffMs = now - startDate;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const daysEl = document.getElementById('daysCount');
  const hoursEl = document.getElementById('hoursCount');
  const minutesEl = document.getElementById('minutesCount');
  const secondsEl = document.getElementById('secondsCount');

  if (daysEl) daysEl.textContent = totalDays.toLocaleString();
  if (hoursEl) hoursEl.textContent = totalHours.toLocaleString();
  if (minutesEl) minutesEl.textContent = totalMinutes.toLocaleString();
  if (secondsEl) secondsEl.textContent = totalSeconds.toLocaleString();
}
setInterval(updateAnniversaryCounter, 1000);
updateAnniversaryCounter();


// ==========================================================================
// 6. NICKNAME MODAL CONTENT & INTERACTIONS (RESPECTFUL TONE)
// ==========================================================================
const nicknameData = {
  cutiepie: {
    emoji: "🧁",
    title: "Meri Cutiepie",
    text: "Aapki wo innocent smile, jab aap thoda sa shy karti hain ya bina baat ke hasne lagti hain... duniya ki sabse cutiepie cheez wahi hai! Mere chehre par instant muskaan lane ka remote control hamesha aapke paas rehta hai.",
    extra: "Cutest Smile in the Entire Universe! ✨🥰"
  },
  prinsessji: {
    emoji: "👑",
    title: "My Prinsessji",
    text: "Mere dil ke mahal ki sabse pyari sehzadi! Chahe hum kitne bhi saal sath rahein, aapka status mere liye hamesha 'Royal Princess' ka hi rahega. Aapko har lamha pamper karna mera favourite kaam hai!",
    extra: "Princess Treatment: Active for Lifetime 💖"
  },
  bestest_wifiji: {
    emoji: "💍",
    title: "My Bestest Wifji",
    text: "Profile suggestion me aayi thi aur wahan se dosti hui... par aaj aap meri sabse best friend, sabse pyari confidante aur meri bestest wifiji ban chuki hain! Aapke jaisi samajhdar aur caring partner sirf kismat walon ko milti hai.",
    extra: "Best Life Partner Ever Award Winner 🏆"
  },
  janmo_sathi: {
    emoji: "♾️",
    title: "Mere Janmo Janmo Kie Sathi",
    text: "Kal 3 saal pure ho rahe hain humare sath hone ko... par ye toh sirf ek shuruat hai! Maine rab se aane wale 7 janmo ke liye sirf aur sirf aapko maang liya hai. Har janam me Axat sirf aapka hi rahega!",
    extra: "7 Janam & Infinity To Go! 💍❤️"
  },
  my_everything: {
    emoji: "🌍",
    title: "My Everything",
    text: "Subah aankh khulte hi pehla khayal aapka, din bhar ki choti-moti baaton me zikr aapka, aur raat ko sone se pehle ki aakhri dua aapki salamati ki. Sach me, aap mera sab kuch hain!",
    extra: "My World, My Heart, My Forever 💫"
  },
  my_baby: {
    emoji: "🍼",
    title: "My Baby",
    text: "Jab aap bachon ki tarah zid karti hain, choti baaton par ruth jaati hain aur phir gale lag jaati hain... tab mujhe lagta hai ki is duniya me aapse zyada pyaara aur koi nahi ho sakta!",
    extra: "Pyara Baby jise Axat hamesha laad karega 🧸💕"
  },
  my_bavv: {
    emoji: "🧸",
    title: "My Bavv",
    text: "Mera sabse pyara teddy bear! Jisse baat kiye bina din adhoora lagta hai aur jiske bina koi bhi khushi poori nahi lagti. Ek tight warm hug dekar sab theek karne wali meri Bavv!",
    extra: "Endless Warm Hugs & Cuddles 🌸"
  },
  sehzadiji: {
    emoji: "👸",
    title: "My Sehzadiji",
    text: "Aapki har ada me ek shahi nazaakat hai! Aap jab bhi bolti hain, lagta hai bas sunta rahu. Meri Sehzadiji ke har hukum ko sar aankhon par rakhna Axat ka farz hai!",
    extra: "Shahi Hukum Hamesha Manzoor Hai! 👑💎"
  },
  gulabjamun: {
    emoji: "🍯",
    title: "Mera Gulabjamun",
    text: "Itni soft, itni sweet aur chashni se bhari hui meri wifiji! Gusse me bhi aap itni sweet lagti hain ki dekh kar hi mera dil pighal jata hai. You are the sweetest delight of my life!",
    extra: "100% Pure Sweetness, Zero Calorie Tension 😋🍯"
  },
  kajukatli: {
    emoji: "🍬",
    title: "Meri Kajukatli",
    text: "Mithaiyon me jo jagah Kaju Katli ki hoti hai—sabse premium, sabse khaas aur sabki favourite—wahi jagah meri zindagi me aapki hai! You make every day feel like a festival.",
    extra: "The Most Precious & Premium Sweetheart 💎🍬"
  }
};

function openNickModal(key) {
  const data = nicknameData[key];
  if (!data) return;

  audio.playPop();

  document.getElementById('modalEmoji').textContent = data.emoji;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalText').textContent = data.text;
  document.getElementById('modalExtra').textContent = data.extra;

  const modal = document.getElementById('nickModal');
  modal.classList.add('active');

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 16);
}

function closeNickModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close') && !e.target.classList.contains('btn')) {
    return;
  }
  const modal = document.getElementById('nickModal');
  modal.classList.remove('active');
}


// ==========================================================================
// 7. INTERACTIVE LOVE ENVELOPE (LETTER FROM AXAT)
// ==========================================================================
let isLetterOpen = false;

function toggleLetter(e) {
  if (e) e.stopPropagation();
  const letterPaper = document.getElementById('letterPaper');

  isLetterOpen = !isLetterOpen;

  if (isLetterOpen) {
    audio.playEnvelopeSound();
    letterPaper.classList.add('open');
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 20);
    letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    letterPaper.classList.remove('open');
  }
}


// ==========================================================================
// 8. UNBOXING 3D VIRTUAL GIFT BOX
// ==========================================================================
let isGiftUnboxed = false;

function unboxGift() {
  if (isGiftUnboxed) return;
  isGiftUnboxed = true;

  audio.playFanfare();

  const giftBox = document.getElementById('giftBox');
  const revealedGift = document.getElementById('revealedGift');
  const boxLid = giftBox.querySelector('.box-lid');

  boxLid.style.transform = 'translateY(-80px) rotate(-25deg)';
  boxLid.style.opacity = '0';

  const rect = giftBox.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

  setTimeout(() => {
    giftBox.style.display = 'none';
    revealedGift.style.display = 'block';
    revealedGift.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}

function reboxGift() {
  isGiftUnboxed = false;
  const giftBox = document.getElementById('giftBox');
  const revealedGift = document.getElementById('revealedGift');
  const boxLid = giftBox.querySelector('.box-lid');

  revealedGift.style.display = 'none';
  giftBox.style.display = 'block';
  boxLid.style.transform = 'none';
  boxLid.style.opacity = '1';
}


// ==========================================================================
// 9. ANNIVERSARY CAKE & CANDLE BLOWING
// ==========================================================================
let candleBlown = false;

function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;

  audio.playCandleBlow();

  const flame = document.getElementById('candleFlame');
  const smoke = document.getElementById('candleSmoke');
  const wishStatus = document.getElementById('wishStatus');

  flame.style.opacity = '0';
  flame.style.animation = 'none';

  smoke.style.opacity = '1';
  smoke.style.transition = 'all 1.5s ease-out';
  smoke.style.transform = 'translate(-50%, -40px) scale(3)';

  const cakeRect = document.getElementById('cakeVisual').getBoundingClientRect();
  burstHearts(cakeRect.left + cakeRect.width / 2, cakeRect.top + 30, 35);

  setTimeout(() => {
    smoke.style.opacity = '0';
  }, 1200);

  wishStatus.innerHTML = `
    <div style="animation: zoomFadeIn 0.5s ease;">
      <p style="font-size: 1.25rem; font-weight: 800; color: #be123c;">
        🎉 WISH ACCEPTED BY THE STARS! ✨🌟
      </p>
      <p style="color: #6d2842; font-size: 1.05rem; margin-top: 6px;">
        Axat promises to fulfill every single wish of his Cutest Wifiji today, tomorrow, and forever! 💖🎂
      </p>
    </div>
  `;
}


// ==========================================================================
// 10. PLAYFUL RUNAWAY PROPOSAL QUESTION
// ==========================================================================
const funnyDodgeMessages = [
  "Sochungi thoda... 😜",
  "Arrey aise kaise! 🙈",
  "Axat se bachke kahan jayengi! 🤣",
  "Pakad ke dikhaiye pehle! 🏃‍♀️💨",
  "No escape! Sirf YES bolna padega! 💕",
  "Suggestion me dekha tha, ab toh 7 janam sath rehna padega! 💍",
  "Gulabjamun hain aap meri, na nahi bol sakti! 🍯"
];

let dodgeCount = 0;

function dodgeButton() {
  const noBtn = document.getElementById('noBtn');
  const container = document.querySelector('.proposal-section');
  if (!noBtn || !container) return;

  dodgeCount++;
  audio.playPop();

  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width - 60;
  const randomX = (Math.random() - 0.5) * maxX;
  const randomY = (Math.random() - 0.5) * 120;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  const nextMsg = funnyDodgeMessages[dodgeCount % funnyDodgeMessages.length];
  noBtn.querySelector('span').textContent = nextMsg;

  const yesBtn = document.getElementById('yesBtn');
  if (yesBtn) {
    const currentScale = 1 + Math.min(dodgeCount * 0.08, 0.5);
    yesBtn.style.transform = `scale(${currentScale})`;
  }
}

function celebrateProposal() {
  audio.playFanfare();

  const resultDiv = document.getElementById('proposalResult');
  const actionsDiv = document.querySelector('.proposal-actions');

  if (actionsDiv) actionsDiv.style.display = 'none';

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.95); padding: 30px; border-radius: 24px; border: 3px solid #ff4b72; box-shadow: 0 15px 40px rgba(255, 75, 114, 0.3);">
      <div style="font-size: 3.5rem; margin-bottom: 12px;">💍👰‍♀️🤵‍♂️💖</div>
      <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #831843; margin-bottom: 10px;">
        IT'S AN ETERNAL PROMISE! ♾️
      </h3>
      <p style="font-size: 1.25rem; color: #be123c; font-weight: 700; margin-bottom: 12px;">
        Wifiji is officially booked for 7 Janam by Axat!
      </p>
      <p style="font-size: 1.05rem; color: #551c33; max-width: 550px; margin: 0 auto 20px;">
        Profile suggestion me dekh kar message kiya tha, par aaj aap meri sabse sachhi dua aur sabse pyari biwi hain. Happy 3rd Anniversary meri Cutiepie! 🌸🍯
      </p>
      <button class="btn btn-whatsapp" onclick="openWhatsApp('Hii Axat ji! 💖 Maine aapka proposal accept kar liya! Agle 7 Janam tak sirf aapki wifiji ban kar rahungi! 💍✨')">
        <span>📲 Send 'YES FOR 7 LIFETIMES' on WhatsApp! 💖</span>
      </button>
    </div>
  `;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      burstHearts(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7, 30);
    }, i * 250);
  }
}


// ==========================================================================
// 11. LOCAL STORAGE PHOTO UPLOAD (FOR REAL MEMORIES)
// ==========================================================================
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    
    const polaroidGrid = document.getElementById('polaroidGrid');
    if (polaroidGrid) {
      const newCard = document.createElement('div');
      newCard.className = 'polaroid-card';
      newCard.style.animation = 'zoomFadeIn 0.5s ease forwards';
      newCard.innerHTML = `
        <div class="polaroid-pin">📌</div>
        <div class="polaroid-img-wrapper">
          <img src="${base64Data}" alt="Axat and Wifiji Memory">
        </div>
        <p class="polaroid-caption">Humari Real Smile! 💖</p>
      `;

      polaroidGrid.prepend(newCard);
    }

    try {
      localStorage.setItem('anniversary_custom_photo', base64Data);
    } catch (err) {}

    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 25);
  };
  reader.readAsDataURL(file);
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    const savedPhoto = localStorage.getItem('anniversary_custom_photo');
    const polaroidGrid = document.getElementById('polaroidGrid');
    if (savedPhoto && polaroidGrid) {
      const newCard = document.createElement('div');
      newCard.className = 'polaroid-card';
      newCard.innerHTML = `
        <div class="polaroid-pin">📌</div>
        <div class="polaroid-img-wrapper">
          <img src="${savedPhoto}" alt="Axat and Wifiji Memory">
        </div>
        <p class="polaroid-caption">Humari Real Smile! 💖</p>
      `;
      polaroidGrid.prepend(newCard);
    }
  } catch (err) {}
});


// ==========================================================================
// 12. PAMPER HUB: THE INTERACTIVE MOOD SPINNER WHEEL
// ==========================================================================
const wheelItems = [
  { text: "15-Min Massage & Pamper 💆‍♀️", msg: "Hii Axat! 💆‍♀️ Maine Mood Wheel ghumaya aur aaya hai '15-Min Head Massage & Pampering'! Abhi shuru ho jaiye bina late kiye! 🥰" },
  { text: "Midnight Coffee / Maggi ☕🍜", msg: "Axat ji! ☕🍜 Mood Wheel ne bola hai ki aaj aadhi raat ko aap mere liye special Coffee aur Maggi banayenge with extra love! 😋" },
  { text: "Whatever In Cart Pass 🛍️", msg: "Hello Axat! 🛍️ Maine Wheel of Love me 'Whatever In My Cart Pass' jeet liya hai! Myntra / Amazon orders place karwaiye abhi! 😜✨" },
  { text: "Forehead Kisses & Cuddles 😘", msg: "Axat! 😘 Mood Wheel order: Unlimited Forehead Kisses & Warm Tight Hugs right now! 🧸💖" },
  { text: "Wifiji's Movie/Reels Night 🎬", msg: "Hii Axat! 🎬 Aaj movie ya shows sirf wifiji ki marzi ke chalenge, no cricket or action allowed! 🍿🥰" },
  { text: "10 Sweet Things For Me 🍯", msg: "Mere Pyare Axat! 🍯 Mood Wheel bol raha hai ki abhi mujhe 10 reasons bataiye why I am your Gulabjamun & Kajukatli! 🍬💖" }
];

const wheelCanvas = document.getElementById('wheelCanvas');
let wheelCtx = wheelCanvas ? wheelCanvas.getContext('2d') : null;
let currentWheelAngle = 0;
let isSpinning = false;
let selectedWheelItem = null;

const wheelColors = ['#ffccd5', '#ffe5d9', '#d8f3dc', '#e0c3fc', '#fde2e4', '#fff1e6'];

function drawWheel() {
  if (!wheelCanvas || !wheelCtx) return;

  const numSlices = wheelItems.length;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const radius = wheelCanvas.width / 2;

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  for (let i = 0; i < numSlices; i++) {
    const angle = i * sliceAngle;

    wheelCtx.beginPath();
    wheelCtx.moveTo(radius, radius);
    wheelCtx.arc(radius, radius, radius, angle, angle + sliceAngle);
    wheelCtx.closePath();
    wheelCtx.fillStyle = wheelColors[i % wheelColors.length];
    wheelCtx.fill();
    wheelCtx.lineWidth = 2;
    wheelCtx.strokeStyle = '#ffffff';
    wheelCtx.stroke();

    wheelCtx.save();
    wheelCtx.translate(radius, radius);
    wheelCtx.rotate(angle + sliceAngle / 2);
    wheelCtx.textAlign = 'right';
    wheelCtx.fillStyle = '#4a0e2e';
    wheelCtx.font = 'bold 12px Outfit, sans-serif';
    wheelCtx.fillText(wheelItems[i].text, radius - 18, 5);
    wheelCtx.restore();
  }
}

if (wheelCanvas) {
  drawWheel();
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  audio.init();
  const spinBtn = document.getElementById('spinBtn');
  const wheelCircle = document.getElementById('wheelCircle');
  const resultCard = document.getElementById('wheelResultCard');

  if (spinBtn) spinBtn.disabled = true;
  if (resultCard) resultCard.style.display = 'none';

  const extraRotations = 5 + Math.floor(Math.random() * 4);
  const randomAngle = Math.floor(Math.random() * 360);
  const totalDegrees = extraRotations * 360 + randomAngle;

  currentWheelAngle += totalDegrees;
  if (wheelCircle) {
    wheelCircle.style.transform = `rotate(${currentWheelAngle}deg)`;
  }

  let tickInterval = setInterval(() => {
    audio.playTick();
  }, 120);

  setTimeout(() => {
    clearInterval(tickInterval);
  }, 3500);

  setTimeout(() => {
    isSpinning = false;
    if (spinBtn) spinBtn.disabled = false;

    const normalizedAngle = (currentWheelAngle % 360);
    const sliceAngleDeg = 360 / wheelItems.length;
    const winningIndex = Math.floor(((360 - (normalizedAngle % 360) + 270) % 360) / sliceAngleDeg);
    selectedWheelItem = wheelItems[winningIndex % wheelItems.length];

    audio.playFanfare();
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 35);

    const titleEl = document.getElementById('wheelResultTitle');
    const descEl = document.getElementById('wheelResultDesc');
    if (titleEl) titleEl.textContent = selectedWheelItem.text;
    if (descEl) descEl.textContent = "Yeh command Axat ko milna hi chahiye! Click button below to send on WhatsApp:";
    if (resultCard) {
      resultCard.style.display = 'block';
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 4500);
}

function spinAgain() {
  const resultCard = document.getElementById('wheelResultCard');
  if (resultCard) resultCard.style.display = 'none';
  spinWheel();
}

function sendWheelResultWhatsApp() {
  if (!selectedWheelItem) return;
  audio.playPop();
  openWhatsApp(selectedWheelItem.msg);
}


// ==========================================================================
// 13. PAMPER HUB: AXAT'S 7 SACRED VOWS
// ==========================================================================
let sealedVows = {};

function sealVow(num) {
  audio.playPop();
  sealedVows[num] = true;

  const card = document.getElementById(`vow-${num}`);
  const status = document.getElementById(`vow-status-${num}`);

  if (card) card.classList.add('sealed');
  if (status) status.textContent = 'Vow Sealed Forever! ❤️';

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 18);

  const countEl = document.getElementById('sealedVowsCount');
  const totalSealed = Object.keys(sealedVows).length;
  if (countEl) countEl.textContent = totalSealed;

  try {
    localStorage.setItem('sealed_vows', JSON.stringify(sealedVows));
  } catch(e) {}
}

function shareVowsOnWhatsApp() {
  audio.playFanfare();
  const msg = `Axat mere pyare husband! 💍💖\n\nMaine humari 3rd Anniversary par aapke diye hue SAARE 7 SACRED VOWS accept kar liye hain:\n\n1. Smile ki hifazat ❤️\n2. Pehle manane aap aayenge 🙈\n3. Lifetime Princess Treatment 👑\n4. Hamesha Best Friends 🤝\n5. Midnight Cravings Doctor 🍦\n6. Gulabjamun & Kajukatli Care 🍯\n7. Agle 7 Janam Tak Sirf Axat ♾️\n\nHappy 3rd Anniversary! Rab ne banayi humari jodi! 🥰`;
  openWhatsApp(msg);
}

// Restore sealed vows
window.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('sealed_vows');
    if (saved) {
      sealedVows = JSON.parse(saved);
      Object.keys(sealedVows).forEach(num => {
        const card = document.getElementById(`vow-${num}`);
        const status = document.getElementById(`vow-status-${num}`);
        if (card) card.classList.add('sealed');
        if (status) status.textContent = 'Vow Sealed Forever! ❤️';
      });
      const countEl = document.getElementById('sealedVowsCount');
      if (countEl) countEl.textContent = Object.keys(sealedVows).length;
    }
  } catch(e) {}
});


// ==========================================================================
// 14. PAMPER HUB: ROMANTIC LOVE QUIZ ENGINE
// ==========================================================================
const quizQuestions = [
  {
    q: "Axat ne sabse pehle message kahan dekh kar kiya tha?",
    options: [
      "Random search karke",
      "Suggestions me pyari profile dikhi, sharam me girl ID se msg kiya! 🙈",
      "Kahin aur se"
    ],
    correct: 1
  },
  {
    q: "Axat wifiji ko pyar se konsi mithi sweets bulata hai?",
    options: [
      "Rasgulla & Jalebi",
      "Mera Gulabjamun & Meri Kajukatli! 🍯🍬",
      "Chocolate bar"
    ],
    correct: 1
  },
  {
    q: "Agar wifiji kabhi ruth jayein toh Axat ka pehla farz kya hai?",
    options: [
      "Sorry bolkar tight hug dena aur turant manana! 🥰",
      "Wait karna",
      "Baat na karna"
    ],
    correct: 0
  },
  {
    q: "Axat aur Wifiji ka ye pyara rishta kab tak chalega?",
    options: [
      "Sirf 3 saal",
      "Sirf is janam tak",
      "Aane wale poore 7 janam aur infinity tak! ♾️💍"
    ],
    correct: 2
  }
];

let currentQuizIdx = 0;
let quizScore = 0;

function loadQuizQuestion() {
  const qBox = document.getElementById('quizQuestionBox');
  const rBox = document.getElementById('quizResultBox');
  const progEl = document.getElementById('quizProgress');
  const qTitle = document.getElementById('quizQuestion');
  const optList = document.getElementById('quizOptions');

  if (!qBox || !qTitle || !optList) return;

  if (currentQuizIdx >= quizQuestions.length) {
    qBox.style.display = 'none';
    if (rBox) rBox.style.display = 'block';
    audio.playFanfare();
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 40);
    return;
  }

  const currentQ = quizQuestions[currentQuizIdx];
  if (progEl) progEl.textContent = `Question ${currentQuizIdx + 1} of ${quizQuestions.length}`;
  qTitle.textContent = currentQ.q;
  optList.innerHTML = '';

  currentQ.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => handleQuizAnswer(idx, btn);
    optList.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIdx, btnEl) {
  const currentQ = quizQuestions[currentQuizIdx];
  audio.playPop();

  if (selectedIdx === currentQ.correct) {
    btnEl.classList.add('correct');
    quizScore += 25;
  } else {
    btnEl.classList.add('correct');
  }

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 15);

  setTimeout(() => {
    currentQuizIdx++;
    loadQuizQuestion();
  }, 800);
}

function shareQuizWhatsApp() {
  audio.playFanfare();
  const msg = `🏆 Hii Axat ji! 💖\n\nMaine humara Anniversary Love Quiz solve kiya aur mera score aaya hai 100/100 PERFECT MATCH! 💯🥰\n\nRab ne sach me humari jodi 7 janam ke liye hi banayi hai! Happy 3rd Anniversary! 💍✨`;
  openWhatsApp(msg);
}

if (document.getElementById('quizQuestionBox')) {
  loadQuizQuestion();
}
