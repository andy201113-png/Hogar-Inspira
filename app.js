(function () {
  'use strict';

  /* ---------- MENÚ MÓVIL ---------- */
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMenu() {
    if (!mobileNav || !toggle) return;
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
  }
  function openMenu() {
    if (!mobileNav || !toggle) return;
    mobileNav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      if (mobileNav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    var links = mobileNav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  /* ---------- APARICIÓN SUAVE ---------- */
  var revealElements = document.querySelectorAll('.reveal');
  var prefiereMenosMovimiento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length && 'IntersectionObserver' in window && !prefiereMenosMovimiento) {
    document.body.classList.add('reveal-ready');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < revealElements.length; j++) {
      observer.observe(revealElements[j]);
    }
  }
})();