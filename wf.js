/* Oriole Webflow site JS — served via GitHub Pages (bertiebottslindal.github.io/oriole/wf.js).
   Loaded as a Webflow registered hosted script. Do not delete — load-bearing for the Webflow site. */
(function () {
  // ---- mobile hamburger ----
  document.addEventListener('click', function (e) {
    var hb = e.target.closest('.on-hb');
    if (hb) {
      var h = hb.closest('header');
      var m = h ? h.querySelector('.on-mnav') : document.querySelector('.on-mnav');
      if (m) m.classList.toggle('on-mnav-open');
      return;
    }
    var a = e.target.closest('.on-mnav-a');
    if (a) {
      var mm = a.closest('.on-mnav');
      if (mm) mm.classList.remove('on-mnav-open');
    }
  });

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // ---- real placeholders (Webflow forces "Example text") ----
    var ph = {
      'First-Name': 'First name', 'Last-Name': 'Last name',
      'Email': 'you@email.com', 'Phone': '(416) 000-0000'
    };
    document.querySelectorAll('.on-form input').forEach(function (el) {
      var key = (el.name || '').replace(/ /g, '-');
      if (ph[key]) el.placeholder = ph[key];
      else if (el.placeholder === 'Example text') el.placeholder = '';
    });
    document.querySelectorAll('input[placeholder="Example text"], textarea[placeholder="Example text"]').forEach(function (el) { el.placeholder = ''; });

    // ---- email typo auto-correction on blur ----
    var domainFixes = [
      [/\.con$/i, '.com'], [/\.cmo$/i, '.com'], [/\.ocm$/i, '.com'], [/\.comm$/i, '.com'],
      [/\.c0m$/i, '.com'], [/\.vom$/i, '.com'], [/\.cim$/i, '.com'],
      [/@gamil\./i, '@gmail.'], [/@gmial\./i, '@gmail.'], [/@gnail\./i, '@gmail.'], [/@gmai\./i, '@gmail.'],
      [/@hotmial\./i, '@hotmail.'], [/@hotmai\./i, '@hotmail.'], [/@yaho\./i, '@yahoo.'], [/@outlok\./i, '@outlook.']
    ];
    document.addEventListener('blur', function (e) {
      var el = e.target;
      if (!el || el.type !== 'email' || !el.value) return;
      var v = el.value.trim(), was = v;
      domainFixes.forEach(function (f) { v = v.replace(f[0], f[1]); });
      if (v !== was) el.value = v;
    }, true);

    // ---- validation: block submit without valid email + phone ----
    var emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    function err(el, msg) {
      el.style.borderColor = '#C8744E';
      var n = el.parentNode.querySelector('.on-ferr');
      if (!n) {
        n = document.createElement('div');
        n.className = 'on-ferr';
        n.style.cssText = 'color:#C8744E;font-size:.8rem;font-weight:600;margin-top:4px;font-family:Inter,Arial,sans-serif';
        el.parentNode.appendChild(n);
      }
      n.textContent = msg;
    }
    function clearErr(el) {
      el.style.borderColor = '';
      var n = el.parentNode.querySelector('.on-ferr');
      if (n) n.remove();
    }
    document.querySelectorAll('.on-form form, form.on-form').forEach(function (f) {
      f.setAttribute('novalidate', 'novalidate');
    });
    document.addEventListener('submit', function (e) {
      var f = e.target.closest ? e.target : null;
      if (!f || !(f.closest('.on-form'))) return;
      {
        var ok = true;
        f.querySelectorAll('input,select').forEach(function (el) {
          if (el.type === 'submit') return;
          clearErr(el);
          var v = (el.value || '').trim();
          if (el.required && !v) { err(el, 'This field is required'); ok = false; return; }
          if (el.type === 'email' && v && !emailRe.test(v)) { err(el, 'Please enter a valid email address'); ok = false; }
          if (el.type === 'tel' && v) {
            var digits = v.replace(/\D/g, '');
            if (digits.length < 10 || digits.length > 11) { err(el, 'Please enter a valid phone number'); ok = false; }
          }
        });
        e.preventDefault(); e.stopImmediatePropagation();
        if (!ok) return;
        // Submit directly to the Webflow forms API (runtime handler is unreliable
        // on these forms). response.ok checked; one retry; honest failure message.
        var w = f.closest('.w-form') || f.parentNode;
        var btn = f.querySelector('input[type="submit"]');
        var orig = btn ? btn.value : '';
        if (btn) { btn.value = btn.getAttribute('data-wait') || 'Please wait...'; btn.disabled = true; }
        var fd = new URLSearchParams();
        fd.append('name', f.getAttribute('data-name') || f.name || 'Form');
        fd.append('source', location.href);
        fd.append('test', 'false');
        f.querySelectorAll('input,select,textarea').forEach(function (el) {
          if (el.type === 'submit' || !el.name) return;
          fd.append('fields[' + el.name + ']', el.value);
        });
        var url = 'https://webflow.com/api/v1/form/' + document.documentElement.getAttribute('data-wf-site');
        function finish(good) {
          if (btn) { btn.value = orig; btn.disabled = false; }
          if (good) {
            f.style.display = 'none';
            var d = w.querySelector('.w-form-done');
            if (d) d.style.display = 'block';
          } else {
            var fl = w.querySelector('.w-form-fail');
            if (fl) {
              fl.style.display = 'block';
              fl.textContent = "Something went wrong sending your message. Please email info@oriolenurseryschool.com or call 416 960 1293 and we'll get right back to you.";
            }
          }
        }
        function post() {
          return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: fd.toString() });
        }
        post().then(function (r) {
          if (r.ok) return finish(true);
          throw new Error('bad status');
        }).catch(function () {
          setTimeout(function () {
            post().then(function (r) { finish(r.ok); }).catch(function () { finish(false); });
          }, 800);
        });
      }
    }, true);

    // Turnstile fallback: Webflow's runtime sometimes never initializes bot
    // protection on these forms, leaving them locked. After 4s, unlock.
    setTimeout(function () {
      document.querySelectorAll('.on-form.w-form-loading').forEach(function (w) {
        w.classList.remove('w-form-loading');
        var frm = w.querySelector('form');
        if (frm) frm.removeAttribute('data-turnstile-sitekey');
        w.querySelectorAll('input[type="submit"]').forEach(function (b) {
          b.disabled = false;
          b.classList.remove('w-form-loading');
        });
      });
    }, 4000);

    // ---- testimonial rotator ----
    var slides = document.querySelectorAll('.on-tsl');
    if (slides.length > 1) {
      var dots = document.querySelectorAll('.on-tdot');
      var i = 0, timer;
      function go(n) {
        slides[i].classList.remove('on-tsl-on');
        if (dots[i]) dots[i].classList.remove('on-tdot-on');
        i = n % slides.length;
        slides[i].classList.add('on-tsl-on');
        if (dots[i]) dots[i].classList.add('on-tdot-on');
      }
      function auto() { timer = setInterval(function () { go(i + 1); }, 5000); }
      dots.forEach(function (d, n) {
        d.addEventListener('click', function () { clearInterval(timer); go(n); auto(); });
      });
      auto();
    }
  });
})();
