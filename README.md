# Loqelo pre-launch demo

A responsive, buildless landing page using the official logo, Outfit and DM Sans fonts, product screens, service imagery and promotional film supplied in contest 2797743. The separate reference artwork in the `zmiany` folder is not reproduced.

## View or edit

Open `index.html`, or serve this folder with `python3 -m http.server 8787`. There are no packages, build steps, paid subscriptions or framework dependencies.

- Edit English content in `index.html`, translations in `app.js` and `enhancements.js`, and appearance in `styles.css` and `modern.css`.
- The page supports English, Polish and German. Initial language follows the browser preference and visitors can change it manually. Country selection uses localized country names; this demo does not perform IP geolocation.
- The product preview tabs, mobile navigation, FAQs, privacy controls and official promotional video work without third-party services.
- A customer/provider switch carries the selected audience into the waitlist. Home, Garden and Office scene selectors use clean supplied photography.
- The request explorer demonstrates local keyword matching with editable examples in all three languages. It is clearly labeled as an illustrative preview and sends no request.
- Scroll reveals respect reduced motion, and a reading-progress indicator improves orientation. Content remains visible without the enhancement script. A JavaScript fallback notice links directly to the film.

## Demo forms

Customer and provider forms validate email, country and explicit consent. They include a honeypot and minimum interaction time for basic demo spam protection. Entries are stored in this tab's browser session storage. They are **not real mailing-list subscriptions**, and no email is sent. The confirmation allows CSV export of local demo records. Privacy notice → Delete local demo entries clears them. Session storage is scoped to this origin and session.

## Connect a production waitlist

Set `waitlistEndpoint` in `config.js` to a public HTTPS endpoint that accepts JSON POST requests, permits CORS from the deployed origin and returns a success response only when the subscription is saved. The payload includes audience, email, country, optional account type, language, consent and its timestamp. Implement server-side validation, rate limits, spam protection, suppression/unsubscribe handling and contact export in the receiving service. Keep any private API credentials on the server. Use double opt-in where appropriate. This static demo does not create or administer a third-party mailing account.

Before production, replace the demo privacy text with the actual operator's notice and retention details, configure the live form service and test confirmation/unsubscribe flows. Set the final canonical and Open Graph URLs, and remove `noindex, nofollow` only when ready for indexing.

## Optional analytics

Analytics are off by default. Set a GA4 measurement ID in `config.js` to activate consent-gated loading. The footer's cookie preferences allow opt-in or withdrawal. Events include `video_open`, `demo_signup` and live `waitlist_signup`; signup events contain only the audience category, never the email, country, account type or form content. GA4's own visitor geography reporting is separate from the form. Add a visible first-visit consent interface and update the notice before enabling optional analytics in production. In the demo, no analytics script loads.

## Publish

The site is hosted on GitHub Pages from this repository's root. Future pushes update the same link. All asset URLs are relative, so project-path hosting works. `assets/` includes the supplied fonts' Open Font License notices. The repository contains only the public demo and its assets, with no credentials, contact data or original contest archives.

## Verification

The page is checked in a desktop browser and at a narrow viewport. Form validation, both roles, local confirmation, country selection, translations, product tour tabs, video loading, privacy controls and local-data deletion are exercised. A real mail integration and analytics account are not configured.

## Modern design update

The second design pass improves type size and contrast, navigation across tablet widths, service imagery, audience selection, the interactive product story, and keyboard/focus behavior. No real mailing service is connected.
