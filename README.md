# Oriole Nursery School — Website Preview (mockup)

A static, cross-linked microsite of redesigned Oriole pages, for sharing a draft
with Heather. Real Oriole photos and copy drawn from the live site, program
plans, fee schedule, and handbook. **Design mockup — final copy/photos to be confirmed.**

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `toddler.html` | Toddler Class |
| `junior.html` | Junior Preschool |
| `senior.html` | Senior Preschool |
| `summer.html` | Summer Camp (overview) |
| `summer-register.html` | Summer Camp — how to register |
| `summer-form1.html` | Summer Form 1 · Family Registration |
| `summer-form2.html` | Summer Form 2 · Medical & Emergency |
| `summer-form3.html` | Summer Form 3 · Week Selection |
| `application.html` | Class application form (How to Enrol) |

All pages share `assets/` (photos + logo) and `gate.js` (password screen).

## Preview locally

Open `index.html` in a browser, or serve the folder:

```
cd mockup
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Password protection

Every page loads `gate.js`, which shows a password screen before the content.

- **Password:** `deerpark1948`
- Change it by editing the `PASSWORD` value at the top of `gate.js`.
- Unlock lasts for the browser session (it re-prompts in a new session/browser).

⚠️ **This is light protection, not real security** — the password is in the
JavaScript file, so anyone technical could bypass it. It's meant only to keep a
casual preview private. Don't put anything sensitive here.

## Publish to GitHub Pages

1. Create a new GitHub repo (Private is fine — Pages still works on free/Pro).
2. Push the **contents of this `mockup/` folder** to the repo root, e.g.:
   ```
   cd mockup
   git init
   git add .
   git commit -m "Oriole website preview"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / root (`/`)** → Save.
4. Wait ~1 minute; your site will be at `https://<you>.github.io/<repo>/`.
5. Share the link + the password with Heather.

> Tip: if you'd rather keep this inside the larger `oriole` repo, push the whole
> repo and set Pages to serve the `/mockup` folder isn't supported directly —
> Pages serves root or `/docs`. Easiest is a dedicated repo from the `mockup/`
> contents (step 2), or rename `mockup` → `docs` and choose the `/docs` option.
