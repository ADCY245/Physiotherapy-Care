import { practice, conditions, faqs, process, reasons, treatments } from './data.js';

const iconSvgs = {
  back: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 11v12c0 8 5 14 13 14s11-5 11-13V12"/><path d="M12 17h8M28 17h8M13 28h8M27 28h8"/></svg>',
  sport: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="8" r="4"/><path d="M18 18l6-5 7 6M24 14v11l-7 9M24 25l9 7M17 35l-4 7M33 32l4 8"/></svg>',
  joint: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 9c7 0 10 5 10 12v6c0 7 3 12 10 12"/><path d="M34 9c-7 0-10 5-10 12M14 39c7 0 10-5 10-12"/></svg>',
  rehab: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="9" r="4"/><path d="M24 13v12m0-6-10 7m10-7 10 7M24 25l-7 12m7-12 8 12M10 18h28"/></svg>',
  muscle: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 36c-3-6 0-12 5-15l4-9 5 2-2 8c5 2 8 6 7 12-1 6-6 8-12 7-4 0-6-2-7-5Z"/><path d="M19 30c3 2 7 2 11 0"/></svg>',
  posture: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="25" cy="8" r="4"/><path d="M25 13v13l-6 9M25 26l9 9M25 17l-9 5M18 40h16"/></svg>',
  mobility: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 24c0-7 5-12 11-12s11 5 11 12-5 12-11 12-11-5-11-12Z"/><path d="M24 12v24M13 24h22"/></svg>',
  strength: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 18v12M15 14v20M20 19v10M28 19v10M33 14v20M38 18v12M15 24h18"/></svg>'
};

const heroImage = document.querySelector('.hero-image-wrap img');
if (heroImage && practice.images.hero) heroImage.src = practice.images.hero;
document.querySelectorAll('.brand-logo').forEach((image) => { if (practice.images.logo) image.src = practice.images.logo; });
document.querySelectorAll('.brand-lockup').forEach((image) => { if (practice.images.headerBranding) image.src = practice.images.headerBranding; });
document.querySelectorAll('.footer-professional img').forEach((image) => { if (practice.images.professionalCard) image.src = practice.images.professionalCard; });
if (practice.images.pageBackground) document.documentElement.style.setProperty('--page-background-image', `url("${practice.images.pageBackground}")`);

const treatmentGrid = document.querySelector('#treatment-grid');
const conditionList = document.querySelector('#condition-list');
const processGrid = document.querySelector('#process-grid');
const whyGrid = document.querySelector('#why-grid');
const faqList = document.querySelector('#faq-list');

if (treatmentGrid) {
  treatmentGrid.innerHTML = treatments.map((item) => `
    <article class="treatment-card reveal">
      <div class="card-top"><span class="card-number">${item.number}</span><span class="treatment-icon">${iconSvgs[item.icon]}</span></div>
      <h3>${item.title}</h3><p>${item.description}</p>
      <a href="#contact" class="card-link">Learn more <span aria-hidden="true">↗</span></a>
    </article>`).join('');
}

if (conditionList) {
  conditionList.innerHTML = conditions.map((condition, index) => `<a href="#contact" class="condition-item reveal" style="--item-index:${index}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${condition}</strong><b aria-hidden="true">↗</b></a>`).join('');
}

if (processGrid) {
  processGrid.innerHTML = process.map((item, index) => `<article class="process-step reveal" style="--item-index:${index}"><div class="process-top"><span>${item.number}</span>${index < process.length - 1 ? '<i aria-hidden="true"></i>' : ''}</div><h3>${item.title}</h3><p>${item.description}</p></article>`).join('');
}

if (whyGrid) {
  whyGrid.innerHTML = reasons.map((item) => `<article class="why-card reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join('');
}

if (faqList) {
  faqList.innerHTML = faqs.map((item, index) => `<div class="faq-item reveal"><button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}"><span>${item.question}</span><i aria-hidden="true">+</i></button><div class="faq-answer" id="faq-answer-${index}" role="region"><p>${item.answer}</p></div></div>`).join('');
}

const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
if (mobileNav) mobileNav.inert = true;

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileNav?.setAttribute('aria-hidden', String(open));
  mobileNav?.classList.toggle('is-open', !open);
  if (mobileNav) mobileNav.inert = open;
  document.body.classList.toggle('menu-open', !open);
});

document.querySelectorAll('.mobile-nav a, .mobile-nav .js-open-appointment').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    mobileNav?.setAttribute('aria-hidden', 'true');
    mobileNav?.classList.remove('is-open');
    if (mobileNav) mobileNav.inert = true;
    document.body.classList.remove('menu-open');
  });
});

const appointmentModal = document.querySelector('#appointment-modal');
const bioModal = document.querySelector('#bio-modal');
const appointmentForm = document.querySelector('#appointment-form');
const successMessage = document.querySelector('#form-success');
let lastFocused;

const openModal = (modal) => {
  if (!modal) return;
  if (modal === appointmentModal && appointmentForm) {
    appointmentForm.hidden = false;
    appointmentForm.closest('.modal')?.classList.remove('has-success');
    if (successMessage) successMessage.hidden = true;
  }
  lastFocused = document.activeElement;
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(() => modal.querySelector('input, button, a')?.focus(), 50);
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal-backdrop.is-visible')) document.body.classList.remove('modal-open');
  lastFocused?.focus?.();
};

document.querySelectorAll('.js-open-appointment').forEach((button) => button.addEventListener('click', () => openModal(appointmentModal)));
document.querySelectorAll('.js-open-bio').forEach((button) => button.addEventListener('click', () => openModal(bioModal)));
document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(backdrop); }));
document.querySelector('.modal-done')?.addEventListener('click', () => closeModal(appointmentModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop.is-visible').forEach(closeModal); });

document.querySelectorAll('.faq-question').forEach((button) => button.addEventListener('click', () => {
  const item = button.closest('.faq-item');
  const isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
    openItem.classList.remove('is-open');
    openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
  }
}));

const dateInput = appointmentForm?.querySelector('input[name="date"]');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

const setFieldError = (field, message = '') => {
  const error = field.closest('label')?.querySelector('.field-error');
  field.closest('label')?.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message;
};

appointmentForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...appointmentForm.querySelectorAll('input[required], select[required]')];
  let valid = true;
  fields.forEach((field) => {
    let message = '';
    if (!field.value.trim()) message = 'Please complete this field.';
    else if (field.type === 'tel' && !field.checkValidity()) message = 'Please enter a valid phone number.';
    else if (field.type === 'date' && field.value < dateInput.min) message = 'Please choose a future date.';
    setFieldError(field, message);
    if (message) valid = false;
  });
  const email = appointmentForm.querySelector('input[type="email"]');
  if (email.value && !email.checkValidity()) { setFieldError(email, 'Please enter a valid email.'); valid = false; }
  if (!valid) return;
  appointmentForm.hidden = true;
  appointmentForm.closest('.modal')?.classList.add('has-success');
  successMessage.hidden = false;
});

appointmentForm?.querySelectorAll('input, select, textarea').forEach((field) => field.addEventListener('input', () => setFieldError(field)));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));

document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .nav-link').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('is-active'));
  document.querySelectorAll(`.nav-link[href="${link.getAttribute('href')}"]`).forEach((item) => item.classList.add('is-active'));
}));
