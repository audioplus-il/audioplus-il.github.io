/* d4: fixed top strip behavior (from d3) */
(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'he';

  var nav = document.querySelector('.d-nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.d-nav-burger');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? (lang === 'en' ? 'Close menu' : 'סגירת תפריט') : (lang === 'en' ? 'Open menu' : 'פתיחת תפריט'));
    });
    nav.querySelectorAll('.d-nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
