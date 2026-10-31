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

## Deploying Updates (Automatic GitHub Auto-Deploy)

Your `Gain-Zee/puck-and-wick` GitHub repository is directly linked to Cloudflare Pages (`Git Provider: Yes`). Every time changes are pushed to `main`, Cloudflare automatically builds and deploys the update to `https://puck-and-wick.pages.dev` within seconds:

```bash
git add -A && git commit -m "Update Puck & Wick site" && git push origin main
```

*(Any non-`main` branch or Pull Request you push will also automatically get its own isolated preview URL like `https://<branch>.puck-and-wick.pages.dev`.)*

---

## Adding Your Custom Domain (e.g. `puckandwick.com`)

1. In your Cloudflare Pages project (`puck-and-wick`), open the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `puckandwick.com` and `www.puckandwick.com`.
4. Cloudflare automatically provisions and renews your SSL certificate at no cost.
