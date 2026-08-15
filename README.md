# Physiotherapy & Care

A lightweight, production-ready personal physiotherapy practice website for Physiotherapy & Care in Goregaon East, Mumbai, led by Dr. Ronak Bramhbhatt.

## Run locally

Because this is a dependency-light static site, it can be served from the project directory with any static server. For example:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Content and imagery

Practice information, treatments, conditions, FAQs, reasons to choose the practice, and image locations live in [`data.js`](./data.js). Replace the empty image values when Dr. Ronak supplies the practice logo, her portrait, or original practice photography. The current hero image is a replaceable remote placeholder.

The appointment form is intentionally frontend-only and does not imply confirmation. Its submit handler is the integration point for email, WhatsApp, a database, an admin dashboard, or calendar scheduling later.
