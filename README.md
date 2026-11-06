# Physiotherapy & Care

A lightweight, production-ready physiotherapy website for Physiotherapy & Care in Goregaon East, Mumbai, led by Dr. Ronak Brahmbhatt. The site supports both home visit and on-clinic consultations.

## Run locally

The site is a Cloudflare Worker with static assets and a server-side `/api/enquiry` endpoint. Install dependencies, copy `.dev.vars.example` to `.dev.vars`, and add a Resend API key to the local file (never commit it):

```powershell
npm install
Copy-Item .dev.vars.example .dev.vars
npm run dev
```

Then open the local URL printed by Wrangler. The Worker reads `RESEND_API_KEY` from `.dev.vars`; the sender, CC, and Reply-To values are fixed by `wrangler.jsonc` and are never accepted from the browser.

## Cloudflare configuration

This project uses Cloudflare Workers, not a Pages Function. In Cloudflare Dashboard, open **Workers & Pages → physiotherapy-care → Settings → Variables and Secrets**.

Add the following production values:

- Secret: `RESEND_API_KEY`
- Variable: `ENQUIRY_FROM_EMAIL` = `enquiry@physiotherapyandcare.in`
- Variable: `ENQUIRY_CC_EMAIL` = `drronak@physiotherapyandcare.in`
- Variable: `ENQUIRY_REPLY_TO` = `ronak@physiotherapyandcare.in`

Deploy the Worker after saving the secret. The production API health check is `https://physiotherapyandcare.in/api/health`; it must return JSON with `ok: true` before testing the form.

## Content and imagery

Practice information, consultation options, treatments, conditions, FAQs, reasons to choose the practice, and image locations live in [`data.js`](./data.js). The supplied logo and header lockup are loaded from their Cloudinary assets. The footer uses text-only professional credentials so no outdated embedded wording is shown.

The appointment form submits to the Worker and displays success only after Resend accepts the acknowledgement email. Resend must have `physiotherapyandcare.in` verified before `enquiry@physiotherapyandcare.in` can send successfully; domain verification status must be checked in the Resend Dashboard.
