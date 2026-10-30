# Sierra Green GitHub-only show administration

This is Sierra's separate static content editor: \`/admin/\`, hosted beside the existing artist website. It reads/writes \`SierraGreen/shows.json\` and adds photos under \`images/admin/\`; the website's \`home.js\` reads \`shows.json\` and falls back to the preserved original \`shows-data.js\` if the feed cannot be reached.

No Cloudflare Worker, dedicated database, or second GitHub account is needed. The editor shares the vetted browser code with \`UpcomingShows/admin/\` but its configuration points to **Sierra's repository only**.

## One-time setup

On the existing GitHub account, create a **fine-grained personal access token** with only **Contents: Read and write** for the selected repository \`SierraGreen\`. A token may select both \`SierraGreen\` and \`UpcomingShows\` if one shared token is preferred. Token access is *repository-wide*, not limited to \`shows.json\`. Never use your regular GitHub password or commit the token to source code.

Visit the Sierra admin page over HTTPS on a trusted computer. Enter the token and create a unique passphrase (minimum 14 characters). Web Crypto PBKDF2-SHA-256 (600,000 iterations) + AES-256-GCM encrypts it before **ciphertext only** is stored in localStorage. The token is decrypted into memory only while the tab is unlocked. Lock clears the reference; revoke the token on GitHub to fully revoke access.

A user with the token and passphrase can change any content in that repository; this isn't a server-side login nor a separate auditable identity. Do not share the passphrase over email or use the editor on a shared kiosk.

## What is editable

- Artist/show name, date, displayed time (including "Close"), venue, city, optional photograph and announcement.
- Add, copy, edit, remove, and publish performances with one GitHub commit per save.
- Upload JPEG, PNG and WebP photographs up to 2 MB to a uniquely named path, then save the show to attach the image.
- Existing three August 2026 show records were imported without changing their date/time labels.

The public artist site reads its own JSON feed, not the BMC show feed. Dates and times are local to the venue. Original \`shows-data.js\` stays in Git as a network-failure fallback.

## Testing and remaining limitations

See \`tests/verify-admin.mjs\` and GitHub Actions. Real browser, GitHub permissions, upload, mobile, and hosting tests still require a valid authorized token. Static-hosted encrypted-token storage offers a convenience passphrase lock, not independent user identities, a server-enforced permission model, or protection against a compromised browser/site source.
