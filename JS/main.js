const menuButton = document.querySelector('#menu-button');
const menuPanel = document.querySelector('#menu-panel');
const progressBar = document.querySelector('#page-progress');
const clock = document.querySelector('#clock');
const cursorGlow = document.querySelector('#cursor-glow');
const heroSpotlight = document.querySelector('#hero-spotlight');
const hero = document.querySelector('.hero');
const siteHeader = document.querySelector('#site-header');
const heroImage = document.querySelector('.hero-image');
const heroContent = document.querySelector('.hero-content');

function toggleMenu() {
  const isOpen = menuPanel.classList.toggle('open');
  menuPanel.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuButton.addEventListener('click', toggleMenu);
menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', toggleMenu));

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
}

function updateProgress() {
  const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${availableScroll ? (window.scrollY / availableScroll) * 100 : 0}%`;
  siteHeader.classList.toggle('scrolled', window.scrollY > 70);
  if (window.innerWidth > 760 && window.scrollY < window.innerHeight) {
    heroImage.style.transform = `scale(1.07) translateY(${window.scrollY * 0.08}px)`;
    heroContent.style.transform = `translateY(calc(-42% + ${window.scrollY * 0.12}px))`;
  }
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('pointermove', (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorGlow.style.opacity = '1';
});

hero.addEventListener('pointermove', (event) => {
  const bounds = hero.getBoundingClientRect();
  const horizontal = ((event.clientX - bounds.left) / bounds.width) * 100;
  const vertical = ((event.clientY - bounds.top) / bounds.height) * 100;
  heroSpotlight.style.setProperty('--spot-x', `${horizontal}%`);
  heroSpotlight.style.setProperty('--spot-y', `${vertical}%`);
});

const revealedItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.2 });

revealedItems.forEach((item) => revealObserver.observe(item));
updateClock();
setInterval(updateClock, 1000);
updateProgress();
lucide.createIcons({ strokeWidth: 1.5 });
