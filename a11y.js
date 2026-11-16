(function () {
  var root = document.documentElement, KEY = 'a11y-aspire';
  var LANG = (root.lang || 'he').slice(0, 2);
  var STR = {
    he: {
      menu: 'תפריט נגישות',
      contrast: 'ניגודיות גבוהה',
      mono: 'שחור לבן',
      links: 'הדגשת קישורים',
      font: 'גופן קריא',
      inc: 'הגדלת גופן',
      dec: 'הקטנת גופן',
      reset: 'איפוס הגדרות',
      close: 'סגירה',
      stmt: 'הצהרת נגישות'
    },
    en: {
      menu: 'Accessibility menu',
      contrast: 'High contrast',
      mono: 'Monochrome',
      links: 'Highlight links',
      font: 'Readable font',
      inc: 'Increase text size',
      dec: 'Decrease text size',
      reset: 'Reset settings',
      close: 'Close',
      stmt: 'Accessibility statement'
    }
  };
  var t = STR[LANG] || STR.he;
  var st = { size: 0, mono: false, contrast: false, links: false, font: false };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  function apply() {
    root.style.fontSize = (100 + st.size * 12.5) + '%';
    root.classList.toggle('a11y-mono', st.mono);
    root.classList.toggle('a11y-contrast', st.contrast);
    root.classList.toggle('a11y-links', st.links);
    root.classList.toggle('a11y-font', st.font);
    document.querySelectorAll('[data-a11y]').forEach(function (b) {
      var k = b.getAttribute('data-a11y');
      if (k in st && typeof st[k] === 'boolean') b.setAttribute('aria-pressed', String(st[k]));
    });
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
  }
  var btn = document.createElement('button');
  btn.className = 'a11y-btn'; btn.type = 'button';
  btn.setAttribute('aria-label', t.menu); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'a11y-panel');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 6.5v2l-5 .8V22h-2v-6h-2v6H9V11.3l-5-.8v-2l8 1.2 8-1.2z"/></svg>';
  var p = document.createElement('div');
  p.id = 'a11y-panel'; p.className = 'a11y-panel'; p.hidden = true;
  p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', t.menu);
  p.innerHTML = '<h2>' + t.menu + '</h2><div class="a11y-grid">' +
    '<button type="button" data-a11y="contrast" aria-pressed="false">' + t.contrast + '</button>' +
    '<button type="button" data-a11y="mono" aria-pressed="false">' + t.mono + '</button>' +
    '<button type="button" data-a11y="links" aria-pressed="false">' + t.links + '</button>' +
    '<button type="button" data-a11y="font" aria-pressed="false">' + t.font + '</button>' +
    '<button type="button" data-act="inc">' + t.inc + '</button>' +
    '<button type="button" data-act="dec">' + t.dec + '</button>' +
    '<button type="button" data-act="reset">' + t.reset + '</button>' +
    '<button type="button" data-act="close">' + t.close + '</button></div>' +
    '<a href="accessibility.html">' + t.stmt + '</a>';
  document.body.appendChild(p); document.body.appendChild(btn);
  function toggle(open) {
    p.hidden = !open; btn.setAttribute('aria-expanded', String(open));
    if (open) p.querySelector('button').focus(); else btn.focus();
  }
  btn.addEventListener('click', function () { toggle(p.hidden); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !p.hidden) toggle(false); });
  p.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var k = b.getAttribute('data-a11y'), a = b.getAttribute('data-act');
    if (k) st[k] = !st[k];
    if (a === 'inc') st.size = Math.min(4, st.size + 1);
    if (a === 'dec') st.size = Math.max(-1, st.size - 1);
    if (a === 'reset') st = { size: 0, mono: false, contrast: false, links: false, font: false };
    if (a === 'close') { toggle(false); return; }
    apply();
  });
  apply();
})();
