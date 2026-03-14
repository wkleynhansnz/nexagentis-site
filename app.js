/* ============================================================
   NEXAGENTIS — App JavaScript
   Theme toggle, mobile menu, scroll behaviors, animations
   ============================================================ */

(function () {
  'use strict';

  // ========== THEME TOGGLE ==========
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const root = document.documentElement;
  // Dark mode first — default to dark regardless of system preference
  let currentTheme = root.getAttribute('data-theme') || 'dark';

  // Set initial theme
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcons();

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcons();
    });
  });

  function updateToggleIcons() {
    var sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    var moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    toggles.forEach(function (toggle) {
      toggle.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;
      toggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
    });
  }

  // ========== MOBILE MENU ==========
  var mobileToggle = document.getElementById('mobileToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      var isActive = mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', isActive ? 'Close navigation menu' : 'Open navigation menu');
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== HEADER SCROLL STATE ==========
  var header = document.getElementById('header');
  var lastScrollY = 0;

  if (header) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScrollY = scrollY;
    }, { passive: true });
  }

  // ========== SCROLL REVEAL (IntersectionObserver) ==========
  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();