/**
 * main.js — Shirel Dahan Portfolio
 *
 * Minimal JavaScript — only what CSS cannot do alone:
 *   1. Nav: becomes opaque + bordered when user scrolls down
 *   2. Nav: mobile hamburger menu toggle
 *   3. Scroll animations: fade-in elements as they enter the viewport
 *
 * No frameworks, no dependencies — just plain browser JavaScript.
 */


/* ──────────────────────────────────────────────────────────────
   1. NAV SCROLL BEHAVIOR
   When the user scrolls past 50px, add .nav--scrolled to the
   nav element. CSS uses this class to add a background + blur.
────────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');

function handleNavScroll() {
  // Add class when scrolled past 50px, remove when back at top
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}

// Run on page load (in case user refreshes mid-page)
handleNavScroll();

// Run whenever the user scrolls
window.addEventListener('scroll', handleNavScroll, { passive: true });


/* ──────────────────────────────────────────────────────────────
   2. MOBILE HAMBURGER MENU
   Toggle the nav links list open/closed on small screens.
   CSS hides the links by default on mobile; we add a class
   to show them when the button is clicked.
────────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    // Check current state
    const isOpen = navLinks.classList.contains('nav__links--open');

    // Toggle the menu
    navLinks.classList.toggle('nav__links--open');

    // Update aria-expanded for accessibility
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close menu when a link is clicked (useful on mobile — navigates to new page)
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ──────────────────────────────────────────────────────────────
   3. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Uses the Intersection Observer API — a modern, efficient way
   to detect when elements enter the viewport.

   Elements with the class .fade-in start invisible (set in CSS).
   When they scroll into view, we add .is-visible, which CSS
   transitions to fully visible.
────────────────────────────────────────────────────────────── */

// IntersectionObserver calls our function whenever a watched element
// enters or exits the viewport.
const fadeObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Element is in view — reveal it
        entry.target.classList.add('is-visible');

        // Stop watching this element once it has appeared
        // (no need to hide it again when scrolling back up)
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    // Start the animation when the element is 10% visible
    threshold: 0.1,
    // Start slightly before the element reaches the viewport edge
    rootMargin: '0px 0px -40px 0px',
  }
);

// Watch every element with the .fade-in class
document.querySelectorAll('.fade-in').forEach(function (el) {
  fadeObserver.observe(el);
});


/* ──────────────────────────────────────────────────────────────
   4. SMOOTH ACTIVE NAV LINK (already handled by Flask/Jinja,
   but this ensures the correct link is highlighted even on
   same-page anchors or after client-side navigation).
────────────────────────────────────────────────────────────── */
// The active class is set server-side by Flask (see base.html),
// so no extra JS needed here. This section is intentionally empty.
