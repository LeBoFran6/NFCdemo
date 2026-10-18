/* =========================================================
   Tapwave — comportements
   Modules indépendants, sans dépendance.
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. En-tête collant + menu mobile ---------- */
  function initHead() {
    var head   = $('[data-nav]');
    var burger = $('[data-burger]');
    var menu   = $('#menu');
    if (!head) return;

    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!burger || !menu) return;

    var setOpen = function (open) {
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) setOpen(false);
    });
  }

  /* ---------- 2. Apparition au défilement ---------- */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (calm || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .1 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. Simulateur de destination ---------- */
  function initSimulator() {
    var buttons = $$('[data-scene-btn]');
    var scenes  = $$('[data-scene]');
    if (!buttons.length || !scenes.length) return;

    var show = function (name) {
      buttons.forEach(function (b) {
        var on = b.dataset.sceneBtn === name;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      scenes.forEach(function (s) {
        s.classList.toggle('is-on', s.dataset.scene === name);
      });
    };

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { show(b.dataset.sceneBtn); });
    });

    // Balayage tactile sur le téléphone.
    var screen = $('.phone__screen');
    if (!screen) return;
    var x0 = null;
    screen.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    screen.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) {
        var i = buttons.findIndex(function (b) { return b.classList.contains('is-on'); });
        show(buttons[(i + (dx < 0 ? 1 : buttons.length - 1)) % buttons.length].dataset.sceneBtn);
      }
      x0 = null;
    });
  }

  /* ---------- 4. Accordéon ---------- */
  function initAccordion() {
    var acc = $('[data-acc]');
    if (!acc) return;

    $$('.acc__item', acc).forEach(function (item) {
      var btn = $('.acc__btn', item);
      if (!btn) return;

      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');

        $$('.acc__item', acc).forEach(function (other) {
          other.classList.remove('is-open');
          var b = $('.acc__btn', other);
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    var first = $('.acc__item', acc);
    if (first) {
      first.classList.add('is-open');
      var fb = $('.acc__btn', first);
      if (fb) fb.setAttribute('aria-expanded', 'true');
    }
  }

  /* ---------- 5. Divers ---------- */
  function initMisc() {
    var year = $('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    // Défilement doux avec compensation de la hauteur de l'en-tête.
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;

        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        var h = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--head-h'), 10
        ) || 68;

        var isSkip = a.classList.contains('skip-link');
        var top = target.getBoundingClientRect().top + window.scrollY - (isSkip ? 0 : h + 20);

        window.scrollTo({ top: Math.max(top, 0), behavior: calm ? 'auto' : 'smooth' });

        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });

        if (history.replaceState) history.replaceState(null, '', id);
      });
    });
  }

  /* ---------- Démarrage ---------- */
  function boot() {
    initHead();
    initReveal();
    initSimulator();
    initAccordion();
    initMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();