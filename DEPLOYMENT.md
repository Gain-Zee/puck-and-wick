# Cloudflare Pages & GitHub Deployment Guide for Puck & Wick

This site is pre-configured and 100% production-ready for **Cloudflare Pages** and **GitHub**.

---

## Live Production Details
* **GitHub Repository:** `https://github.com/Gain-Zee/puck-and-wick`
* **Cloudflare Pages Project:** `puck-and-wick`
* **Production URL:** `https://puck-and-wick.pages.dev`
* **Hosting Cost:** **$0.00 / month (Free Forever on Cloudflare Pages)**
* **Pre-configured Files:**
  * `_headers`: Enforces security headers & optimizes CSS/JS caching
  * `.cfignore`: Excludes local test harnesses and `node_modules` from edge uploads
  * `.gitignore`: Excludes macOS metadata, `node_modules`, and test artifacts
  * `manifest.json` & `robots.txt`: Web app manifest and search crawler directives

---

## Deploying Updates via CLI (Fastest)

Run from this project directory:
```bash
git add -A && git commit -m "Update Puck & Wick site" && git push origin main
npx wrangler pages deploy . --project-name=puck-and-wick --branch=main
```

---

## Connecting Automatic GitHub Deployments in Cloudflare Dashboard

If you want Cloudflare to auto-deploy every `git push` automatically:
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Compute (Workers & Pages)** → **puck-and-wick**.
2. Go to **Settings** → **Builds & deployments** → **Connect to Git** (or create via **Connect to Git** selecting `Gain-Zee/puck-and-wick`).
3. **Framework preset:** `None` (Static HTML/CSS/ES6 Modules)
4. **Build command:** *(Leave blank)*
5. **Build output directory:** `.` (root)

---

## Adding Your Custom Domain (e.g. `puckandwick.com`)

1. In your Cloudflare Pages project (`puck-and-wick`), open the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `puckandwick.com` and `www.puckandwick.com`.
4. Cloudflare automatically provisions and renews your SSL certificate at no cost.
