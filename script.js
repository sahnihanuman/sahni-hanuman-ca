/* ═══════════════════════════════════════════════════════
   M/s. Sahni Hanuman & Associates — Main Script
═══════════════════════════════════════════════════════ */

/* ── Scroll Reveal ────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Nav Shrink on Scroll ─────────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ── Hamburger Menu ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  window.addEventListener('scroll', () => {
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
  }, { passive: true });
}

function closeMobileMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

/* ── Smooth anchor close on mobile menu click ─────────── */
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ── Active nav link on scroll ───────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#c8521a';
    }
  });
}, { passive: true });

/* ── Counter animation for stat numbers ──────────────── */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const isNum = /^\d+$/.test(target);
  if (!isNum) return;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * parseInt(target));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = el.dataset.count;
      if (val) animateCounter(el, val);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── Ripple effect on buttons ─────────────────────────── */
document.querySelectorAll('.btn-primary, .submit-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:10px; height:10px;
      background:rgba(255,255,255,0.4);
      top:${e.clientY - rect.top - 5}px;
      left:${e.clientX - rect.left - 5}px;
      transform:scale(0); opacity:1;
      transition:transform 0.6s ease, opacity 0.6s ease;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(30)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── Contact form toast ───────────────────────────────── */
window.submitForm = function() {
  const btn = document.querySelector('.submit-btn');
  if (btn) {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2d9b4e, #1e7a3a)';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  }
};

/* ── Parallax on hero ::before orb ───────────────────── */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
  }
}, { passive: true });
