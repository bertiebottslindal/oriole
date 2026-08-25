/* Oriole Webflow site JS — served via GitHub Pages (bertiebottslindal.github.io/oriole/wf.js).
   Loaded via a plain <script> tag in Webflow Site settings > Custom code > Footer (no SRI since
   2026-08-19 — updates ship on git push alone). Do not delete — load-bearing for the Webflow site.
   v1.19.0 (2026-08-24, Roberta) — ONE-PARENT FAMILIES COULD NOT SUBMIT AN APPLICATION.
   Every second-parent field was required in the Webflow markup, and v1.8.0 coerced the email and
   phone ones to real type=email/tel, so the form's own hint ("enter N/A") was impossible to obey:
   "2 answers are still needed — Second Parent Email, Second Parent Phone" with no way past it.
   A tick box now clears, hides and un-requires the whole block, on the application form AND the
   registration package (Parent 2 Name/Cell/Email/Best Contact were required there too). Same
   release, /thank-you?form=application: the $150 pay band moves from below the fold to directly
   under the headline, the headline says what is left to do, the e-transfer account is always
   visible rather than behind a toggle, and the "card payment isn't available" warning can no
   longer appear next to a mounted card form.

   v1.18.0 (2026-08-24, Roberta) — APPLICATION FEE IS NOW PAYABLE, EMBEDDED IN THE PAGE.
   /how-to-enrol has promised "You'll be taken to secure checkout to pay the $150 application fee"
   since v1.10.0, but APP_FEE_LINK was never filled, so the thank-you page fell back to "we'll email
   you payment options". Every applicant since 2026-08-21 hit that. Now: the pay band on
   /thank-you?form=application mounts Stripe Checkout INSIDE the page.
   Why embedded rather than a Stripe Payment Link: the session is created server-side by Make
   (same webhook as camp, discriminated by kind=application_fee), so it carries
   metadata[child] / [school_year] / [kind]. A payment link carries none of those, and the back office
   keys Total paid on the child's name EXACTLY — a blank name reconciles to nobody. The router's
   NON-CAMP route reads that metadata and writes a correctly typed Payments row with no phantom
   camp registration.
   ⚠️ Stripe retired ui_mode 'embedded' in favour of 'embedded_page', and the matching JS is
   createEmbeddedCheckoutPage() from js.stripe.com/dahlia/stripe.js — NOT initEmbeddedCheckout() and
   NOT /v3/. Both were verified against the live API and the current docs, not assumed.
   School year defaults to 2026/27 on the session; Heather can change it per row from the School year
   dropdown on the Payments tab. Every failure path (stripe.js blocked, hook down, no client_secret)
   restores the button and points at e-transfer, so a broken card path never blocks an application.
   v1.17.0 (2026-08-23, Roberta) — SPAM-GATED SUBMISSIONS NO LONGER FIRE CONVERSIONS. The event id
   was assigned before the spam gate, and a gated submission still called finish(true), which
   redirected to /thank-you?form=lead&eid=... That URL fires BOTH the School Lead custom conversion
   (a PageView URL rule) and the standard Lead pixel event, so every discarded bot submission was
   teaching Meta to find more bots. Gated submissions now finish silently on the page: no redirect,
   no thank-you PageView, no Lead, no School Lead. Who gets gated is unchanged.

   v1.16.0 (2026-08-23, Roberta) — CAMP LEADS SPLIT OFF. 1.15.0 fired a standard Lead for every lead
   form, camp included, which would have polluted the school-year optimisation event. Camp enquiries
   now fire a CampLead custom event instead, matching the exclusion the School Lead custom conversion
   has always had (URL does not contain topic=camp).

   v1.15.1 (2026-08-23, Roberta) — adds client_user_agent to the submission for CAPI.
   v1.15.0 (2026-08-23, Roberta) — CAPI DEDUPLICATION. Every submission now carries one event id,
   sent to the backend as fields[event_id] and to the pixel as eventID on the thank-you page, so a
   matching server-side event from Make is counted once, not twice. Also fires a real standard Lead
   event instead of relying only on the URL-rule custom conversion, which has no id to match on.

   v1.14.0 (2026-08-23, Roberta) — PIXEL YIELDS TO THE HEAD. Measured on a throttled mobile
   connection the pixel fired at 13.7s because it sits behind this 93 KB file; in the head it
   fires at ~0.8s. Meta was missing ~82% of ad clicks (84 clicks -> 15 landing page views).
   This block now runs ONLY if no pixel exists yet, so the head snippet can be pasted at any
   time with no double-counting and no gap. Once it is in the head, delete this block.

   v1.13.0 (2026-08-22, Roberta) — LEAD THANK-YOU. Tours are booked by a person, not a calendar,
   so the page now says so: "Heather, our Head of School, will be in touch to arrange a tour."
   It also gains a second, quieter CTA to /how-to-enrol, so a decided family is not left waiting
   on a human before they can act.
   v1.12.0 (2026-08-22, Roberta) — AD ATTRIBUTION CAPTURE. Every form was posting with no record
   of where the visitor came from, so a lead arriving from a Meta ad was indistinguishable from one
   that walked in off Google. That cannot be backfilled: once a visit is over, the click id is gone.
   Now captured on first page view, kept in localStorage for 90 days (FIRST touch wins, so browsing
   the site before enquiring does not wipe the ad click), and posted with every form as:
     fbc · fbp · utm_source · utm_medium · utm_campaign · utm_content · utm_term · landing_page
   fbc/fbp are what Meta's Conversions API needs to match a server event back to an ad click, so this
   is also the prerequisite for sending enrolments back to Meta later.
   These ride along in the existing fields[...] payload, so they land in the Form Submissions tab's
   Payload JSON column with no change needed in Make or the workbook. The whole thing is wrapped in
   try/catch and appended last: if attribution ever throws, the form still submits normally.
   v1.11.0 (2026-08-21, Roberta) — META PIXEL INSTALLED HERE. The site had no pixel at all, and
   Webflow's custom-code head is not reachable from tooling right now, so the base pixel is loaded
   from this file instead. wf.js is on every page via the footer script tag, so coverage is complete;
   the only cost is that PageView fires a moment later than a <head> install would. Meta's URL-based
   event rules are evaluated client-side by fbevents.js, so they work normally from here.
   ⚠️ IF THE PIXEL IS EVER PASTED INTO WEBFLOW'S HEAD, DELETE IT FROM THIS FILE FIRST. Two copies
   means PageView and every URL-rule event fires twice and every number doubles. The guard below
   stops a double-init from this file alone, but it cannot see a second copy in the page head.
   v1.10.0 (2026-08-21, Roberta) — APPLICATION FEE PAYMENT. /how-to-enrol already told applicants
   "You'll be taken to secure checkout to pay the $150 application fee", and nothing ever took them
   there: the form redirected to /thank-you, which said the Registrar would confirm payment details.
   The thank-you page now carries a real payment step for form=application — pay $150 by card, or
   send an e-transfer. Payment comes AFTER the form saves (Roberta's call), so an abandoned payment
   never loses an application. Stripe returns to /thank-you?form=appfee, which renders the paid state. That is a
   DIFFERENT form value on purpose: if the paid page still matched form=application, Meta's
   SubmitApplication rule would fire a second time and double-count every application.
   ✅ COMPLETED in v1.18.0 — both constants are filled and the card path is live (embedded, not a link).
   v1.9.4 (2026-08-20, Roberta): the homepage contact block led with the Parent Handbook. Heading is
   now "Have a question or want to book a tour?", and the sub-line under it leads with the tour as
   well rather than opening on the handbook. Handbook is still offered, just second.
   v1.9.3 (2026-08-20, Roberta): Phone is REQUIRED on every lead form. The home page form had
   been softened to "Phone (optional)" for conversion; an enquiry arrived that same evening with
   no number, which is a lead Heather cannot ring. Phone is now set required in JS on every
   .on-form Phone field, after the softener, so it holds regardless of the Webflow markup.
   Last name stays optional on the home form.
   v1.9.2: day-picker copy reframed as a PREFERENCE rather than a selection - "Other days"
   opens with "we will accommodate it if we have the availability", so a family asking for
   something off-schedule is invited rather than corrected.
   v1.9.1: the day-picker error is rendered AFTER the main validation loop, which calls
   clearErr() on every named field and was deleting it (the hidden Preferred Days input is in that
   loop). Symptom: submit silently refused with no message. Host lookup also learned .on11-full,
   the application form's own wrapper class.
   v1.9.0 (2026-08-20, Roberta): the application form's Preferred Days field was free text, so
   Heather read prose and ticked five booleans by hand for every application (the sheet stores days
   as School Year Registrations G-K). It is now five day checkboxes plus an "Other" box, composed
   back into the same hidden Preferred Days field so nothing downstream changes. Days lock when the
   chosen schedule fixes them (2 mornings = Tue/Thu, Toddler 3 = Mon/Wed/Fri, 5 = all), stay open
   where the school actually negotiates (Junior/Senior 3 and 4), and the count is checked on submit.
   Other exists because three enrolled children are on patterns the Schedule list cannot express.
   v1.8.1 (2026-08-20): the application form's Schedule dropdown is rebuilt by rebuildSched()
   when the Class changes, and that second code path did not carry the blank-placeholder rule -
   so Schedule sat on the literal string "Select a schedule" and would have posted it as the
   answer. Caught on the live page right after 1.8.0 shipped.
   v1.8.0 (2026-08-20, Roberta - form audit fixes):
   (f) insertAboveSubmit() helper - the submit button is nested inside a wrapper on the
       registration form, so form.insertBefore() threw and took the submit handler with it.
   (a) VALIDATION now covers <textarea> too. It only ever queried input+select, and wf.js sets
       novalidate, so required textareas were enforced NOWHERE - the registration form posted with
       Allergies blank.
   (b) Every required <select> now opens on a blank "Select ..." placeholder. Previously only
       Photo Release had one, so an untouched dropdown silently posted option 1: Child Age
       "Under 18 months (for interest)", Class Toddler, Duty Day Participating "Yes - participating".
   (c) Second-parent email/phone fields are coerced to type=email/tel at runtime so they get the
       same format checks as the first parent's (they were type=text and accepted anything).
       Phone check widened to 10-15 digits so extensions and +country prefixes pass.
   (d) Failed validation now shows a SUMMARY above the submit button naming each field that needs
       attention, each one a link that scrolls to and focuses that field. On the 60-field
       registration form the parent used to click Submit and see nothing happen, because all the
       inline errors were thousands of pixels above the fold. Errors also clear as they are fixed.
   (e) SPAM GATE reworked: the old rule binned any submit within 3s of page load, faking success
       and posting nothing - which also binned genuine parents whose fields were restored from
       session storage or filled by browser autofill. Now a form is only treated as a bot if the
       honeypot is filled, or (lead forms only) no trusted user interaction ever happened on it.
       The long registration/application/camp forms are never time-gated.
   v1.7.2 (2026-08-20, Roberta): REQUIRED CWELCC + fee-schedule acknowledgement on the
   application form (/how-to-enrol, form "Application 2026-2027") - "not funded by CWELCC and I
   have read the fees page", with "fees page" linking to /fee-schedule in a new tab. Unchecked =
   submit blocked, nothing posted. Posts as fields[CWELCC Acknowledgement]=Yes, matching the lead
   forms. Deliberately excluded from session persistence (data-nostore) so a returning parent
   ticks it themselves rather than having it restored for them.
   v1.7.1 (2026-08-20): enrichment strip reworked per Roberta - label pinned LEFT, words scroll
   horizontally in a seamless infinite marquee (was a centred crossfade), and the strip moved from
   under the hero to under the green numbers bar (.on-trust). Colours unchanged.
   v1.7.0 (2026-08-20, Roberta batch): (a) homepage "Our Programs" paragraph gains the enriched-
   programming sentence; (b) enrichment strip injected on the homepage; (c) REQUIRED CWELCC
   acknowledgement checkbox on all five lead forms
   (Home/Toddler/Junior/Senior/Summer Camp) - posts as fields[CWELCC Acknowledgement]=Yes.
   Prior: 1.6.0 honeypot + 3s min fill-time spam defence on every form (excluded from the real POST);
   1.5.1 /camp-confirmation noindex; 1.5.0 Monthly/Annual fee toggle;
   1.4.1 removed "within one business day" sitewide + morning hours on confirmations. */
(function () {
  var T0 = Date.now();

  // ---- Meta pixel (v1.11.0, guarded v1.14.0) · dataset 1372762647822184 "Oriole Website" ----
  // See the header note before adding this anywhere else on the site.
  var ON_PIXEL_ALREADY = !!window.fbq;   // true when the head snippet is present
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;                       // already initialised — never init twice
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  try {
    // v1.14.0: only initialise if nothing else already has. Once the base code is pasted into the
    // Webflow head (where it belongs, and where it fires in ~700ms instead of ~14s on mobile), this
    // whole block becomes a no-op and there is no double-counting and no ordering risk either way.
    if (!ON_PIXEL_ALREADY) {
      window.fbq('init', '1372762647822184');
      window.fbq('track', 'PageView');
    }
  } catch (e) { /* never let the pixel break the site */ }

  // ---- ad attribution capture (v1.12.0) ----
  // First touch wins. Nothing here may ever throw into the page.
  var ON_ATTR = (function () {
    var KEY = 'on_attr_v1', MAXAGE = 90 * 24 * 60 * 60 * 1000;
    function cookie(n) {
      try {
        var m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)');
        return m ? m.pop() : '';
      } catch (e) { return ''; }
    }
    function load() {
      try {
        var raw = localStorage.getItem(KEY);
        if (!raw) return null;
        var o = JSON.parse(raw);
        return (o && o.t && (Date.now() - o.t) < MAXAGE) ? o : null;
      } catch (e) { return null; }
    }
    try {
      var q = new URLSearchParams(location.search);
      var saved = load();
      if (!saved) {
        // fbc: use Meta's cookie if it exists, otherwise build it from fbclid in the URL
        var fbclid = q.get('fbclid') || '';
        var fbc = cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '');
        var o = { t: Date.now(), fbc: fbc, fbp: cookie('_fbp'), landing_page: location.href.slice(0, 500) };
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
          o[k] = q.get(k) || '';
        });
        // only persist a visit that actually carries attribution, so a direct visit
        // does not lock in an empty record and block a later ad click
        if (o.fbc || o.fbp || o.utm_source) {
          try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { }
          saved = o;
        } else {
          saved = o;
        }
      }
      return saved || {};
    } catch (e) { return {}; }
  })();

  // ---- CAPI deduplication (v1.15.0) ----
  // One id per submission, sent BOTH to the browser pixel (as eventID on the thank-you page) and to
  // the backend (as fields[event_id]) so Make can send the same id server-side. Meta then counts the
  // browser event and the server event as ONE. Carried through the redirect in the URL rather than
  // sessionStorage, because in-app browsers have already proven unreliable for storage here.
  var ON_LAST_EVID = '';
  function onNewEventId() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) { }
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  function onAttrFields() {
    var out = [];
    try {
      var a = ON_ATTR || {};
      // re-read the cookies at submit time: the pixel sets _fbp asynchronously and may
      // not have existed when the page first loaded
      var late = (function (n) {
        try {
          var m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)');
          return m ? m.pop() : '';
        } catch (e) { return ''; }
      });
      var fbc = a.fbc || late('_fbc'), fbp = a.fbp || late('_fbp');
      if (fbc) out.push(['fbc', fbc]);
      if (fbp) out.push(['fbp', fbp]);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page']
        .forEach(function (k) { if (a[k]) out.push([k, a[k]]); });
    } catch (e) { }
    return out;
  }
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
    '.on15-wk-past{opacity:.45;pointer-events:none;cursor:default}' +
    'input[type=date].on-fi{height:auto;min-height:48px;line-height:1.4}' +
    // application: Preferred Days day-picker (replaces a free-text box that Heather had to translate)
    '.on-dp{grid-column:1/-1;width:100%}' +
    '.on-dp-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}' +
    '.on-dp-d{display:inline-flex;align-items:center;gap:8px;border:1.5px solid #E7E1D3;border-radius:100px;' +
      'padding:10px 16px;font-family:Inter,Arial,sans-serif;font-size:.9rem;font-weight:600;color:#26271F;' +
      'background:#fff;cursor:pointer;transition:all .15s ease;user-select:none}' +
    '.on-dp-d:hover{border-color:#5B990A}' +
    '.on-dp-d input{width:16px;height:16px;margin:0;accent-color:#5B990A;cursor:pointer}' +
    '.on-dp-d.on-dp-on{background:#EEF4E2;border-color:#5B990A;color:#46760A}' +
    '.on-dp-d.on-dp-lock{opacity:.72;cursor:default}' +
    '.on-dp-d.on-dp-lock input{cursor:default}' +
    '.on-dp-note{font-family:Inter,Arial,sans-serif;font-size:.8rem;color:#5E6157;margin-top:8px;line-height:1.45}' +
    '.on-dp-other{margin-top:10px;display:none}' +
    '.on-dp-other.on-dp-show{display:block}' +
    // hero rotator strip (homepage): inline-grid stacks every word in one cell, so the
    // strip is sized by the longest word and nothing shifts as it cycles
    '.on-rot{background:#FAF6EE;border-bottom:1px solid #E7E1D3;overflow:hidden}' +
    '.on-rot-in{max-width:1180px;margin:0 auto;padding:0 28px;display:flex;align-items:center;gap:22px}' +
    '.on-rot-l{flex:0 0 auto;padding:14px 0;font-family:Inter,Arial,sans-serif;font-weight:600;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:#46760A}' +
    // marquee viewport: fades both edges so words slide in and out instead of hard-cutting
    '.on-rot-m{flex:1 1 auto;min-width:0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 26px,#000 calc(100% - 42px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 26px,#000 calc(100% - 42px),transparent 100%)}' +
    '.on-rot-t{display:flex;align-items:center;width:max-content;will-change:transform}' +
    '.on-rot-i{padding:14px 0;white-space:nowrap;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:1.25rem;line-height:1.2;color:#26271F}' +
    '.on-rot-s{padding:0 18px;color:#5B990A;font-size:.9rem;line-height:1}' +
    '@media (max-width:600px){.on-rot-in{flex-direction:column;align-items:stretch;gap:0;padding:0 20px}.on-rot-l{padding:11px 0 0;font-size:.66rem;letter-spacing:.13em}.on-rot-i{padding:8px 0 11px;font-size:1.12rem}.on-rot-m{-webkit-mask-image:linear-gradient(90deg,#000 0,#000 calc(100% - 42px),transparent 100%);mask-image:linear-gradient(90deg,#000 0,#000 calc(100% - 42px),transparent 100%)}}' +
    // CWELCC acknowledgement checkbox on lead forms
    '.on-ck{grid-column:1/-1;width:100%;display:flex;flex-wrap:wrap;align-items:flex-start;gap:10px;margin:2px 0 2px}' +
    '.on-ck input{width:18px;height:18px;min-width:18px;margin:2px 0 0;accent-color:#5B990A;cursor:pointer;flex:0 0 auto}' +
    '.on-ck label{flex:1 1 0;min-width:0;font-family:Inter,Arial,sans-serif;font-size:.85rem;font-weight:500;line-height:1.45;color:#5E6157;cursor:pointer}' +
    '.on-ck .on-ferr{flex-basis:100%;margin-left:28px}' +
    '.on-sum{display:none;grid-column:1/-1;width:100%;background:#FBF0EC;border:1px solid #E3B9A8;border-radius:12px;padding:14px 16px;margin:16px 0 12px;font-family:Inter,Arial,sans-serif}' +
    '.on-sum-h{font-size:.9rem;font-weight:700;color:#A8502A;margin-bottom:6px}' +
    '.on-sum-l{font-size:.85rem;line-height:1.7;color:#5E6157}' +
    '.on-sum-i{color:#A8502A;text-decoration:underline;cursor:pointer;margin-right:10px}' +
    '.on-sum-m{color:#5E6157}' +
    '.on-ck-gate{background:#F6FAEF;border:1px solid #DCE9C7;border-radius:12px;padding:14px 16px;margin:16px 0 12px}' +
    '.on-ck-gate label{color:#3F4A35}' +
    '.on-ck-link{color:#46760A;text-decoration:underline;font-weight:600}';
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

  // ---- keep the hidden registration package + thank-you pages out of search indexes ----
  if (location.pathname === '/registration-form' || location.pathname === '/thank-you' || location.pathname === '/camp-confirmation') {
    var nr = document.createElement('meta');
    nr.name = 'robots'; nr.content = 'noindex, nofollow';
    document.head.appendChild(nr);
  }

  // ---- homepage: contact block leads with the tour, not the handbook (Roberta, 2026-08-20) ----
  // Same immediate-run reasoning as the block below: this script is the last element in <body>,
  // so the nodes exist and the swap lands before first paint.
  (function () {
    document.querySelectorAll('h2.on-h2c').forEach(function (h) {
      if (/Have a question or want our Parent Handbook\?/i.test((h.textContent || '').trim())) {
        h.textContent = 'Have a question or want to book a tour?';
        // the sub-line under it still led with the handbook, which reads oddly under a tour heading
        var box = h.parentNode;
        var sub = box && box.querySelector('p.on-mut');
        if (sub && /Parent Handbook/i.test(sub.textContent || '')) {
          sub.textContent = "Leave your details and we'll set up a tour. We'll send the Parent "
            + "Handbook too, and answer anything you're wondering about.";
        }
      }
    });
  })();

  // ---- homepage: Our Programs copy + enrichment rotator under the hero (Roberta, 2026-08-20) ----
  // Runs immediately (this script is the last element in <body>, so the nodes already exist and
  // the copy swap lands before first paint) rather than waiting for DOMContentLoaded.
  (function () {
    var progs = document.querySelector('.on-progs');
    if (progs) {
      var p = progs.querySelector('p.on-mut');
      if (p && /^Every class has its own daily rhythm/.test((p.textContent || '').trim())) {
        p.textContent = 'Every class has its own daily rhythm, weekly activities, and educators \u2014 '
          + 'explore the one that fits your child. Enriched programming includes weekly French and '
          + 'specialist-led classes including Sportball, music, science, gardening and yoga. '
          + 'Limited spaces available for 2026/27.';
      }
    }

    // Label sits static on the left; the words scroll horizontally in a seamless loop.
    // Sits under the green numbers bar (.on-trust), homepage only.
    var bar = document.querySelector('.on-trust');
    if (!bar || document.querySelector('.on-rot')) return;
    if (location.pathname.replace(/\/$/, '') !== '') return; // homepage only
    var words = ['Sportball', 'Music', 'Science', 'Gardening', 'Yoga', 'Art', 'Family Events', 'Seasonal Celebrations'];
    var SPEED = 55; // px per second

    var strip = document.createElement('div');
    strip.className = 'on-rot';
    var inner = document.createElement('div');
    inner.className = 'on-rot-in';
    var lab = document.createElement('div');
    lab.className = 'on-rot-l';
    lab.textContent = 'Enriched programming includes';
    var view = document.createElement('div');
    view.className = 'on-rot-m';
    var track = document.createElement('div');
    track.className = 'on-rot-t';
    view.appendChild(track);
    inner.appendChild(lab); inner.appendChild(view); strip.appendChild(inner);
    bar.parentNode.insertBefore(strip, bar.nextSibling);

    // one group = the full word list, each word followed by a separator, so groups
    // butt together seamlessly however many times they repeat
    function buildGroup() {
      var g = document.createDocumentFragment();
      words.forEach(function (w) {
        var sp = document.createElement('span');
        sp.className = 'on-rot-i';
        sp.textContent = w;
        var sep = document.createElement('span');
        sep.className = 'on-rot-s';
        sep.textContent = '\u25CF';
        g.appendChild(sp); g.appendChild(sep);
      });
      return g;
    }

    var anim = null;
    function layout() {
      if (anim) { anim.cancel(); anim = null; }
      track.textContent = '';
      track.appendChild(buildGroup());
      var groupW = track.scrollWidth;
      if (!groupW) return;
      // repeat until the track covers the viewport plus one whole group, so the
      // wrap point is always off-screen
      var need = Math.ceil((view.clientWidth + groupW) / groupW) + 1;
      for (var i = 1; i < need; i++) track.appendChild(buildGroup());
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!track.animate) return; // no WAAPI: static list, still readable
      anim = track.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(' + (-groupW) + 'px)' }],
        { duration: (groupW / SPEED) * 1000, iterations: Infinity, easing: 'linear' }
      );
    }
    layout();
    // Fraunces arrives via woff2 after this runs; re-measure once it lands or the group
    // width (and so the seamless wrap point) is computed against the Georgia fallback
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout).catch(function () { });

    strip.addEventListener('mouseenter', function () { if (anim) anim.pause(); });
    strip.addEventListener('mouseleave', function () { if (anim) anim.play(); });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 250); });
  })();

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
      // every list leads with a 'Select ...' placeholder: blank value, so a required dropdown
      // cannot be answered by silence (v1.8.0 - previously option 1 was pre-selected and posted)
      'Child Age': ['Select an age', 'Under 18 months (for interest)', '18 months \u2013 2.5 years', '2.6 \u2013 3 years', '3 \u2013 5 years'],
      'Child Age|Summer Camp Lead Form': ['Select an age', '2 years', '3 years', '4 years', '5 years'],
      'Gender': ['Select an option', 'Prefer not to say', 'Girl', 'Boy', 'Other'],
      'Class': ['Select a class', 'Toddler \u00b7 18 months \u2013 2.5 years', 'Junior Preschool \u00b7 2.6 \u2013 3 years', 'Senior Preschool \u00b7 3 \u2013 5 years'],
      'Schedule': ['Select a schedule', '2 mornings (Tue & Thu)', '3 mornings', '4 mornings', '5 mornings', 'Extended day \u2014 5 full days, 9:00\u20132:45 (new, ages 2.5+)'],
      'Board Interest': ['Select an option', 'No', 'Yes', 'Tell me more'],
      'Camp Age': ['Select an age', '2 years', '3 years', '4 years', '5 years'],
      'New or Returning': ['Select an option', 'New family', 'Returning family'],
      'First Dropoff': ['Select an option', 'Yes', 'No'],
      'Toilet Trained': ['Select an option', 'Yes', 'Mostly', 'Not yet'],
      'EpiPen': ['Select an option', 'No', 'Yes'],
      'Child Class': ['Select a class', 'Toddler', 'Junior Preschool', 'Senior Preschool'],
      'Duty Day Participating': ['Select an option', 'Yes \u2014 participating', 'No \u2014 non-participating'],
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

    // ---- email/phone fields typed as text get the real types, so they get format checks too ----
    // (v1.8.0: second-parent fields were type=text and REQUIRED, so "not-an-email" was accepted.
    //  'Caregiver Phones' is deliberately skipped - it holds more than one number.)
    document.querySelectorAll('.on-form input[type="text"]').forEach(function (el) {
      var n = el.name || '';
      if (/email$/i.test(n)) { try { el.type = 'email'; } catch (e) { } return; }
      if (/(phone|cell)$/i.test(n)) { try { el.type = 'tel'; } catch (e) { } }
    });

    // ---- date of birth: native calendar picker (Heather batch 3) ----
    document.querySelectorAll('.on-form input[name="Date of Birth"]').forEach(function (el) {
      try { el.type = 'date'; } catch (e) { return; }
      var t = new Date();
      el.max = t.toISOString().slice(0, 10);
      el.min = (t.getFullYear() - 7) + '-01-01';
    });

    // ---- session persistence: forms keep their values if a parent navigates away and back (Heather batch 3) ----
    function loadState(k) { try { return JSON.parse(sessionStorage.getItem(k) || '{}'); } catch (e) { return {}; } }
    function saveState(k, o) { try { sessionStorage.setItem(k, JSON.stringify(o)); } catch (e) { } }
    var appForm = document.querySelector('form[data-name="Application 2026-2027"]');
    var IS_CAMP = !!document.querySelector('form[data-name="Camp Family Registration"]');
    var STORE_KEY = IS_CAMP ? 'on_camp_v1' : (appForm ? 'on_app_v1' : (document.querySelector('form[data-name="Registration Package"]') ? 'on_reg_v1' : null));
    var store = STORE_KEY ? loadState(STORE_KEY) : {};
    store.fields = store.fields || {};
    store.done = store.done || {};
    var updateCampUI = null;
    function fkey(el, f) { return (f.getAttribute('data-name') || '') + '|' + el.name; }
    if (STORE_KEY) {
      document.querySelectorAll('.on-form form').forEach(function (f) {
        f.querySelectorAll('input,select,textarea').forEach(function (el) {
          if (!el.name || el.type === 'submit' || el.type === 'hidden') return;
          if (el.hasAttribute('data-nostore')) return;
          var v = store.fields[fkey(el, f)];
          if (v === undefined) return;
          if (el.type === 'checkbox') el.checked = v === '1';
          else el.value = v;
        });
        ['input', 'change'].forEach(function (ev) {
          f.addEventListener(ev, function () {
            f.querySelectorAll('input,select,textarea').forEach(function (el) {
              if (!el.name || el.type === 'submit' || el.type === 'hidden') return;
              if (el.hasAttribute('data-nostore')) return;
              store.fields[fkey(el, f)] = el.type === 'checkbox' ? (el.checked ? '1' : '') : el.value;
            });
            saveState(STORE_KEY, store);
          });
        });
      });
    }
    if (location.pathname === '/camp-confirmation') {
      try { sessionStorage.removeItem('on_camp_v1'); } catch (e) { }
    }

    // ---- application: Toddler schedules are 2 (Tue/Thu), 3 (M/W/F) or 5 mornings only (Heather batch 3) ----
    var clsSel = appForm ? appForm.querySelector('select[name="Class"]') : null;
    var schSel = appForm ? appForm.querySelector('select[name="Schedule"]') : null;
    var SCHED_TODDLER = ['Select a schedule', '2 mornings (Tue & Thu)', '3 mornings (Mon/Wed/Fri)', '5 mornings'];
    function rebuildSched() {
      if (!clsSel || !schSel) return;
      var list = clsSel.value.indexOf('Toddler') === 0 ? SCHED_TODDLER : selOpts['Schedule'];
      var cur = (schSel.value || '').split(' (')[0];
      schSel.innerHTML = '';
      list.forEach(function (o) {
        var el = document.createElement('option');
        // same placeholder rule as the generic injector: 'Select ...' carries a blank value,
        // so the required check cannot be satisfied by leaving the dropdown alone (v1.8.1)
        el.value = (o.indexOf('Select ') === 0) ? '' : o;
        el.textContent = o;
        schSel.appendChild(el);
      });
      var back = '';
      list.forEach(function (o) { if (o.indexOf('Select ') !== 0 && o.split(' (')[0] === cur) back = o; });
      schSel.value = back || '';
    }
    if (clsSel && schSel) { clsSel.addEventListener('change', rebuildSched); rebuildSched(); }

    // ---- application: Preferred Days becomes five day checkboxes (Roberta, 2026-08-20) ----
    // The sheet stores days as five booleans (School Year Registrations G-K). A free-text box meant
    // Heather read prose and ticked five boxes by hand on every application. Checkboxes map 1:1.
    // Deliberately NOT a stricter schedule dropdown: three enrolled children are on patterns the
    // Schedule list cannot express (Niall Tue/Wed/Thu, Aalisiya Wed/Thu/Fri, Rosie Mon-Thurs in
    // Toddler, which has no 4-morning option at all). Hence the Other box.
    var pdInput = appForm ? appForm.querySelector('input[name="Preferred Days"]') : null;
    if (pdInput && !appForm.querySelector('.on-dp')) {
      var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      var pdField = pdInput.closest('.on-ff, .on-ff-full, .on11-full') || pdInput.parentNode;
      pdInput.type = 'hidden';                 // keep it: it is what actually posts
      pdInput.setAttribute('data-nostore', '1');

      var wrap = document.createElement('div');
      wrap.className = 'on-dp';
      var row = document.createElement('div');
      row.className = 'on-dp-row';
      var boxes = DAYS.map(function (d) {
        var lab = document.createElement('label');
        lab.className = 'on-dp-d';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.setAttribute('data-day', d);
        cb.setAttribute('data-nostore', '1');   // no name, so it never posts on its own
        lab.appendChild(cb);
        lab.appendChild(document.createTextNode(d));
        row.appendChild(lab);
        return { cb: cb, lab: lab, d: d };
      });

      var oLab = document.createElement('label');
      oLab.className = 'on-dp-d';
      var oCb = document.createElement('input');
      oCb.type = 'checkbox';
      oCb.setAttribute('data-other', '1');
      oCb.setAttribute('data-nostore', '1');
      oLab.appendChild(oCb);
      oLab.appendChild(document.createTextNode('Other days'));
      row.appendChild(oLab);

      var note = document.createElement('div');
      note.className = 'on-dp-note';
      var oWrap = document.createElement('div');
      oWrap.className = 'on-dp-other';
      var oTxt = document.createElement('input');
      oTxt.type = 'text';
      oTxt.className = 'on-fi';
      oTxt.setAttribute('data-other-text', '1');
      oTxt.setAttribute('data-nostore', '1');
      oTxt.placeholder = 'Which days would suit you best?';
      oWrap.appendChild(oTxt);

      wrap.appendChild(row);
      wrap.appendChild(note);
      wrap.appendChild(oWrap);
      pdField.appendChild(wrap);

      // what the chosen schedule implies: how many days, and whether the days are fixed
      function schedSpec() {
        var v = schSel ? (schSel.value || '') : '';
        if (!v) return { n: 0, fixed: null };
        if (/Tue\s*&\s*Thu/i.test(v)) return { n: 2, fixed: ['Tue', 'Thu'] };
        if (/Mon\/Wed\/Fri/i.test(v)) return { n: 3, fixed: ['Mon', 'Wed', 'Fri'] };
        if (/^5 mornings/i.test(v) || /Extended day/i.test(v)) return { n: 5, fixed: DAYS.slice() };
        var m = v.match(/^(\d)/);
        return { n: m ? parseInt(m[1], 10) : 0, fixed: null };
      }

      function compose() {
        var picked = boxes.filter(function (b) { return b.cb.checked; }).map(function (b) { return b.d; });
        var out = picked.length === 5 ? 'Mon-Fri' : picked.join('/');
        if (oCb.checked && oTxt.value.trim()) out = (out ? out + ' \u00b7 ' : '') + 'Other: ' + oTxt.value.trim();
        pdInput.value = out;
      }

      function paint() {
        var spec = schedSpec();
        boxes.forEach(function (b) {
          var locked = !!spec.fixed;
          if (locked) b.cb.checked = spec.fixed.indexOf(b.d) !== -1;
          b.cb.disabled = locked;
          b.lab.classList.toggle('on-dp-lock', locked);
          b.lab.classList.toggle('on-dp-on', b.cb.checked);
        });
        oLab.classList.toggle('on-dp-on', oCb.checked);
        oWrap.classList.toggle('on-dp-show', oCb.checked);
        if (spec.fixed) {
          note.textContent = oCb.checked
            ? 'Tell us the days you would prefer. We will accommodate it if we have the availability.'
            : 'These are the days that go with the schedule you chose. Would prefer different ones? Tick Other days.';
        } else if (spec.n) {
          var got = boxes.filter(function (b) { return b.cb.checked; }).length;
          note.textContent = oCb.checked
            ? 'Tell us the days you would prefer. We will accommodate it if we have the availability.'
            : 'Choose your ' + spec.n + ' preferred day' + (spec.n === 1 ? '' : 's') + '. ' + got + ' selected.';
        } else {
          note.textContent = 'Choose your schedule above first.';
        }
        compose();
      }

      boxes.forEach(function (b) { b.cb.addEventListener('change', function () { clearErr(pdInput); paint(); }); });
      oCb.addEventListener('change', function () { clearErr(pdInput); paint(); if (oCb.checked) oTxt.focus(); });
      oTxt.addEventListener('input', compose);
      if (schSel) schSel.addEventListener('change', paint);
      if (clsSel) clsSel.addEventListener('change', function () { setTimeout(paint, 0); });
      paint();

      // validation runs off the hidden input, so the error lands under the picker
      appForm.setAttribute('data-dp', '1');
      appForm.__dpCheck = function () {
        var spec = schedSpec();
        var got = boxes.filter(function (b) { return b.cb.checked; }).length;
        if (oCb.checked) {
          if (!oTxt.value.trim()) return 'Tell us which days you would prefer';
          return null;                                   // Other is a request, not a fixed schedule
        }
        if (!spec.n) return null;                        // no schedule chosen yet, Schedule is required anyway
        if (got !== spec.n) return 'You chose ' + spec.n + ' mornings but picked ' + got + ' day' + (got === 1 ? '' : 's');
        return null;
      };
    }

    // ---- per-form confirmation routing (Heather batch 3): where to send people after a successful submit ----
    function afterSubmit(fname) {
      var q = null;
      if (/Lead Form$/.test(fname)) {
        var topic = {
          'Home Lead Form': 'general', 'Toddler Lead Form': 'toddler', 'Junior Lead Form': 'junior',
          'Senior Lead Form': 'senior', 'Summer Camp Lead Form': 'camp'
        }[fname] || 'general';
        q = 'form=lead&topic=' + topic + (ON_LAST_EVID ? '&eid=' + encodeURIComponent(ON_LAST_EVID) : '');
      } else if (fname === 'Application 2026-2027') {
        var _cf = document.querySelector('[name="Child First Name"]');
        var _cl = document.querySelector('[name="Child Last Name"]');
        var _pe = document.querySelector('[name="Email"]');
        q = 'form=application&cls=' + encodeURIComponent(clsSel ? clsSel.value : '') +
          '&sched=' + encodeURIComponent(schSel ? schSel.value : '') +
          '&child=' + encodeURIComponent(((_cf ? _cf.value : '') + ' ' + (_cl ? _cl.value : '')).trim()) +
          '&em=' + encodeURIComponent(_pe ? _pe.value : '');
        try { sessionStorage.removeItem('on_app_v1'); } catch (e) { }
      } else if (fname === 'Registration Package') {
        var cc = document.querySelector('select[name="Child Class"]');
        q = 'form=registration&cls=' + encodeURIComponent(cc ? cc.value : '');
        try { sessionStorage.removeItem('on_reg_v1'); } catch (e) { }
      } else if (fname === 'Camp Consent and Waiver') {
        // last form before the pay band — stay on the page and guide them to payment
        var pb = document.getElementById('camp-pay-btn');
        if (pb) setTimeout(function () {
          var sec = pb.closest('section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        }, 250);
        return false;
      }
      if (!q) return false;
      location.href = '/thank-you?' + q;
      return true;
    }

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
    // the submit button is a direct child on some forms and nested on others (the registration
    // form nests it), so always insert relative to the button's own parent - insertBefore on the
    // form itself throws NotFoundError and kills the whole submit handler
    function insertAboveSubmit(f, node) {
      var sub = f.querySelector('input[type="submit"]');
      if (sub && sub.parentNode) sub.parentNode.insertBefore(node, sub);
      else f.appendChild(node);
    }
    function clearErr(el) {
      el.style.borderColor = '';
      var n = el.parentNode.querySelector('.on-ferr');
      if (n) n.remove();
    }
    // a field's own question, for the summary list above the submit button
    function labelFor(el, dup) {
      var box = el.closest('.on-ff, .on-ff-full, .on11-part, .on-ck, .w-checkbox');
      var lab = box ? box.querySelector('label') : null;
      var t = lab ? (lab.textContent || '').trim() : '';
      if (!t) t = el.getAttribute('placeholder') || el.name || 'This field';
      t = t.replace(/\s*\*\s*$/, '').replace(/\s+/g, ' ').trim().slice(0, 60);
      // "Email address" appears against both parents, so a repeated label is no use on its own -
      // fall back to the field name, which is unique ("Parent 2 Email")
      if (dup && dup[t] > 1 && el.name) return el.name;
      return t;
    }
    // v1.8.0: on a long form the inline errors can be thousands of pixels above the submit
    // button, so clicking Submit looked like nothing happened. This names them where the
    // parent is actually looking, and each name jumps to its field.
    function summarise(f, bad) {
      var w = f.querySelector('.on-sum');
      if (!w) {
        w = document.createElement('div');
        w.className = 'on-sum';
        w.setAttribute('role', 'alert');
        insertAboveSubmit(f, w);
      }
      if (!bad.length) { w.style.display = 'none'; w.innerHTML = ''; return; }
      w.innerHTML = '';
      w.style.display = 'block';
      var h = document.createElement('div');
      h.className = 'on-sum-h';
      h.textContent = bad.length === 1
        ? 'One answer is still needed before you can submit:'
        : bad.length + ' answers are still needed before you can submit:';
      w.appendChild(h);
      var dup = {};
      f.querySelectorAll('input,select,textarea').forEach(function (el) {
        if (el.type === 'submit' || el.hasAttribute('data-hp')) return;
        var t = labelFor(el);
        dup[t] = (dup[t] || 0) + 1;
      });
      var list = document.createElement('div');
      list.className = 'on-sum-l';
      bad.slice(0, 10).forEach(function (el) {
        var a = document.createElement('a');
        a.href = '#';
        a.className = 'on-sum-i';
        a.textContent = labelFor(el, dup);
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { el.scrollIntoView(); }
          setTimeout(function () { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }, 350);
        });
        list.appendChild(a);
      });
      if (bad.length > 10) {
        var m = document.createElement('span');
        m.className = 'on-sum-m';
        m.textContent = 'and ' + (bad.length - 10) + ' more further up the form';
        list.appendChild(m);
      }
      w.appendChild(list);
    }
    // clear a field's error as soon as the parent fixes it
    ['input', 'change'].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        var el = e.target;
        if (!el || !el.closest || !el.closest('.on-form')) return;
        if (el.type === 'checkbox' ? el.checked : (el.value || '').trim()) clearErr(el);
      }, true);
    });
    // a form a human has actually touched (bots that post without real events never will)
    var touched = [];
    ['pointerdown', 'keydown', 'input', 'change'].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (!e.isTrusted || !e.target || !e.target.closest) return;
        var f = e.target.closest('.on-form form');
        if (f && touched.indexOf(f) === -1) touched.push(f);
      }, true);
    });
    document.querySelectorAll('.on-form form, form.on-form').forEach(function (f) {
      f.setAttribute('novalidate', 'novalidate');
    });

    // ---- spam defence: off-screen honeypot in every form (bots auto-fill it; humans never see it) ----
    document.querySelectorAll('.on-form form, form.on-form').forEach(function (f) {
      if (f.querySelector('input[data-hp]')) return;
      var wr = document.createElement('div');
      wr.setAttribute('aria-hidden', 'true');
      wr.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden';
      var hp = document.createElement('input');
      hp.type = 'text';
      hp.name = 'Website';
      hp.setAttribute('data-hp', '1');
      hp.autocomplete = 'off';
      hp.tabIndex = -1;
      wr.appendChild(hp);
      f.appendChild(wr);
    });
    // ---- one-parent families: the second-parent block must be skippable (Roberta, 2026-08-24) ----
    // Every second-parent field was marked required in the Webflow markup, and v1.8.0 turned the
    // email/phone ones into real type=email/tel - so the form's own hint ("enter N/A") became
    // impossible to obey and a single-parent family could not submit AT ALL. A tick box now
    // clears, hides and un-requires the whole block. The box deliberately carries NO name, so
    // the posted payload keeps exactly the shape the Sheets bridge already reads.
    function onOneParentOptOut(form, names, key, labelText) {
      if (!form) return;
      var els = [];
      names.forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        if (el) els.push(el);
      });
      if (!els.length) return;
      var boxes = els.map(function (el) {
        return el.closest('.on-ff, .on-ff-full, .on11-full, .on11-part') || el.parentNode;
      });
      els.forEach(function (el) { if (el.required) el.setAttribute('data-req', '1'); });
      var wrap = document.createElement('div');
      wrap.className = 'on11-full on-ck-nosec';
      wrap.style.cssText = 'display:flex;align-items:flex-start;gap:8px;margin:4px 0 2px';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'on-ck-' + key;
      cb.style.cssText = 'margin-top:4px;flex:0 0 auto';
      var lab = document.createElement('label');
      lab.setAttribute('for', cb.id);
      lab.className = 'on-fl';
      lab.style.cssText = 'font-weight:500;cursor:pointer;margin:0';
      lab.textContent = labelText;
      wrap.appendChild(cb);
      wrap.appendChild(lab);
      if (boxes[0] && boxes[0].parentNode) boxes[0].parentNode.insertBefore(wrap, boxes[0]);
      function apply() {
        els.forEach(function (el, i) {
          if (cb.checked) {
            el.value = '';
            el.required = false;
            clearErr(el);
          } else if (el.getAttribute('data-req') === '1') {
            el.required = true;
          }
          if (boxes[i]) boxes[i].style.display = cb.checked ? 'none' : '';
        });
        try { sessionStorage.setItem(key, cb.checked ? '1' : ''); } catch (e) { }
      }
      cb.addEventListener('change', apply);
      // the form restores itself from session storage, so this has to restore too - otherwise a
      // parent who navigates away and back is silently blocked again
      try { cb.checked = sessionStorage.getItem(key) === '1'; } catch (e) { }
      if (cb.checked) apply();
    }
    // a fault here must never take the submit handler down with it
    try {
      onOneParentOptOut(appForm,
        ['Second Parent Name', 'Second Parent Relationship', 'Second Parent Email', 'Second Parent Phone'],
        'on_app_nosecond',
        'There is only one parent or guardian on this application.');
      onOneParentOptOut(document.querySelector('form[data-name="Registration Package"]'),
        ['Parent 2 Name', 'Parent 2 Home Phone', 'Parent 2 Cell', 'Parent 2 Email', 'Parent 2 Best Contact'],
        'on_reg_nosecond',
        'There is only one parent or guardian in this family.');
      // the old copy told parents to type N/A, which the email/phone format checks then rejected
      document.querySelectorAll('.on-form .on11-hint').forEach(function (el) {
        if (!/N\/A/i.test(el.textContent || '')) return;
        el.textContent = 'We use this to address acceptance letters to both parents. If there is only '
          + 'one parent or guardian, tick the box below and leave the rest blank.';
      });
      document.querySelectorAll('.on-form input[placeholder]').forEach(function (el) {
        if (/N\/A/i.test(el.getAttribute('placeholder') || '')) el.setAttribute('placeholder', 'Full name');
      });
    } catch (e) { }

    // ---- required CWELCC acknowledgement on every lead form (Roberta, 2026-08-20) ----
    // Ad traffic will be sent at these forms, so the acknowledgement gates the lead rather
    // than sitting in fine print: unchecked = the submit is blocked and nothing is posted.
    document.querySelectorAll('.on-form form').forEach(function (f) {
      if (!/Lead Form$/.test(f.getAttribute('data-name') || '')) return;
      if (f.querySelector('input[name="CWELCC Acknowledgement"]')) return;
      var wrap = document.createElement('div');
      wrap.className = 'on-ck';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.name = 'CWELCC Acknowledgement';
      cb.id = 'on-ck-cwelcc';
      cb.required = true;
      var lab = document.createElement('label');
      lab.setAttribute('for', 'on-ck-cwelcc');
      lab.textContent = 'I understand that Oriole Nursery School is not part of the CWELCC program.';
      cb.addEventListener('change', function () { if (cb.checked) clearErr(cb); });
      wrap.appendChild(cb);
      wrap.appendChild(lab);
      insertAboveSubmit(f, wrap);
    });

    // ---- required CWELCC + fee-schedule acknowledgement on the application form (Roberta, 2026-08-20) ----
    // Same gate as the lead forms, but it also confirms the parent has seen the fees: an application
    // carries a $150 non-refundable fee, so "I did not know it was unsubsidised" must not survive it.
    if (appForm && !appForm.querySelector('input[name="CWELCC Acknowledgement"]')) {
      var aWrap = document.createElement('div');
      aWrap.className = 'on-ck on-ck-gate';
      var aCb = document.createElement('input');
      aCb.type = 'checkbox';
      aCb.name = 'CWELCC Acknowledgement';
      aCb.setAttribute('data-name', 'CWELCC Acknowledgement');
      aCb.setAttribute('data-nostore', '1');
      aCb.id = 'on-ck-app-cwelcc';
      aCb.required = true;
      var aLab = document.createElement('label');
      aLab.setAttribute('for', 'on-ck-app-cwelcc');
      aLab.appendChild(document.createTextNode('I understand that Oriole Nursery School is not funded by CWELCC and I have read the '));
      var aLink = document.createElement('a');
      aLink.href = '/fee-schedule';
      aLink.target = '_blank';
      aLink.rel = 'noopener';
      aLink.className = 'on-ck-link';
      aLink.textContent = 'fees page';
      // an <a> inside a <label> does not toggle the box per spec; stopPropagation covers the rest
      aLink.addEventListener('click', function (ev) { ev.stopPropagation(); });
      aLab.appendChild(aLink);
      aLab.appendChild(document.createTextNode('.'));
      aCb.addEventListener('change', function () { if (aCb.checked) clearErr(aCb); });
      aWrap.appendChild(aCb);
      aWrap.appendChild(aLab);
      insertAboveSubmit(appForm, aWrap);
    }

    document.addEventListener('submit', function (e) {
      var f = e.target.closest ? e.target : null;
      if (!f || !(f.closest('.on-form'))) return;
      {
        var ok = true;
        var bad = [];
        // v1.8.0: textarea included - required textareas (Allergies, Past Illnesses...) were
        // enforced nowhere, because the form carries novalidate
        f.querySelectorAll('input,select,textarea').forEach(function (el) {
          if (el.type === 'submit' || el.hasAttribute('data-hp')) return;
          clearErr(el);
          if (el.type === 'checkbox') {
            // .value is always 'on', so required checkboxes need an explicit checked test
            if (el.required && !el.checked) { err(el, 'Please confirm this to continue'); bad.push(el); ok = false; }
            return;
          }
          var v = (el.value || '').trim();
          if (el.required && !v) {
            err(el, el.tagName === 'SELECT' ? 'Please choose an option' : 'This field is required');
            bad.push(el); ok = false; return;
          }
          if (el.type === 'email' && v && !emailRe.test(v)) { err(el, 'Please enter a valid email address'); bad.push(el); ok = false; }
          if (el.type === 'tel' && v) {
            var digits = v.replace(/\D/g, '');
            if (digits.length < 10 || digits.length > 15) { err(el, 'Please enter a valid phone number'); bad.push(el); ok = false; }
          }
        });
        if (f.getAttribute('data-dp') && typeof f.__dpCheck === 'function') {
          var dpMsg = f.__dpCheck();
          var dpInput = f.querySelector('input[name="Preferred Days"]');
          if (dpMsg && dpInput) {
            var dpHost = dpInput.closest('.on-ff, .on-ff-full, .on11-full') || dpInput.parentNode;
            var dpErr = dpHost.querySelector('.on-ferr');
            if (!dpErr) {
              dpErr = document.createElement('div');
              dpErr.className = 'on-ferr';
              dpErr.style.cssText = 'color:#C8744E;font-size:.8rem;font-weight:600;margin-top:6px;font-family:Inter,Arial,sans-serif';
              dpHost.appendChild(dpErr);
            }
            dpErr.textContent = dpMsg;
            ok = false; bad.push('Preferred days');
          }
        }
        e.preventDefault(); e.stopImmediatePropagation();
        summarise(f, bad);
        if (!ok) {
          if (bad[0]) { try { bad[0].focus({ preventScroll: true }); } catch (err2) { } }
          return;
        }
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
          if (el.type === 'submit' || !el.name || el.hasAttribute('data-hp')) return;
          if (el.type === 'checkbox') { fd.append('fields[' + el.name + ']', el.checked ? 'Yes' : 'No'); return; }
          fd.append('fields[' + el.name + ']', el.value);
        });
        // attribution rides along last, and can never block a submission
        try { onAttrFields().forEach(function (kv) { fd.append('fields[' + kv[0] + ']', kv[1]); }); } catch (e) { }
        try { ON_LAST_EVID = onNewEventId(); fd.append('fields[event_id]', ON_LAST_EVID); } catch (e) { }
        // Meta requires client_user_agent on server events with action_source 'website'.
        // The visitor's IP is not knowable from the browser, so email + phone carry the match instead.
        try { fd.append('fields[client_user_agent]', navigator.userAgent || ''); } catch (e) { }
        var url = 'https://webflow.com/api/v1/form/' + document.documentElement.getAttribute('data-wf-site');
        function finish(good, silent) {
          if (btn) { btn.value = orig; btn.disabled = false; }
          if (good) {
            var fname = f.getAttribute('data-name') || '';
            if (STORE_KEY) { store.done[fname] = 1; saveState(STORE_KEY, store); }
            if (updateCampUI) updateCampUI();
            // v1.17.0: a spam-gated submission must never reach /thank-you. That URL fires the
            // School Lead custom conversion AND the standard Lead pixel event, so a discarded bot
            // submission was training delivery on bots. Silent finishes stay on the page.
            if (!silent && afterSubmit(fname)) return;
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
        // Spam gate (v1.8.0): a filled honeypot is always a bot. Beyond that, only the short
        // lead forms are gated, and on "did a human ever touch this form?" rather than a clock -
        // the old 3s-since-load rule silently binned real parents whose fields were restored from
        // session storage or filled by autofill. Registration/application/camp forms are never
        // gated this way: nothing fills 60 fields by accident, and a lost registration is
        // far more costly than a spam row.
        var hpEl = f.querySelector('input[data-hp]');
        var isLead = /Lead Form$/.test(f.getAttribute('data-name') || '');
        var untouched = isLead && touched.indexOf(f) === -1;
        if ((hpEl && (hpEl.value || '').trim() !== '') || untouched) {
          try { ON_LAST_EVID = ''; } catch (e) { }
          setTimeout(function () { finish(true, true); }, 600);
          return;
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
      n.textContent = 'We’ll get back to you as soon as we can.';
      w.appendChild(n);
    });

    // ---- fees tables: Monthly/Annual toggle on class pages (Heather batch 4b) ----
    (function () {
      var all = [];
      document.querySelectorAll('*').forEach(function (el) {
        if (/^\$[\d,]+\s*\/\s*mo$/.test((el.textContent || '').trim())) all.push(el);
      });
      // keep only innermost matches
      var moCells = all.filter(function (el) {
        return !all.some(function (o) { return o !== el && el.contains(o); });
      });
      if (!moCells.length) return;
      moCells.forEach(function (el) {
        var n = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10);
        el.setAttribute('data-mo', '$' + n.toLocaleString('en-CA') + ' / mo');
        el.setAttribute('data-yr', '$' + (n * 10).toLocaleString('en-CA') + ' / yr');
      });
      var intro = null;
      document.querySelectorAll('p, div').forEach(function (el) {
        if (!intro && el.children.length === 0 && /^Monthly tuition, billed/.test((el.textContent || '').trim())) intro = el;
      });
      if (intro) intro.setAttribute('data-orig', intro.textContent);
      var anchor = moCells[0].closest('table');
      if (!anchor) {
        anchor = moCells[0];
        while (anchor.parentNode && !anchor.parentNode.contains(moCells[moCells.length - 1])) anchor = anchor.parentNode;
        while (anchor.parentNode && anchor !== document.body && !(anchor.contains(moCells[0]) && anchor.contains(moCells[moCells.length - 1]))) anchor = anchor.parentNode;
      }
      var bar = document.createElement('div');
      bar.style.cssText = 'display:flex;gap:6px;margin:0 0 14px;font-family:Inter,Arial,sans-serif';
      function mkBtn(label) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        b.style.cssText = 'padding:7px 16px;border-radius:999px;border:1.5px solid #5B990A;background:#fff;color:#3D3D3D;font-family:inherit;font-size:.88rem;font-weight:600;cursor:pointer;transition:background .15s,color .15s';
        return b;
      }
      var bMo = mkBtn('Monthly'), bYr = mkBtn('Annual');
      function setMode(yr) {
        moCells.forEach(function (el) { el.textContent = el.getAttribute(yr ? 'data-yr' : 'data-mo'); });
        if (intro) {
          var orig = intro.getAttribute('data-orig');
          intro.textContent = yr ? orig.replace(/^Monthly tuition, billed over our/, 'Annual tuition for our') : orig;
        }
        [bMo, bYr].forEach(function (b, i) {
          var on = (i === 1) === yr;
          b.style.background = on ? '#5B990A' : '#fff';
          b.style.color = on ? '#fff' : '#3D3D3D';
        });
      }
      bMo.addEventListener('click', function () { setMode(false); });
      bYr.addEventListener('click', function () { setMode(true); });
      bar.appendChild(bMo); bar.appendChild(bYr);
      anchor.parentNode.insertBefore(bar, anchor);
      setMode(false);
    })();

    // ---- CRO: soften Handbook form (home): last name optional ----
    // v1.9.3: Phone was in this list and is not any more. A lead with no number cannot be
    // called, and calling is what turns an enquiry into a tour. Last name stays optional.
    if (location.pathname === '/' || location.pathname === '') {
      document.querySelectorAll('.on-form input[name="Last Name"]').forEach(function (el) {
        el.required = false;
        var lab = el.parentNode.querySelector('label');
        if (lab) lab.textContent = lab.textContent.replace(' *', ' (optional)');
      });
    }

    // ---- phone is required on every lead form (v1.9.3) ----
    // Set explicitly rather than left to the Webflow markup, so this holds whatever any earlier
    // block did and whatever the base label says. Runs after the softener above, so it wins.
    document.querySelectorAll('.on-form input[name="Phone"]').forEach(function (el) {
      el.required = true;
      try { el.type = 'tel'; } catch (e) { }
      var box = el.closest('.on-ff, .on-ff-full') || el.parentNode;
      var lab = box.querySelector('label');
      if (lab) {
        var t = lab.textContent.replace(/\s*\(optional\)\s*$/i, '').trim();
        lab.textContent = /\*$/.test(t) ? t : t + ' *';
      }
    });

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
        if (STORE_KEY === 'on_camp_v1') {
          var idx = [];
          wks.forEach(function (w, n) { if (w.classList.contains('on15-wk-sel')) idx.push(n); });
          store.weeks = idx;
          saveState(STORE_KEY, store);
        }
        if (updateCampUI) updateCampUI();
      }
      wks.forEach(function (w) {
        w.addEventListener('click', function () {
          if (w.classList.contains('on15-wk-past')) return;
          w.classList.toggle('on15-wk-sel'); syncWeeks();
        });
      });
      // restore week selection from this tab's earlier visit (Heather batch 3)
      (store.weeks || []).forEach(function (n) {
        if (wks[n] && !wks[n].classList.contains('on15-wk-past')) wks[n].classList.add('on15-wk-sel');
      });
      syncWeeks();

      // ---- camp online payment (Make checkout webhook -> Stripe Checkout) ----
      var CHECKOUT_HOOK = 'https://hook.us2.make.com/i3h3pvb7c15mlgq89p7pcyqdhtlbjzl1';

      // sold-out weeks: Heather ticks "Sold out" in the Airtable Camp Weeks table; the picker greys them here
      fetch(CHECKOUT_HOOK + '?soldout=1')
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var so = (j.records || []).map(function (r) { return (r.fields || {}).Slug; });
          var changed = false;
          wks.forEach(function (w, i) {
            var slug = 'week-' + (i + 1);
            if (so.indexOf(slug) >= 0 && !w.classList.contains('on15-wk-past')) {
              w.classList.add('on15-wk-past');
              if (w.classList.contains('on15-wk-sel')) { w.classList.remove('on15-wk-sel'); changed = true; }
              var b = document.createElement('div');
              b.className = 'on10-hol';
              b.textContent = 'Sold out';
              w.appendChild(b);
            }
          });
          if (changed) syncWeeks();
        })
        .catch(function () {});

      if (/[?&]cancelled=1/.test(location.search)) {
        var ban = document.createElement('div');
        ban.style.cssText = 'max-width:1140px;margin:110px auto -70px;padding:14px 20px;border-radius:14px;font-family:Inter,Arial,sans-serif;font-weight:600;font-size:.95rem;background:#FDF1E3;color:#8a6410';
        ban.textContent = 'Payment cancelled — no charge was made. You can try again below, or wait for our email with other payment options.';
        var firstSec = document.querySelector('main, .on15-pick, section');
        if (firstSec && firstSec.parentNode) firstSec.parentNode.insertBefore(ban, firstSec);
      }
      var consentForm = document.querySelector('form[data-name="Camp Consent and Waiver"]');
      var lastSec = consentForm ? consentForm.closest('section') : null;
      if (lastSec) {
        var pay = document.createElement('section');
        pay.innerHTML = '<div class="on4-day-in"><div class="on-band"><h2 class="on-h2w">Ready to pay?</h2>' +
          '<p class="on-band-p">Check your weeks below, then pay online by card — or submit the forms and we’ll email you PayPal, cheque and e-transfer options.</p>' +
          '<ul id="camp-pay-weeks" role="list" style="list-style:none;margin:16px auto 6px;padding:0;max-width:540px;text-align:left;font-family:Inter,Arial,sans-serif;font-size:.95rem;color:#fff"></ul>' +
          '<div id="camp-checklist" style="margin:6px auto 18px;max-width:540px;text-align:left;font-family:Inter,Arial,sans-serif;font-size:.88rem;color:#fff;opacity:.92"></div>' +
          '<div class="on-band-btns"><a href="#" class="on-btnl" id="camp-pay-btn">Pay online now</a></div>' +
          '<p style="margin:14px 0 0;text-align:center"><a href="#" id="camp-finish-btn" style="color:#fff;text-decoration:underline;font-family:Inter,Arial,sans-serif;font-size:.9rem">I’ll pay another way — finish up</a></p>' +
          '<p class="on-band-p" id="camp-pay-msg" style="display:none;margin-top:10px;font-weight:600"></p></div></div>';
        lastSec.parentNode.insertBefore(pay, lastSec.nextSibling);
        var payBtn = document.getElementById('camp-pay-btn');
        var payMsg = document.getElementById('camp-pay-msg');
        function payNote(t) { payMsg.textContent = t; payMsg.style.display = 'block'; }
        var val = function (n) {
          var el = document.querySelector('input[name="' + n + '"], select[name="' + n + '"]');
          return el ? (el.value || '').trim() : '';
        };
        // pre-pay recap + form checklist (Heather batch 3)
        updateCampUI = function () {
          var ul = document.getElementById('camp-pay-weeks');
          var cl = document.getElementById('camp-checklist');
          if (!ul || !cl) return;
          var rows = [], total = 0;
          wks.forEach(function (w) {
            if (!w.classList.contains('on15-wk-sel')) return;
            var lb = w.querySelector('.on9-thw').textContent + ' (' + w.querySelector('.on10-wkd').textContent + ')';
            var pr = parseInt(w.querySelector('.on10-wkp').textContent.replace(/[^0-9]/g, ''), 10);
            total += pr;
            rows.push('<li style="padding:4px 0;border-bottom:1px solid rgba(255,255,255,.22)">✓ ' + lb + ' — $' + pr + '</li>');
          });
          ul.innerHTML = rows.length
            ? rows.join('') + '<li style="padding:6px 0;font-weight:700">Total: $' + total.toLocaleString() + ' — these exact weeks will show on the payment page</li>'
            : '<li style="padding:4px 0">No weeks selected yet — tap your weeks in Step 1 above.</li>';
          var newFam = val('New or Returning').indexOf('Returning') !== 0;
          function row(done, label) { return '<div style="padding:2px 0">' + (done ? '✓' : '○') + ' ' + label + '</div>'; }
          cl.innerHTML = row(store.done['Camp Family Registration'], 'Form 1 · Family registration') +
            row(store.done['Camp Medical and Emergency'], 'Form 2 · Medical &amp; emergency' + (newFam ? ' — required for new families' : '')) +
            row(store.done['Camp Consent and Waiver'], 'Form 3 · Consent &amp; waiver');
        };
        updateCampUI();
        var finBtn = document.getElementById('camp-finish-btn');
        finBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var sel = [];
          wks.forEach(function (w, i) { if (w.classList.contains('on15-wk-sel')) sel.push('week-' + (i + 1)); });
          location.href = '/thank-you?form=camp&weeks=' + encodeURIComponent(sel.join(','));
        });
        payBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var sel = [];
          wks.forEach(function (w, i) { if (w.classList.contains('on15-wk-sel')) sel.push('week-' + (i + 1)); });
          var email = val('Parent 1 Email');
          var childName = (val('Child First Name') + ' ' + val('Child Last Name')).trim();
          if (!sel.length) { payNote('Please tap the weeks you’d like in Step 1 first.'); return; }
          if (!email || !childName) { payNote('Please fill in your child’s name and Parent 1 email in the family registration form first.'); return; }
          // new families can’t pay until the medical form is in (Heather batch 3);
          // the family + consent forms are required of everyone before online payment
          var missing = [];
          if (!store.done['Camp Family Registration']) missing.push('Form 1 (family registration)');
          if (val('New or Returning').indexOf('Returning') !== 0 && !store.done['Camp Medical and Emergency']) missing.push('Form 2 (medical & emergency)');
          if (!store.done['Camp Consent and Waiver']) missing.push('Form 3 (consent & waiver)');
          if (missing.length) {
            payNote('Almost there — please submit ' + missing.join(' and ') + ' above before paying.');
            return;
          }
          payBtn.textContent = 'One moment…'; payBtn.style.pointerEvents = 'none';
          var body = new URLSearchParams();
          body.append('email', email);
          body.append('childName', childName);
          body.append('parentName', val('Parent 1 Name'));
          body.append('weeks', sel.join(','));
          fetch(CHECKOUT_HOOK, { method: 'POST', body: body })
            .then(function (r) { return r.json(); })
            .then(function (j) {
              if (j.url) { location.href = j.url; return; }
              throw new Error('no url');
            })
            .catch(function () {
              payBtn.textContent = 'Pay online now'; payBtn.style.pointerEvents = '';
              payNote('Online payment isn’t available right now — submit the forms and we’ll email you payment options instead.');
            });
        });
      }
    }

    // ---- camp confirmation page: render the paid weeks from the redirect params ----
    var WEEK_INFO = {
      'week-1': 'Week 1 · June 15 – 19 · $325', 'week-2': 'Week 2 · June 22 – 26 · $325',
      'week-3': 'Week 3 · June 29 – July 3 (closed July 1) · $265', 'week-4': 'Week 4 · July 6 – 10 · $325',
      'week-5': 'Week 5 · July 13 – 17 · $325', 'week-6': 'Week 6 · July 20 – 24 · $325',
      'week-7': 'Week 7 · July 27 – 31 · $325', 'week-8': 'Week 8 · August 3 – 7 (closed Aug 3) · $265',
      'week-9': 'Week 9 · August 10 – 14 · $325', 'week-10': 'Week 10 · August 17 – 21 · $325',
      'week-11': 'Week 11 · August 24 – 28 · $325', 'week-12': 'Week 12 · Aug 31 – Sept 4 · $325'
    };
    var confList = document.getElementById('conf-weeks');
    if (confList && location.pathname !== '/thank-you') {
      var qp = new URLSearchParams(location.search);
      var slugs = (qp.get('weeks') || '').split(',').filter(function (s) { return WEEK_INFO[s]; });
      var child = (qp.get('child') || '').trim();
      if (child) {
        var ch = document.getElementById('conf-child');
        if (ch) ch.textContent = 'Booking for ' + child;
      }
      if (slugs.length) {
        confList.innerHTML = '';
        var total = 0;
        slugs.forEach(function (s) {
          var li = document.createElement('li');
          li.className = 'on19-week';
          li.textContent = '✓ ' + WEEK_INFO[s];
          confList.appendChild(li);
          total += (s === 'week-3' || s === 'week-8') ? 265 : 325;
        });
        var tli = document.createElement('li');
        tli.className = 'on19-week';
        tli.style.fontWeight = '700';
        tli.textContent = 'Weeks total: $' + total.toLocaleString() + ' — your Stripe receipt shows the exact amount charged';
        confList.appendChild(tli);
      } else {
        confList.innerHTML = '<li class="on19-week">Payment received — your weeks are in your Stripe receipt, and we’ll confirm them by email.</li>';
      }
    }

    // ---- /thank-you: dynamic confirmation page for every form (Heather batch 3) ----
    if (location.pathname === '/thank-you' && confList) {
      var tqp = new URLSearchParams(location.search);
      // v1.15.0: real standard Lead event, deduplicated with the server event by eventID.
      // This runs ALONGSIDE the existing URL-rule custom conversion, which keeps working untouched.
      try {
        var _eid = tqp.get('eid');
        var _topic = tqp.get('topic') || 'general';
        if (_eid && (tqp.get('form') || '') === 'lead' && window.fbq) {
          // Camp enquiries are a DIFFERENT funnel and must not feed the school-year optimisation
          // event, exactly as the School Lead custom conversion already excludes topic=camp.
          if (_topic === 'camp') {
            window.fbq('trackCustom', 'CampLead', { content_name: 'camp' }, { eventID: _eid });
          } else {
            window.fbq('track', 'Lead', { content_name: _topic }, { eventID: _eid });
          }
        }
      } catch (e) { /* tracking must never break the page */ }
      var tEye = document.querySelector('.on19-hero .on-eyebrow');
      if (tEye && (tqp.get('form') || '') !== 'camp') tEye.textContent = 'Oriole Nursery School';
      var tHead = document.getElementById('conf-heading');
      var tSub = document.getElementById('conf-sub');
      var tCard = document.getElementById('conf-child');
      var tCardBox = tCard ? tCard.parentNode : null;
      var tNote = document.querySelector('.on19-note');
      var tBtns = document.querySelectorAll('.on-band-btns a');
      var HEATHER = '<a class="on19-link" href="mailto:heather@oriolenurseryschool.com">heather@oriolenurseryschool.com</a>';
      // ---- application fee payment (v1.10.0) ----
      // Flat $150 for every applicant. The 5% sibling discount applies to tuition, NOT the
      // application fee (Roberta, 2026-08-21) — so one price, one link, no discount logic.
      // v1.18.0: EMBEDDED Stripe checkout, not a payment link. The session is created server-side
      // by Make (same webhook as camp, discriminated by kind=application_fee) so it can carry
      // metadata[child]/[school_year]/[kind] — a bare payment link carries none of that, and the
      // back office keys Total paid on the child's name EXACTLY.
      // ⚠️ Stripe retired ui_mode 'embedded' for 'embedded_page'; the matching JS is
      // createEmbeddedCheckoutPage() loaded from js.stripe.com/dahlia/stripe.js (NOT /v3/).
      var APP_FEE_HOOK = 'https://hook.us2.make.com/i3h3pvb7c15mlgq89p7pcyqdhtlbjzl1';
      var STRIPE_PK    = 'pk_live_51Tt6ieEQpj2yI86HWOJVnLfUp08VZuHPTCTjLmSr9zLDC0taAa3IJWuCAPuh47xaaGgiFe7Of4MJqcpQLKk92rsM00vCOWQzYz';
      var ETRANSFER_TO = 'info@oriolenurseryschool.com';
      function loadStripeJs(cb) {
        if (window.Stripe) { cb(); return; }
        var sc = document.createElement('script');
        sc.src = 'https://js.stripe.com/dahlia/stripe.js';
        sc.onload = cb;
        sc.onerror = function () { cb(new Error('stripe.js failed')); };
        document.head.appendChild(sc);
      }
      var FEE_LINE = 'Full fee table, payment dates and policies: <a class="on19-link" href="/fee-schedule">Fee Schedule</a>. Questions? Email ' + HEATHER + '.';
      function setList(items) {
        confList.innerHTML = items.map(function (t) { return '<li class="on19-week">' + t + '</li>'; }).join('');
      }
      function setBtn(href, label) {
        if (tBtns[0]) { tBtns[0].setAttribute('href', href); tBtns[0].textContent = label; }
      }
      // v1.13.0: a second, quieter CTA. Reuses the band's second anchor when the markup has
      // one, otherwise clones the first, so this works on every thank-you variant.
      function setBtn2(href, label) {
        try {
          var b = tBtns[1];
          if (!b && tBtns[0] && tBtns[0].parentNode) {
            b = tBtns[0].cloneNode(true);
            b.className = (tBtns[0].className || '') + ' on-btn2';
            b.style.background = 'transparent';
            b.style.border = '2px solid currentColor';
            b.style.marginLeft = '12px';
            tBtns[0].parentNode.appendChild(b);
          }
          if (b) { b.setAttribute('href', href); b.textContent = label; b.style.display = ''; }
        } catch (e) { }
      }
      var TLDR = {
        toddler: {
          card: 'Toddler Class at a glance',
          items: ['Ages 18 months – 2.5 years · educator ratio 1:5',
            'Schedules: 2 mornings (Tue &amp; Thu) · 3 mornings (Mon/Wed/Fri) · 5 mornings — all 9 am–12 pm',
            'Tuition: $562–$890 / month participating · $811–$1,135 non-participating'],
          btn: ['/toddler', 'More about the Toddler Class']
        },
        junior: {
          card: 'Junior Preschool at a glance',
          items: ['Ages 2.6 – 3 · educator ratio 1:8',
            'Schedules: 2, 3, 4 or 5 mornings (9 am–12 pm) · new Extended Day, 5 days 9:00–2:45 (ages 2.5+)',
            'Tuition: $502–$795 / month participating · $727–$1,016 non-participating · Extended Day $1,380 / $1,601'],
          btn: ['/junior', 'More about Junior Preschool']
        },
        senior: {
          card: 'Senior Preschool at a glance',
          items: ['Ages 3 – 5 · educator ratio 1:8',
            'Schedules: 2, 3, 4 or 5 mornings (9 am–12 pm) · new Extended Day, 5 days 9:00–2:45',
            'Tuition: $502–$795 / month participating · $727–$1,016 non-participating · Extended Day $1,380 / $1,601'],
          btn: ['/senior', 'More about Senior Preschool']
        },
        camp: {
          card: 'Summer Camp 2026 at a glance',
          items: ['Ages 2 – 5', 'Twelve weekly sessions · June 15 – September 4',
            '$325 per week · $265 for the two holiday-short weeks',
            'Weeks can be booked individually — online registration is open'],
          btn: ['/summer-registration', 'Go to camp registration']
        }
      };
      var tForm = tqp.get('form') || '';
      if (tForm === 'lead') {
        var tp = TLDR[tqp.get('topic')];
        if (tHead) tHead.textContent = 'Thanks — your message is on its way!';
        if (tSub) tSub.textContent = 'Heather, our Head of School, will be in touch to arrange a tour.';
        if (tp) {
          if (tCard) tCard.textContent = tp.card;
          setList(tp.items);
          if (tNote) tNote.innerHTML = FEE_LINE;
          setBtn(tp.btn[0], tp.btn[1]);
          setBtn2('/how-to-enrol', 'Ready now? Start an application');
        } else {
          if (tCardBox) tCardBox.style.display = 'none';
          if (tNote) tNote.innerHTML = 'Questions in the meantime? Email ' + HEATHER + ' or call 416 960 1293.';
          setBtn('/', 'Oriole home');
          setBtn2('/how-to-enrol', 'Ready now? Start an application');
        }
      } else if (tForm === 'application' || tForm === 'appfee') {
        // 'appfee' = returning from Stripe. A separate value, not a flag on 'application',
        // so the SubmitApplication and Purchase URL rules can never match the same page.
        var appPaid = tForm === 'appfee';
        var canCard = !!STRIPE_PK, canEmt = !!ETRANSFER_TO;
        if (tHead) tHead.textContent = appPaid
          ? 'Payment received — thank you!'
          : ((canCard || canEmt)
              ? 'Application Received - Last Step: Pay Application Fee'
              : 'Application received — thank you!');
        if (tSub) tSub.textContent = appPaid
          ? 'Your application and your $150 fee are both in. Our Registrar will be in touch about next steps.'
          : (canCard || canEmt
              ? 'Your application is saved. Pay the $150 fee below to finish, then our Registrar will be in touch about next steps.'
              : 'Our Registrar will be in touch about next steps.');
        if (tCard) tCard.textContent = 'Your application';
        var tItems = [];
        if (tqp.get('cls')) tItems.push('Class: ' + tqp.get('cls'));
        if (tqp.get('sched')) tItems.push('Schedule: ' + tqp.get('sched'));
        tItems.push(appPaid
          ? '✓ $150 application fee paid'
          : (canCard || canEmt
              ? 'A $150 non-refundable application fee is due, payable above'
              : 'A $150 non-refundable application fee is due at submission — the Registrar will confirm payment details'));
        tItems.push('After acceptance: an $850 deposit is due four weeks after your acceptance letter');
        setList(tItems);
        if (tNote) tNote.innerHTML = FEE_LINE;
        setBtn('/fee-schedule', 'See the Fee Schedule');

        // ---- payment band: card and/or e-transfer ----
        if (!appPaid && (canCard || canEmt)) {
          var aSec = document.querySelector('main section:last-of-type, section:last-of-type');
          if (aSec || tCardBox) {
            var cardBtn = canCard
              ? '<div class="on-band-btns"><a class="on-btnl" id="app-pay-btn" href="#">Pay $150 by card</a></div>'
              : '';
            // v1.19.0: the e-transfer details used to hide behind a toggle, so the account was
            // invisible exactly when card payment failed and the warning said "use e-transfer below".
            var emtLine = canEmt
              ? '<p id="app-emt-box" style="margin:18px auto 0;max-width:560px;text-align:center;color:#fff;' +
                'font-family:Inter,Arial,sans-serif;font-size:.92rem;line-height:1.55">' +
                'Prefer an Interac e-transfer? Send <b>$150</b> to <b>' + ETRANSFER_TO + '</b> and put your ' +
                'child’s full name in the message so we can match it to the application.</p>'
              : '';
            var pay = document.createElement('div');
            pay.className = 'on-payband';
            pay.style.cssText = 'margin:0 0 30px';
            // trimmed padding vs the sitewide .on-band: at full size the button lands within a
            // few pixels of the fold on a 390x844 phone
            pay.innerHTML = '<div class="on-band" style="margin-top:26px;padding:34px 24px">' +
              '<h2 class="on-h2w" style="font-size:2rem">The $150 application fee</h2>' +
              '<p class="on-band-p">One-time and non-refundable. Your application is already saved, so you can pay now or come back to this page later.</p>' +
              cardBtn +
              '<div id="app-pay-embed" style="display:none;margin:18px auto 0;max-width:640px;background:#fff;border-radius:10px;padding:6px"></div>' +
              emtLine +
              '</div>';
            // v1.19.0: the band used to be appended after the LAST section, which on this page put
            // the only real call to action a screen and a half below the fold. It now sits directly
            // under the headline, above the summary card (Roberta, 2026-08-24).
            if (tCardBox && tCardBox.parentNode) tCardBox.parentNode.insertBefore(pay, tCardBox);
            else aSec.parentNode.insertBefore(pay, aSec.nextSibling);
            var apBtn = document.getElementById('app-pay-btn');
            if (apBtn) apBtn.addEventListener('click', function (e) {
              e.preventDefault();
              var box = document.getElementById('app-pay-embed');
              // v1.19.0: mount success and the failure warning were not mutually exclusive, so a
              // parent could be told card payment was unavailable while the card form sat right
              // there. Nothing may contradict a mounted checkout.
              var mounted = false;
              function fail(msg) {
                if (mounted) return;
                apBtn.textContent = 'Pay $150 by card';
                apBtn.style.pointerEvents = '';
                apBtn.style.display = '';
                if (box) { box.innerHTML = ''; box.style.display = 'none'; }
                var w = document.createElement('p');
                w.style.cssText = 'margin:12px 0 0;text-align:center;color:#fff;font-family:Inter,Arial,sans-serif;font-size:.9rem;line-height:1.55';
                w.innerHTML = msg || ('Card payment isn\u2019t available right now. Please send $150 by Interac e-transfer to <b>'
                  + ETRANSFER_TO + '</b> with your child\u2019s full name in the message, or email heather@oriolenurseryschool.com.');
                if (box && box.parentNode && !document.getElementById('app-pay-warn')) { w.id = 'app-pay-warn'; box.parentNode.insertBefore(w, box); }
              }
              apBtn.textContent = 'One moment\u2026';
              apBtn.style.pointerEvents = 'none';
              loadStripeJs(function (err) {
                if (err || !window.Stripe) { fail(); return; }
                try {
                  window.Stripe(STRIPE_PK).createEmbeddedCheckoutPage({
                    fetchClientSecret: function () {
                      var body = new URLSearchParams();
                      body.append('kind', 'application_fee');
                      body.append('email', tqp.get('em') || '');
                      body.append('childName', tqp.get('child') || '');
                      body.append('parentName', tqp.get('parent') || '');
                      return fetch(APP_FEE_HOOK, { method: 'POST', body: body })
                        .then(function (r) { return r.json(); })
                        .then(function (j) {
                          if (!j || !j.client_secret) throw new Error('no client_secret');
                          return j.client_secret;
                        });
                    }
                  }).then(function (co) {
                    if (box) { box.style.display = 'block'; }
                    co.mount('#app-pay-embed');
                    mounted = true;
                    apBtn.style.display = 'none';
                    var stale = document.getElementById('app-pay-warn');
                    if (stale) stale.remove();
                  }).catch(function () { fail(); });
                } catch (e2) { fail(); }
              });
            });
          }
        }
      } else if (tForm === 'camp') {
        if (tHead) tHead.textContent = 'Registration forms received — thank you!';
        if (tSub) tSub.textContent = 'We’ll email PayPal, cheque and e-transfer payment options.';
        if (tCard) tCard.textContent = 'Your selected weeks';
        var tSlugs = (tqp.get('weeks') || '').split(',').filter(function (s) { return WEEK_INFO[s]; });
        if (tSlugs.length) {
          var tTot = 0;
          setList(tSlugs.map(function (s) {
            tTot += (s === 'week-3' || s === 'week-8') ? 265 : 325;
            return '✓ ' + WEEK_INFO[s];
          }).concat(['Weeks total: $' + tTot.toLocaleString()]));
        } else {
          setList(['We’ve received your forms — reply to our email with the weeks you’d like if you haven’t picked them yet.']);
        }
        if (tNote) tNote.innerHTML = '<b>One thing left:</b> your child’s space is confirmed once we’ve received their immunization records — email a copy to ' + HEATHER + ', or mail them to the school.';
        setBtn('/summer-camp', 'Back to Summer Camp');
      } else if (tForm === 'registration') {
        if (tHead) tHead.textContent = 'Registration package received — welcome!';
        if (tSub) tSub.textContent = 'Our Registrar will confirm your child’s details and be in touch.';
        if (tCard) tCard.textContent = 'What happens next';
        var rItems = [];
        if (tqp.get('cls')) rItems.push('Class: ' + tqp.get('cls'));
        rItems.push('Email your child’s immunization records to heather@oriolenurseryschool.com');
        rItems.push('We’ll follow up if anything needs clarifying');
        setList(rItems);
        if (tNote) tNote.innerHTML = 'Questions? Email ' + HEATHER + ' or call 416 960 1293.';
        setBtn('/', 'Oriole home');
      } else {
        if (tCardBox) tCardBox.style.display = 'none';
        if (tNote) tNote.innerHTML = 'Questions? Email ' + HEATHER + ' or call 416 960 1293.';
        setBtn('/', 'Oriole home');
      }
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
