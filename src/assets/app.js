(function () {
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // remember chosen language so the root page redirects correctly next time
  try { localStorage.setItem('lang', root.lang); } catch (e) {}

  // mobile menu
  var mt = $('[data-menu-toggle]');
  if (mt) mt.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    mt.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // docs sidebar (mobile) + filter
  var st = $('[data-side-toggle]');
  if (st) st.addEventListener('click', function () { $('#docs-side').classList.toggle('open'); });
  var filter = $('[data-filter]');
  if (filter) filter.addEventListener('input', function () {
    var q = filter.value.trim().toLowerCase();
    $$('.side-link[data-name]').forEach(function (a) {
      a.style.display = !q || a.getAttribute('data-name').indexOf(q) > -1 ? '' : 'none';
    });
  });

  // table-of-contents scroll spy
  var links = $$('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('on'); });
          if (map[e.target.id]) map[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  // contact form -> opens the visitor's email app (no backend needed)
  var form = $('[data-contact-form]');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var body = ['Name: ' + d.get('name'), 'Email: ' + d.get('email'), 'Company: ' + (d.get('company') || '-'),
      'Interest: ' + d.get('interest'), '', d.get('message')].join('\n');
    var subj = form.getAttribute('data-subject') || 'Website enquiry';
    location.href = form.getAttribute('data-to') + '?subject=' + encodeURIComponent(subj + ' — ' + d.get('interest')) +
      '&body=' + encodeURIComponent(body);
  });
})();
