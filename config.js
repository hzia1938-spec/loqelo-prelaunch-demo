/* Loqelo site settings — the only file you need to edit to go live. */
window.LOQELO_CONFIG = {
  /* Countdown target (planned launch). */
  launchDate: '2027-02-01T00:00:00+01:00',

  /* Google Analytics 4 measurement ID, e.g. 'G-ABC123XYZ'. Empty = analytics off.
     GA4 only loads after the visitor accepts statistics in the cookie banner. */
  ga4Id: '',

  /* Where sign-ups are sent (JSON POST). Empty = demo mode: sign-ups are kept in this browser
     and can be exported on admin.html. See README.md for MailerLite / Brevo / Google Sheets set-up. */
  formEndpoint: '',

  /* Show the small "Demo version" note under the form while formEndpoint is empty. */
  showDemoNote: true,

  languages: ['en', 'pl', 'de'],
  defaultLanguage: 'en',

  /* true = print analytics events in the browser console (for testing). */
  debug: false
};
