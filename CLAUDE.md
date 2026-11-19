# CMJani site

Companion site for the YouTube channel CMJani (https://www.youtube.com/@ChiangMaiJani). Every video gets one page showing the video, the places in it with Google Maps links, and useful information. Jani links the page from the YouTube description. The site exists for search traffic and affiliate links.

## Adding a video

When someone wants a new post, or gives you a video link or transcript, follow `.claude/skills/new-video/SKILL.md` (also `/new-video`). Start by asking for the video link, then the transcript.

For pictures of the places, or a request like "take the screenshot for X from second N instead", follow `.claude/skills/screenshots/SKILL.md` (also `/screenshots`). Ask the user to approve every screenshot, one place at a time.

Every post must meet `blog_writing_rules_and_guidelines.md`. Check it whenever you write or edit a post.

## How the site works

- Plain HTML and CSS. No build step, Node, npm or bundler. Never add one.
- Cloudflare Pages publishes only `site/`. Everything else in the repo stays private.
- Pushing to `main` on GitHub deploys the site.
- Preview locally with `python3 -m http.server 8000 --directory site`. Opening the files directly breaks their paths.

| Page | File |
|---|---|
| Finnish home | `site/index.html` |
| English home | `site/en/index.html` |
| Finnish post | `site/<fi-slug>/index.html` |
| English post | `site/en/<en-slug>/index.html` |
| "Who is Jani?" pages | `site/jani/index.html`, `site/en/jani/index.html` |
| Not-found pages | `site/404.html`, `site/en/404.html` |
| Legal pages | `site/tietosuoja/`, `site/vastuuvapaus/`, `site/en/privacy/`, `site/en/disclaimer/` |
| AI summary of the site | `site/llms.txt` |
| Post templates | `templates/post.fi.html`, `templates/post.en.html` |
| Styles and video player | `site/assets/style.css`, `site/assets/site.js` |
| Thumbnails | `site/assets/thumbs/<video-id>.jpg` |
| Place screenshots | `site/assets/shots/<video-id>-<place-slug>.jpg` |
| Where each screenshot was taken (private) | `screenshots.txt` |

## Rules

**Facts**
- Only state what the video, its description or a lookup you did supports. Never invent a place, price, opening time, distance or opinion.
- Pasted transcripts are often machine-translated from Finnish and contain errors, so interpret them rather than quote them. Prefer the Finnish original.
- A place gets a Maps link only if you confirmed the search opens the right place. If you can't confirm it, keep the stop, leave out the button, say so on the page and tell the user.
- Prices and opening times change. Say where a price came from or tell readers to check, and leave out opening hours when sources disagree.

**Language**
- Finnish is the default and lives at the site root. English lives under `/en/`.
- Write the Finnish page first, then rewrite for English readers. Don't translate word for word.
- Every post exists in both languages, and the two pages link to each other.

**Tone**
- This is Jani's own site, so all pages speak in his first person.
- Dry, friendly and practical, like Jani's video descriptions. Keep profanity out.
- Lead with what the reader needs: where it is and how to get there.
- Sell the content, not the site. Don't tell readers how to use the page.

**URLs**
- Slugs are lowercase, unaccented and hyphenated, with the main search words.
- Never change a published slug. It's in a YouTube description.
- Internal links and assets always start with `/`.

**No author**
- Pages never name an author: no `meta name="author"`, no `article:author`, no `author` in JSON-LD, and no name or photo in the video date line.

**Privacy**
- Thumbnails and fonts are self-hosted, and the YouTube player only loads on click. Don't add anything that contacts a third party on page load, as that may require a cookie banner.

**Site-wide changes**
- The header and footer are repeated in every HTML file. Change them in every page under `site/`, including both `404.html` files, and in both templates.
- To add a social channel: add an `li` to the "Seuraa Jania" / "Follow Jani" footer list on every page and template, then add its URL to `sameAs` in the `Person` JSON-LD on every page and template, and to the identity table in the guidelines.
- Channel stats on the home and "Who is Jani?" pages say "more than", so they stay true as the channel grows. Update them occasionally, and leave out the subscriber count until it helps.
- The site address `https://cmjani.pages.dev` also appears in every page, the templates, `sitemap.xml` and `robots.txt`. If the domain changes, replace it everywhere.

## Affiliate links

Only add real links supplied by the user, with the label and `rel="sponsored nofollow noopener"` from the templates. Keep the footer disclosure on any page that has one, and remove it from pages that don't.

| Program | What for | Link or ID |
|---|---|---|
| DEMO ONLY: Hop Inn | Placeholder on the Chiang Mai hotel list, not a real partnership. Replace or remove before launch, along with the footer disclosure. | https://www.hopinnhotel.com/our-hotels/hop-inn-chiang-mai-changklan |
