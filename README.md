# Pearland Fire Link

Unofficial quick-links page + shift calendar for Pearland FD. Static site, no backend,
no login, no database. Costs nothing to run.

## Editing links

Everything lives in **`links.js`**. That's the only file you edit for day-to-day upkeep.
Copy an existing block, change the name/desc/url, save, push. No HTML needed.

Optional flags on any link:

| Flag | Effect |
|---|---|
| `offsite: true` | Shows an "Off City WiFi" badge — won't load on the station network (HR Suite) |
| `app: true` | Shows an "App" badge |
| `ios: "..."` / `android: "..."` | Platform-specific URL (used for the AcidRemap protocol downloads) |
| `scheme: "x://"` | Tries to open an installed app first, falls back to the store link |
| `urgent: true` | Red treatment (used for 988) |
| `pinned: true` | Reserved — not wired up yet |

Links whose URL isn't `http`/`tel` (e.g. `flowchart.html`, `fire-districts.pdf`) are treated
as local pages and open in the app rather than a new tab.

## Local pages

| File | What it is |
|---|---|
| `flowchart.html` | PPE Inspection & Advanced Cleaning flow chart, laid out to match the printed sheet. Step 5 links straight to the Exposure Form. Has a Print button. |
| `duties.html` | Daily & Weekly Duties, reformatted for a phone. Opens on today, flags day-1 apparatus checks and Wednesday cycle count automatically. |
| `shift.js` | Shared rotation math used by both `index.html` and `duties.html`. |

Also bump `LAST_UPDATED` at the top when you do a review pass.

## Deploying

GitHub Pages, same as your other apps:

1. Push to a repo
2. Settings → Pages → Deploy from branch → `main` / root
3. **Bump `CACHE` in `sw.js`** every deploy (e.g. `pfd-link-v1` → `v2`) or phones keep the old links

## Automatic link checking

`.github/workflows/link-check.yml` pings every URL in `links.js` each Monday morning and
opens a GitHub issue if any of them break. Free, no API keys, no AI cost.

Sites behind SSO or bot-blocking are listed in `.lycheeignore` — the checker can't reach
them, so they need an occasional manual click-through instead.

## Known open items

- **Handtevy** — the `handtevy://` URL scheme is a guess; it isn't publicly documented.
  Test it on your phone. If it doesn't open the app, delete the `scheme:` line and the
  tile just goes to the app store.
- **City Email** — `outlook.office.com/mail/` is the standard M365 webmail address but
  hasn't been confirmed against Pearland's tenant. Verify before this goes wide.
- **Report a broken link** — the footer mailto has no recipient yet. Set it in
  `index.html` (search for `getElementById('report')`).

## Shift rotation

3 platoons, 48/96, six-day cycle `A A B B C C`.
Anchored to **Tue Aug 4 2026 = A shift, day 1**. Defined at the top of the `<script>`
block in `index.html`. If the department ever re-anchors the rotation, that one constant
is the only thing to change.
