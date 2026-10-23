# Lễ Vu Quy — Bích Thảo & Hoàng Nam

A Vietnamese-language, single-page wedding invitation built with React, Vite, TypeScript, and Netlify Forms. The visual direction uses traditional Vietnamese wedding colors, refined gold details, and generated chibi-inspired artwork.

## Requirements
- Node.js 20 or newer
- npm
- Git (for GitHub deployment)
- A GitHub account and a Netlify account for publishing

## Run locally on Windows 11
Open PowerShell in this folder:

```powershell
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

## Edit wedding details
Edit **`src/config/wedding.ts`**. Names, date, time, venue, schedule, family details, RSVP deadline/limits, contacts, welcome/closing copy, and social metadata are centralized there.

- `date` uses `YYYY-MM-DD`.
- `time` is a 24-hour `HH:mm` value. Leave empty until confirmed; the countdown currently uses 15:00 as a clearly disclosed temporary target.
- `venue.mapUrl` should be a complete Google Maps or other directions URL. The button is hidden until configured.
- Schedule items are only shown when a time or description has been filled in.
- Keep unconfirmed family, venue, and contact information blank until verified.

## Replace the illustration
Replace `src/assets/illustrations/hero-couple.jpg` with your final illustration and keep the same filename, or update the import in `src/App.tsx`. The project also includes `generated-concept-reference.jpg` as a visual reference. The generated artwork is a concept asset; review it and replace/crop it with a final clean character illustration before public launch if you want the best result. `public/social-preview.jpg` should be replaced with a dedicated 1200×630 social-sharing image before launch.

## Production build
```powershell
npm run build
npm run preview
```
Vite outputs the static site to `dist/`.

## Push to GitHub
Create an empty repository on GitHub, then run from this project folder:

```powershell
git init
git add .
git commit -m "Create Vietnamese wedding invitation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your actual repository URL. Do not commit credentials or private RSVP exports.

## Deploy with Netlify
1. In Netlify, choose **Add new site → Import an existing project**.
2. Connect GitHub and select this repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Deploy. `netlify.toml` already declares the build command, publish directory, and Node 20.
6. In the Netlify site dashboard, open **Forms** and confirm that `wedding-rsvp` is detected. Netlify must process the static HTML form during deploy.
7. If form handling is disabled for the site, enable it in the Netlify dashboard and redeploy.
8. Submit a real test RSVP on the deployed URL, then confirm the entry appears under Forms. Delete the test response afterward.
9. Set the production URL in social-sharing metadata if you later add absolute Open Graph image URLs.

## RSVP implementation notes
The page includes a static HTML form in `index.html` for Netlify build-time detection and a matching React form that submits URL-encoded form data to `/`. Field names are deliberately kept in sync. Client-side validation uses required fields and maximum lengths; the guest count is limited by `rsvp.maxGuests`. Real form capture requires deployment on Netlify with Forms enabled. Local submissions are not expected to be stored. A failed submission displays an error rather than a false success message.

After deploying, verify Netlify's form detection and test the form from the public URL. Hosting/provider behavior cannot be confirmed until the site is deployed to your Netlify account.

## Before launch checklist
- [ ] Confirm ceremony time and final schedule.
- [ ] Add both families' names and addresses if desired.
- [ ] Confirm venue name, address, directions URL, and transportation notes.
- [ ] Confirm RSVP deadline and maximum number of guests.
- [ ] Add contact phone numbers or messaging links if guests need them.
- [ ] Add a dedicated social preview image at `public/social-preview.jpg`.
- [ ] Review the generated illustration for the desired cultural/historical accuracy.
- [ ] Test on mobile, including Zalo/Messenger in-app browsers.
- [ ] Deploy and test a real Netlify Form submission.
- [ ] Confirm public metadata and all visible placeholders before sharing the invitation.

## Important limitations
This source package is prepared for deployment, but it has not been connected to your GitHub or Netlify accounts. Real RSVP capture, public social preview URLs, and cross-device browser behavior must be verified after deployment.
