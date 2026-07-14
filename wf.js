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

  // ---- injected CSS (freeform custom code unavailable on this plan) ----
  var css = '.on-dd{position:relative}' +
    '.on-dd-t{cursor:pointer;font-family:Inter,Arial,sans-serif;font-weight:500;font-size:.92rem;color:#26271F;padding:8px 12px;border-radius:100px;transition:all .15s ease}' +
    '.on-dd:hover .on-dd-t{background:#EEF4E2;color:#46760A}' +
    '.on-ddmenu{display:none;position:absolute;top:100%;left:-10px;padding-top:12px;z-index:70;min-width:250px}' +
    '.on-dd:hover .on-ddmenu{display:block}' +
    '.on-ddmenu-in{background:#fff;border:1px solid #E7E1D3;border-radius:14px;box-shadow:0 18px 50px -28px rgba(38,39,31,.45);padding:8px;display:flex;flex-direction:column}' +
    '.on-dd-a{padding:10px 14px;border-radius:9px;font-size:.92rem;white-space:nowrap;color:#26271F;text-decoration:none;font-family:Inter,Arial,sans-serif;font-weight:500;transition:all .15s ease}' +
    '.on-dd-a:hover{background:#EEF4E2;color:#46760A}' +
    '.on-dd-s{color:#5E6157;font-weight:400}' +
    'select.on-fi{height:auto;min-height:48px;line-height:1.4;padding-top:.65rem;padding-bottom:.65rem}' +
    '.on-gbadge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.92);color:#26271F;font-family:Inter,Arial,sans-serif;font-weight:700;font-size:.85rem;padding:.45rem .9rem;border-radius:100px;margin:14px 0 6px}' +
    '.on-gbadge-s{color:#E2A93B;letter-spacing:2px}' +
    '.on-replynote{font-family:Inter,Arial,sans-serif;font-size:.8rem;color:#5E6157;margin-top:10px;text-align:center}' +
    '@media (prefers-reduced-motion: no-preference){' +
    '.on-rv{opacity:0;transform:translateY(16px);transition:opacity .55s ease,transform .55s ease}' +
    '.on-rv-in{opacity:1;transform:none}' +
    '@keyframes onpulse{0%{box-shadow:0 0 0 0 rgba(91,153,10,.45)}70%{box-shadow:0 0 0 9px rgba(91,153,10,0)}100%{box-shadow:0 0 0 0 rgba(91,153,10,0)}}' +
    '.on-xpill{animation:onpulse 2s infinite}' +
    '.on-pulse{animation:onpulse 2s infinite}' +
    '.on-card [class*=on-card-img]{transition:transform .4s ease}' +
    '.on-card:hover [class*=on-card-img]{transform:scale(1.05)}' +
    '.on4-ts [class*=tph]{transition:transform .4s ease}' +
    '.on4-ts:hover [class*=tph]{transform:scale(1.06)}' +
    '.on9-g1:hover,.on9-g2:hover,.on9-g3:hover,.on9-g4:hover,.on9-g5:hover{transform:scale(1.015)}' +
    '.on9-g1,.on9-g2,.on9-g3,.on9-g4,.on9-g5{transition:transform .3s ease}' +
    '.on-chip{transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease}' +
    '.on-chip:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 10px 22px -12px rgba(38,39,31,.4);background-color:#EEF4E2;color:#26271F}' +
    '.on4-ts{overflow:hidden}' +
    '}' +
    '.on-xpill{display:inline-block;background:#5B990A;color:#fff;font-family:Inter,Arial,sans-serif;font-weight:700;font-size:.7rem;letter-spacing:.04em;padding:2px 10px;border-radius:100px;margin:0 6px;vertical-align:2px}' +
    '.on-pulse{border-radius:100px}' +
    // media-page gallery tiles: Webflow stored a bad span-6 mobile override that collapses the 2-col mobile grid
    '@media (max-width:767px){.on19-g6,.on19-g7{grid-column:span 2 !important}}' +
    '.on19-g6,.on19-g7{transition:transform .3s ease}' +
    '.on19-g6:hover,.on19-g7:hover{transform:scale(1.015)}' +
    // footer: long unbreakable strings (email address) overflowed the grid at tablet widths → page h-scroll
    '.on-ft-grid>*{min-width:0}' +
    '.on-ft-col a,.on-ft-col div{overflow-wrap:anywhere}' +
    // testimonial prev/next arrows
    '.on-tnav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:18px}' +
    '.on-tbtn{width:40px;height:40px;border-radius:100px;border:1px solid #E7E1D3;background:#fff;color:#46760A;font-size:1.1rem;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .15s ease;padding:0}' +
    '.on-tbtn:hover{background:#EEF4E2}' +
    '.on15-wk-past{opacity:.45;pointer-events:none;cursor:default}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ---- favicon + webclip (site settings favicon is UI-only) ----
  (function () {
    var f = document.createElement('link');
    f.rel = 'icon'; f.type = 'image/png';
    f.href = 'https://cdn.prod.website-files.com/6a513665fb1af89aad18d8ac/6a517db696182a92af97688f_oriole-favicon-32.png';
    document.head.appendChild(f);
    var a = document.createElement('link');
    a.rel = 'apple-touch-icon';
    a.href = 'https://cdn.prod.website-files.com/6a513665fb1af89aad18d8ac/6a517db596182a92af97683d_oriole-favicon-256.png';
    document.head.appendChild(a);
  })();

  // ---- keep the hidden registration package out of search indexes ----
  if (location.pathname === '/registration-form') {
    var nr = document.createElement('meta');
    nr.name = 'robots'; nr.content = 'noindex, nofollow';
    document.head.appendChild(nr);
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

    // ---- select options (Webflow drops WHTML <option>s at publish) ----
    var selOpts = {
      'Child Age': ['Under 18 months (for interest)', '18 months \u2013 2.5 years', '2.6 \u2013 3 years', '3 \u2013 5 years'],
      'Child Age|Summer Camp Lead Form': ['2 years', '3 years', '4 years', '5 years'],
      'Gender': ['Prefer not to say', 'Girl', 'Boy', 'Other'],
      'Class': ['Toddler \u00b7 18 months \u2013 2.5 years', 'Junior Preschool \u00b7 2.6 \u2013 3 years', 'Senior Preschool \u00b7 3 \u2013 5 years'],
      'Schedule': ['2 mornings (Tue & Thu)', '3 mornings', '4 mornings', '5 mornings', 'Extended day \u2014 5 full days, 9:00\u20132:45 (new, ages 2.5+)'],
      'Board Interest': ['No', 'Yes', 'Tell me more'],
      'Camp Age': ['2 years', '3 years', '4 years', '5 years'],
      'New or Returning': ['New family', 'Returning family'],
      'First Dropoff': ['Yes', 'No'],
      'Toilet Trained': ['Yes', 'Mostly', 'Not yet'],
      'EpiPen': ['No', 'Yes'],
      'Child Class': ['Toddler', 'Junior Preschool', 'Senior Preschool'],
      'Duty Day Participating': ['Yes \u2014 participating', 'No \u2014 non-participating'],
      'Photo Release': ['Select an option', 'I consent to photos', 'I do not consent to photos']
    };
    document.querySelectorAll('.on-form select').forEach(function (s) {
      if (s.options.length > 0) return;
      var frm = s.closest('form');
      var fname = frm ? (frm.getAttribute('data-name') || '') : '';
      var opts = selOpts[s.name + '|' + fname] || selOpts[s.name];
      if (!opts) return;
      opts.forEach(function (o) {
        var el = document.createElement('option');
        // 'Select ...' entries are placeholders: blank value so required validation forces a real choice
        el.value = (o.indexOf('Select ') === 0) ? '' : o;
        el.textContent = o;
        s.appendChild(el);
      });
    });

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

    // ---- CRO: lead-form anchor + Book a Tour CTAs -> form ----
    var lead = document.querySelector('.on-lead');
    if (lead) lead.id = 'get-info';
    document.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('mailto:info@oriolenurseryschool.com') === 0 && /book a tour/i.test(a.textContent)) {
        a.setAttribute('href', lead ? '#get-info' : '/#get-info');
      }
    });
    if (location.hash === '#get-info' && lead) {
      setTimeout(function () { lead.scrollIntoView({ behavior: 'smooth' }); }, 300);
    }

    // ---- CRO: response-time reassurance under every form ----
    document.querySelectorAll('.on-form').forEach(function (w) {
      var n = document.createElement('div');
      n.className = 'on-replynote';
      n.textContent = 'We reply within one business day.';
      w.appendChild(n);
    });

    // ---- CRO: soften Handbook form (home): last name + phone optional ----
    if (location.pathname === '/' || location.pathname === '') {
      document.querySelectorAll('.on-form input[name="Last Name"], .on-form input[name="Phone"]').forEach(function (el) {
        el.required = false;
        var lab = el.parentNode.querySelector('label');
        if (lab) lab.textContent = lab.textContent.replace(' *', ' (optional)');
      });
    }

    // ---- CRO: Google rating badge under hero headline ----
    document.querySelectorAll('.on-hero-btns').forEach(function (btns) {
      var b = document.createElement('div');
      b.className = 'on-gbadge';
      b.innerHTML = '<span class="on-gbadge-s">\u2605\u2605\u2605\u2605\u2605</span> 5.0 on Google';
      btns.parentNode.insertBefore(b, btns);
    });

    // ---- CRO: directions line in footer Find us column ----
    document.querySelectorAll('.on-ft-col').forEach(function (col) {
      if (col.textContent.indexOf('Christ Church Deer Park') === -1) return;
      var a = document.createElement('a');
      a.className = 'on-ft-a';
      a.href = 'https://maps.google.com/?q=Oriole+Nursery+School+Toronto';
      a.target = '_blank';
      a.textContent = '2-minute walk from Yonge & St. Clair \u00b7 Directions \u2192';
      col.appendChild(a);
    });

    // ---- anchor for hero link after age-picker removal ----
    var progs = document.querySelector('.on-progs');
    if (progs) progs.id = 'classes';

    // ---- scroll-reveal (light fade-up, staggered per container) ----
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      var rvSel = '.on-card,.on-step,.on2-role,.on7-card,.on9-inccard,.on9-th,.on10-wk,.on10-fcard,.on4-ts,.on4-fxc,.on2-opt,.on2-opt-hl,.on12-q,.on9-feecard,.on4-det,.on10-callout,.on10-callout2';
      var els = Array.prototype.slice.call(document.querySelectorAll(rvSel));
      var counts = [];
      els.forEach(function (el) {
        var rec = counts.find(function (c) { return c.p === el.parentNode; });
        if (!rec) { rec = { p: el.parentNode, n: 0 }; counts.push(rec); }
        el.style.transitionDelay = Math.min(rec.n * 60, 420) + 'ms';
        rec.n++;
        el.classList.add('on-rv');
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('on-rv-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (el) { io.observe(el); });
    }

    // ---- pulsing pill on extended-day mentions ----
    document.querySelectorAll('.on-xnote').forEach(function (el) { el.classList.add('on-pulse'); });
    document.querySelectorAll('.on-trust-num').forEach(function (el) {
      if (el.textContent.trim() === 'New') {
        el.innerHTML = '<span class="on-xpill">NEW</span>';
      }
    });
    document.querySelectorAll('.on3-td-l, .on6-schedlbl').forEach(function (el) {
      if (/extended day/i.test(el.textContent)) {
        el.innerHTML = el.innerHTML
          .replace(/\s*\u00b7\s*NEW\b/, ' <span class="on-xpill">NEW</span>')
          .replace(/^New\s+(Extended Day)/, '<span class="on-xpill">NEW</span> $1');
      }
    });

    // ---- camp registration: week picker + selected-weeks sync ----
    var wks = document.querySelectorAll('.on15-wk');
    if (wks.length) {
      // Weeks that started before the current week are no longer bookable (Heather, 2026-07-14)
      var wkStarts = ['2026-06-15', '2026-06-22', '2026-06-29', '2026-07-06', '2026-07-13', '2026-07-20',
        '2026-07-27', '2026-08-03', '2026-08-10', '2026-08-17', '2026-08-24', '2026-08-31'];
      var mon = new Date();
      mon.setHours(0, 0, 0, 0);
      mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
      wks.forEach(function (w, i) {
        if (!wkStarts[i]) return;
        if (new Date(wkStarts[i] + 'T12:00:00') < mon) {
          w.classList.add('on15-wk-past');
          w.classList.remove('on15-wk-sel');
          var b = document.createElement('div');
          b.className = 'on10-hol';
          b.textContent = 'No longer available';
          w.appendChild(b);
        }
      });
      function syncWeeks() {
        var sel = [], total = 0;
        wks.forEach(function (w) {
          if (w.classList.contains('on15-wk-sel')) {
            var label = w.querySelector('.on9-thw').textContent + ' (' + w.querySelector('.on10-wkd').textContent + ')';
            sel.push(label);
            total += parseInt(w.querySelector('.on10-wkp').textContent.replace(/[^0-9]/g, ''), 10);
          }
        });
        var c = document.querySelector('.on15-count');
        var s = document.querySelector('.on15-sum');
        if (c) c.textContent = sel.length + (sel.length === 1 ? ' week' : ' weeks');
        if (s) s.textContent = '$' + total.toLocaleString();
        document.querySelectorAll('input[name="Selected Weeks"]').forEach(function (h) {
          h.value = sel.length ? sel.join('; ') + ' — total $' + total.toLocaleString() : 'none selected';
        });
      }
      wks.forEach(function (w) {
        w.addEventListener('click', function () {
          if (w.classList.contains('on15-wk-past')) return;
          w.classList.toggle('on15-wk-sel'); syncWeeks();
        });
      });
      syncWeeks();
    }

    // ---- map embed (iframes can't ship via the build API) ----
    var mapBox = document.querySelector('.on17-map');
    if (mapBox && !mapBox.querySelector('iframe')) {
      var mf = document.createElement('iframe');
      mf.src = 'https://www.google.com/maps?q=Oriole+Nursery+School,+Christ+Church+Deer+Park,+Toronto&output=embed';
      mf.style.cssText = 'width:100%;height:100%;min-height:380px;border:0;display:block';
      mf.loading = 'lazy';
      mf.setAttribute('title', 'Map to Oriole Nursery School');
      mapBox.appendChild(mf);
    }

    // ---- testimonial rotator (auto + arrows + swipe) ----
    var slides = document.querySelectorAll('.on-tsl');
    if (slides.length > 1) {
      var dots = document.querySelectorAll('.on-tdot');
      var i = 0, timer;
      function go(n) {
        slides[i].classList.remove('on-tsl-on');
        if (dots[i]) dots[i].classList.remove('on-tdot-on');
        i = ((n % slides.length) + slides.length) % slides.length;
        slides[i].classList.add('on-tsl-on');
        if (dots[i]) dots[i].classList.add('on-tdot-on');
      }
      function auto() { timer = setInterval(function () { go(i + 1); }, 5000); }
      function manual(n) { clearInterval(timer); go(n); auto(); }
      dots.forEach(function (d, n) {
        d.addEventListener('click', function () { manual(n); });
      });
      var tin = slides[0].parentElement;
      if (tin) {
        var nav = document.createElement('div');
        nav.className = 'on-tnav';
        var prev = document.createElement('button');
        prev.className = 'on-tbtn';
        prev.type = 'button';
        prev.setAttribute('aria-label', 'Previous review');
        prev.innerHTML = '&#8592;';
        var next = document.createElement('button');
        next.className = 'on-tbtn';
        next.type = 'button';
        next.setAttribute('aria-label', 'Next review');
        next.innerHTML = '&#8594;';
        prev.addEventListener('click', function () { manual(i - 1); });
        next.addEventListener('click', function () { manual(i + 1); });
        nav.appendChild(prev);
        var dotsWrap = dots.length ? dots[0].parentElement : null;
        if (dotsWrap && dotsWrap.parentElement === tin) nav.appendChild(dotsWrap);
        nav.appendChild(next);
        tin.appendChild(nav);
        var tx0 = null;
        tin.addEventListener('touchstart', function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
        tin.addEventListener('touchend', function (e) {
          if (tx0 === null) return;
          var dx = e.changedTouches[0].clientX - tx0;
          tx0 = null;
          if (Math.abs(dx) > 40) manual(dx < 0 ? i + 1 : i - 1);
        }, { passive: true });
      }
      auto();
    }
  });
})();
