# Anita's Baby Sitting & Day Care

A responsive, parent-friendly website for **Anita's Baby Sitting and Day Care**, built around the existing home-based daycare design and direct enquiry experience.

## Key Features

- Responsive desktop, tablet and mobile layout
- Home, About, Care, Experience, Testimonials, FAQ and Contact sections
- Mobile navigation menu
- Scroll-reveal interactions
- Swiper testimonial carousel
- FAQ accordion
- Direct phone, WhatsApp, email and Google Maps actions
- Enquiry form prepared for Web3Forms
- Existing daycare logo and banner assets preserved

## Tech Stack

- HTML5
- Tailwind CSS via CDN
- Vanilla CSS
- Vanilla JavaScript
- Swiper.js
- Optional Web3Forms integration

## Screenshots

The repository includes the original `images/logo.png` and `images/banner.png` assets used by the website.

## Project Structure

```text
.
├── images/
│   ├── banner.png
│   └── logo.png
├── index.html
├── script.js
├── styles.css
├── .gitignore
└── README.md
```

## Installation / Local Run

No package installation or build step is required.

Open `index.html` directly, or run a local static server:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Enquiry Form

The repository deliberately contains **no real Web3Forms access key**. The form uses the placeholder `YOUR_WEB3FORMS_ACCESS_KEY` and will show a configuration message until a valid key is supplied.

If you choose to enable Web3Forms, add the access key only through your deployment/configuration process. Do not commit a real secret to GitHub.

Phone, WhatsApp, email and map actions do not depend on the form key.

## Deployment

This is a static website and can be deployed on services such as GitHub Pages, Netlify or Vercel static hosting without a build step.

## Security & Privacy

- No API key or private credential is included in the repository.
- Public-facing business contact information is part of the original website and should be reviewed before reuse or forking.
- Never commit `.env`, credentials or third-party service secrets.

## Future Enhancements

- Connect the enquiry form to a production form service
- Add lightweight analytics with appropriate privacy controls
- Add structured SEO metadata and social preview images
