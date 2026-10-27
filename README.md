# Loqelo — pre-launch website

A fast, static one-page site for the Loqelo pre-launch (launch: February 2027), built on the
official Loqelo UI kit: the `tokens.css` colours, Outfit and DM Sans, the kit icons, the app
screens, the photos and the promotional film.

**Live demo:** https://hzia1938-spec.github.io/loqelo-prelaunch-demo/
(Polish: `?lang=pl`, German: `?lang=de`).

No framework, database or build step. It runs on any web host, including the loqelo.com
hosting, GitHub Pages, Netlify or Cloudflare Pages, at no cost.

## What's inside

| Section | Content |
|---|---|
| Hero | Logo, the tagline "Everything your place needs.", and the live "What do you need? Describe it." box. Type a job (EN/PL/DE) or speak it, and the recognised services appear as chips. |
| Film | The official Loqelo film, with chapter buttons (Describe, Match, Offers, Your jobs, For pros). |
| How it works | Describe → we find the services → receive offers → choose your pro, each shown with a small UI scene. |
| Categories | The 8 main categories as icon + name + photo. Each card opens to show its sub-categories. |
| Platform | Real screens from the UI kit in a browser frame, with the matching mobile screen. |
| Customers / providers | Two audience cards, each linking to its own waitlist. |
| Launch + waitlist | Live countdown to February 2027 and a form with two tabs: customers and service providers. |
| FAQ, final call to action, footer | Privacy summary and cookie settings. |

## Files

```
index.html            page structure (all texts carry data-i18n keys)
config.js             settings: launch date, GA4 ID, form endpoint   <- edit this to go live
assets/js/i18n.js     ALL texts in English, Polish and German, the categories and the recogniser keywords
assets/js/site.js     behaviour (language, forms, analytics, video, tour, countdown)
assets/css/site.css   design (Loqelo UI-kit tokens at the top)
assets/img, assets/video, assets/fonts, assets/icons.svg
admin.html            demo contact list with CSV export (demo mode only)
robots.txt, sitemap.xml
```

## Editing content

- **Text:** open `assets/js/i18n.js` and change the sentence in each language. The keys are
  the same in `en`, `pl` and `de`.
- **Categories and sub-categories:** edit `LOQELO_DATA.categories` in the same file.
- **Images:** replace a file in `assets/img/` with one of the same name (WebP or JPG).
- **New language:** copy the `en` block to a new code, for example `nl`, translate it, add a
  button with `data-set-lang="nl"` in `index.html`, and add `'nl'` to `languages` in
  `config.js`.

## Language detection

On the first visit the language is chosen in this order: a `?lang=` link, then the visitor's
last choice, then their location (Poland → Polish; Germany, Austria, Switzerland or
Liechtenstein → German), then their browser language, then English. The location comes from
the device time zone, so nothing is sent to a third party. A small notice says which language
was picked and offers English. The country field in the form is pre-filled the same way.
On loqelo.com behind Cloudflare, the `CF-IPCountry` header can be used for IP-based detection
instead.

## Waitlist forms → contact list

Both forms send `role` (`customer` or `provider`), `email`, `country`, the optional
`account_type`, `language`, consent (with the exact consent text) and a timestamp.

**Demo mode** (`formEndpoint: ''`): sign-ups are kept in the visitor's browser and can be
viewed and exported to CSV on `admin.html`.

**Live:** set `formEndpoint` in `config.js` to one of the free options below.

1. **MailerLite** (free up to 1,000 subscribers) or **Brevo** (free, unlimited contacts). Create
   two groups or lists, *Customers* and *Providers*, and a small serverless function or
   Make/Zapier webhook that adds each sign-up to the right group. Both tools have double
   opt-in, unsubscribe links and **CSV export** built in.
2. **Google Sheets** (free): create a sheet and add a Google Apps Script web app that appends
   each JSON POST as a row. Put the web-app URL in `formEndpoint`. Filter by `role` and use
   File → Download → CSV.
3. **Formspree / Basin** (free tier): paste the form endpoint URL. Submissions can be
   exported to CSV.

**Spam protection:** a hidden honeypot field, a minimum fill time, at most 5 sign-ups per
browser per hour, and server-side validation in the email tool. For extra protection,
Cloudflare Turnstile (free) can be added to the endpoint.

## Analytics (GA4)

1. Create a GA4 property and copy its measurement ID (`G-…`) into `config.js` → `ga4Id`.
2. GA4 loads only after the visitor clicks "Accept statistics" in the cookie banner. Ad
   storage stays denied. Email addresses and form texts are never sent to analytics.
3. Events sent:

| Event | Meaning |
|---|---|
| `page_view` | Visitors; the *Country* dimension shows where they come from |
| `waitlist_cta_click` | A "Join" button was clicked (`location`, `role`) |
| `form_start` | Someone started filling in a form (`role`) |
| `form_error` | Validation failed (`field`) |
| `sign_up` | Successful sign-up (`role`, `account_type`, `country`) |
| `waitlist_tab`, `language_change`, `video_start`, `video_progress_50`, `video_complete`, `category_open`, `platform_tab`, `describe_start` | Engagement |

4. In GA4 → Admin → Events, mark `sign_up` as a **key event**, and register `role` as a custom
   dimension. Customer and provider sign-ups are then counted separately.
   **Conversion rate** = `sign_up` ÷ users; **form effectiveness** = `sign_up` ÷ `form_start`.

## SEO

Title and meta description in each language, canonical and `hreflang` links, Open Graph and
Twitter preview (`og-image.png`), Organization and WebSite structured data, `robots.txt` and
`sitemap.xml`. The pages use semantic headings, alt texts, lazy-loaded images, WebP and
self-hosted subset fonts.

> The demo address carries `<meta name="robots" content="noindex">` so search engines don't
> index a copy. **Remove that line** and update the canonical URL when the site moves to
> loqelo.com.

## Deploying to loqelo.com

Upload the folder to the web root. Any static host works and there's nothing to install.
With GitHub Pages or Netlify, point the domain's DNS to the host and HTTPS is automatic.

## Costs

Hosting on loqelo.com or a free static host: **0**. MailerLite or Brevo free plan, or Google
Sheets: **0**. GA4: **0**. No paid licences are required.

## Credits

Fonts: Outfit and DM Sans (SIL Open Font License, see `assets/fonts`). Photos: Pixabay
Content License (see `assets/img/photo-licences.txt`), as supplied in the Loqelo UI kit.
