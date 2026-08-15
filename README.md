# Physiotherapy & Care

A lightweight, production-ready personal home-visit physiotherapy website for Physiotherapy & Care in Goregaon East, Mumbai, led by Dr. Ronak Brahmbhatt.

## Run locally

Because this is a dependency-light static site, it can be served from the project directory with any static server. For example:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Content and imagery

Practice information, home-visit messaging, treatments, conditions, FAQs, reasons to choose the practice, and image locations live in [`data.js`](./data.js). The supplied logo, header lockup, and professional footer card are loaded from their Cloudinary assets. Replace the empty image values when Dr. Ronak supplies her portrait or original practice photography.

The appointment form is intentionally frontend-only and does not imply confirmation. Its submit handler is the integration point for email, WhatsApp, a database, an admin dashboard, or calendar scheduling later.
