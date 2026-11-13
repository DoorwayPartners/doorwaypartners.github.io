/* Doorway Partners site nav. The drawer also opens via a checkbox
   (:has(#nav-open:checked)) so the menu works without JavaScript. */
(function () {
  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('nav-open');
  var label = document.querySelector('label.nav-toggle');
  if (!nav || !toggle) return;

  function sync() {
    var open = toggle.checked;
    nav.classList.toggle('open', open);
    if (label) label.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('change', sync);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !toggle.checked) return;
    toggle.checked = false;
    sync();
    if (label) label.focus();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && toggle.checked) {
      toggle.checked = false;
      sync();
    }
  });
})();
