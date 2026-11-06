# Physiotherapy & Care

A lightweight, production-ready physiotherapy website for Physiotherapy & Care in Goregaon East, Mumbai, led by Dr. Ronak Brahmbhatt. The site supports both home visit and on-clinic consultations.

## Run locally

Because this is a dependency-light static site, it can be served from the project directory with any static server. For example:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Content and imagery

Practice information, consultation options, treatments, conditions, FAQs, reasons to choose the practice, and image locations live in [`data.js`](./data.js). The supplied logo and header lockup are loaded from their Cloudinary assets. The footer uses text-only professional credentials so no outdated embedded wording is shown.

The appointment form is intentionally frontend-only and does not imply confirmation. Its submit handler is the integration point for email, WhatsApp, a database, an admin dashboard, or calendar scheduling later.
