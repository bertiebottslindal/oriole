/* Oriole preview password gate — client-side only.
   NOTE: this is light protection to keep a preview private, NOT real security
   (the password lives in this file). Fine for sharing a draft with Heather.
   To change the password, edit PASSWORD below. */
(function () {
  var KEY = 'oriole_preview_ok';
  var PASSWORD = 'deerpark1948'; // <-- share this with Heather; change here to rotate

  if (sessionStorage.getItem(KEY) === '1') return; // already unlocked this session

  // Hide the page content until unlocked (added immediately, before <body> paints)
  var hide = document.createElement('style');
  hide.id = '__gate_hide';
  hide.textContent = 'body > *:not(#__gate){visibility:hidden !important}';
  (document.head || document.documentElement).appendChild(hide);

  function mount() {
    var g = document.createElement('div');
    g.id = '__gate';
    g.setAttribute('style', [
      'position:fixed', 'inset:0', 'z-index:99999', 'visibility:visible',
      'display:flex', 'align-items:center', 'justify-content:center',
      'background:#46760A', 'padding:24px',
      "font-family:'Inter',system-ui,sans-serif"
    ].join(';'));
    g.innerHTML =
      '<div style="background:#fff;border-radius:20px;max-width:380px;width:100%;padding:36px 32px;text-align:center;box-shadow:0 30px 80px -30px rgba(0,0,0,.5)">' +
        '<div style="font-family:Fraunces,Georgia,serif;font-size:1.5rem;font-weight:600;color:#26271F;margin-bottom:6px">Oriole — Website Preview</div>' +
        '<p style="color:#5E6157;font-size:.92rem;margin:0 0 18px">Private draft. Please enter the password to continue.</p>' +
        '<input id="__gate_in" type="password" placeholder="Password" style="width:100%;padding:.8rem 1rem;border:1.5px solid #E7E1D3;border-radius:12px;font:inherit;margin-bottom:10px">' +
        '<div id="__gate_err" style="color:#C8744E;font-size:.82rem;min-height:1.1em;margin-bottom:8px"></div>' +
        '<button id="__gate_btn" style="width:100%;padding:.85rem;border:none;border-radius:100px;background:#5B990A;color:#fff;font-weight:600;font-size:.95rem;cursor:pointer">Enter</button>' +
      '</div>';
    document.body.appendChild(g);

    var inp = document.getElementById('__gate_in');
    var err = document.getElementById('__gate_err');
    function unlock() {
      if (inp.value === PASSWORD) {
        sessionStorage.setItem(KEY, '1');
        var h = document.getElementById('__gate_hide'); if (h) h.remove();
        g.remove();
      } else {
        err.textContent = 'Incorrect password — please try again.';
        inp.value = ''; inp.focus();
      }
    }
    document.getElementById('__gate_btn').addEventListener('click', unlock);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') unlock(); });
    inp.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
