import { chromium } from '/Users/Prequel/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';
const exe = '/Users/Prequel/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const base = 'https://oriole-nursery---new.webflow.io';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on('pageerror', e => errs.push(e.message));

// registration flow
await p.goto(base + '/summer-registration', { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);
const reg0 = await p.evaluate(() => ({
  weeks: document.querySelectorAll('.on15-wk').length,
  forms: [...document.querySelectorAll('form')].map(f => f.getAttribute('data-name')),
  noRequest: !document.body.innerText.includes('Request Form'),
}));
await p.click('.on15-wk');
await p.evaluate(() => document.querySelectorAll('.on15-wk')[2].click());
await p.waitForTimeout(400);
const reg1 = await p.evaluate(() => ({
  count: document.querySelector('.on15-count').textContent,
  sum: document.querySelector('.on15-sum').textContent,
  hidden: document.querySelector('input[name="Selected Weeks"]').value,
}));
console.log('REG:', JSON.stringify({ ...reg0, ...reg1 }), errs.join(';') || 'no-errs');

// submit family registration end-to-end with selected weeks
let api = null;
p.on('response', r => { if (r.url().includes('api/v1/form')) api = r.status(); });
await p.fill('input[name="Child First Name"]', 'QA');
await p.fill('input[name="Child Last Name"]', 'CampTest');
await p.fill('input[name="Home Address"]', '123 Test St, Toronto');
await p.fill('input[name="Parent 1 Name"]', 'QA Parent');
await p.fill('input[name="Parent 1 Phone"]', '4165551234');
await p.fill('input[name="Parent 1 Email"]', 'qa-test@example.com');
await p.fill('input[name="Parent 2 Name"]', 'N/A');
await p.fill('input[name="Parent 2 Phone"]', 'N/A');
await p.fill('input[name="Parent 2 Email"]', 'N/A');
await p.click('form[data-name="Camp Family Registration"] input[type="submit"]');
await p.waitForTimeout(4000);
const done = await p.evaluate(() => getComputedStyle(document.querySelector('.on15-f1 .w-form-done')).display);
console.log('CAMP FORM E2E: api=' + api + ' done=' + done);

// textareas everywhere + video + map + FAQ adds
const checks = [];
for (const [path, tests] of [
  ['/', ['.on-fta', '.on17-map iframe']],
  ['/toddler', ['.on-fta', '.on16-video', null]],
  ['/junior', ['.on-fta', '.on16-video']],
  ['/senior', ['.on-fta', '.on16-video']],
  ['/summer-camp', ['.on-fta']],
  ['/how-to-enrol', ['.on-fta']],
]) {
  await p.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(2500);
  for (const sel of tests) {
    if (!sel) continue;
    const ok = await p.evaluate(s => !!document.querySelector(s), sel);
    if (!ok) checks.push(`MISSING ${sel} on ${path}`);
  }
}
// FAQ adds + age dropdown text
await p.goto(base + '/toddler', { waitUntil: 'networkidle' });
await p.waitForTimeout(2200);
const tod = await p.evaluate(() => ({
  regFaq: document.documentElement.innerHTML.includes('until March'),
  combineFaq: document.documentElement.innerHTML.includes('run in conjunction'),
  ageOpt: [...document.querySelectorAll('.on-form select option')].some(o => o.textContent.includes('for interest')),
  videoPlays: !!document.querySelector('.on16-video'),
}));
console.log('checks:', checks.length ? checks.join(' | ') : 'all present', '| toddler:', JSON.stringify(tod));
// link audit: collect all internal hrefs and # anchors
const broken = [];
for (const path of ['/', '/toddler', '/junior', '/senior', '/summer-camp', '/summer-registration', '/how-to-enrol', '/co-op', '/fee-schedule', '/faqs', '/privacy-policy']) {
  await p.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(1500);
  const bad = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (h === '#' || h === '') out.push('EMPTY:' + (a.textContent.trim().slice(0, 30)));
      else if (h.startsWith('#') && !document.getElementById(h.slice(1))) out.push('DEAD-ANCHOR:' + h);
    });
    return out;
  });
  if (bad.length) broken.push(path + ': ' + [...new Set(bad)].join(', '));
}
console.log('link audit:', broken.length ? broken.join('\n') : 'all links OK');
await b.close();
