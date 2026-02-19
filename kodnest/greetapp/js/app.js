(function () {
  'use strict';

  const ANIMATION_TYPES = ['confetti', 'partyPopper', 'glowingBurst'];
  const CONFETTI_COUNT = 80;
  const CONFETTI_DURATION_MS = 2500;
  const POPPER_STREAMERS = 40;
  const POPPER_DURATION_MS = 2200;
  const BURST_DURATION_MS = 1800;

  const container = document.getElementById('animation-container');
  const form = document.getElementById('greet-form');
  const nameInput = document.getElementById('name-input');
  const greetingMessage = document.getElementById('greeting-message');

  function clearAnimations() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function pickRandomAnimation() {
    return ANIMATION_TYPES[Math.floor(Math.random() * ANIMATION_TYPES.length)];
  }

  function runConfetti() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const colors = ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6'];
    const pieces = [];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      pieces.push({
        x: randomBetween(0, width),
        y: randomBetween(-height * 0.2, height * 0.3),
        w: randomBetween(4, 10),
        h: randomBetween(4, 8),
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: randomBetween(-2, 2),
        vy: randomBetween(4, 12),
        rotation: randomBetween(0, 360),
        rotationSpeed: randomBetween(-0.2, 0.2),
      });
    }

    let start = null;
    function frame(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed > CONFETTI_DURATION_MS) {
        clearAnimations();
        return;
      }
      ctx.clearRect(0, 0, width, height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function runPartyPopper() {
    const colors = ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 - 80;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes popper-out {
        0% { transform: rotate(var(--r, 0deg)) scaleY(0); opacity: 1; }
        15% { transform: rotate(var(--r, 0deg)) scaleY(1); opacity: 1; }
        100% { transform: rotate(var(--r, 0deg)) scaleY(1) translateY(80px); opacity: 0; }
      }
    `;
    container.appendChild(style);

    for (let i = 0; i < POPPER_STREAMERS; i++) {
      const angleDeg = (i / POPPER_STREAMERS) * 360 + randomBetween(0, 18);
      const el = document.createElement('div');
      el.className = 'particle popper-streamer';
      el.style.cssText = `
        --r: ${angleDeg}deg;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: ${randomBetween(40, 120)}px;
        background: linear-gradient(180deg, ${colors[i % colors.length]}, transparent);
        transform-origin: center bottom;
        transform: rotate(var(--r, 0deg)) scaleY(0);
        animation: popper-out ${POPPER_DURATION_MS}ms ease-out forwards;
      `;
      container.appendChild(el);
    }

    setTimeout(() => clearAnimations(), POPPER_DURATION_MS + 100);
  }

  function runGlowingBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.8;
    const circle = document.createElement('div');
    circle.className = 'burst-circle';
    circle.setAttribute('aria-hidden', 'true');
    circle.style.cssText = `
      left: ${centerX}px;
      top: ${centerY}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(124, 58, 237, 0.6) 0%,
        rgba(236, 72, 153, 0.3) 40%,
        rgba(245, 158, 11, 0.15) 70%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
      animation: burst-expand ${BURST_DURATION_MS}ms ease-out forwards;
    `;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes burst-expand {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: ${maxRadius * 2}px; height: ${maxRadius * 2}px; opacity: 0; }
      }
    `;
    container.appendChild(style);
    container.appendChild(circle);
    setTimeout(() => clearAnimations(), BURST_DURATION_MS + 100);
  }

  function triggerRandomAnimation() {
    clearAnimations();
    const type = pickRandomAnimation();
    if (type === 'confetti') runConfetti();
    else if (type === 'partyPopper') runPartyPopper();
    else runGlowingBurst();
  }

  function showGreeting(name) {
    const trimmed = (name || '').trim();
    greetingMessage.textContent = trimmed ? `Hello ${trimmed}` : 'Hello';
    greetingMessage.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value;
    showGreeting(name);
    triggerRandomAnimation();
  });

  window.addEventListener('resize', function () {
    if (container.querySelector('canvas')) {
      const c = container.querySelector('canvas');
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
  });
})();
