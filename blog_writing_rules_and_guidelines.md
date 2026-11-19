# Blog writing rules and guidelines

Every CMJani post must meet these rules, so all posts look and feel the same and work for readers, search engines and AI answers. Use them with `templates/` and the `/new-video` workflow in `.claude/skills/new-video/SKILL.md`. If a rule and a template disagree, fix the template.

## 1. What a post is for

A post answers one question: where did Jani go, and how can you go there too?

Most readers arrive on a phone from a YouTube description. Others arrive from a search or an AI answer. Both want facts quickly, so the places come before the story.

## 2. Page structure

Every post has these parts, in this order. Don't add, remove or reorder them.

| # | Part | Rule |
|---|---|---|
| 1 | Breadcrumb | Home, then a short version of the title |
| 2 | H1 | Contains the main keyword and the place |
| 3 | Lede | One or two sentences that make the reader want the post |
| 4 | Video | Thumbnail with descriptive alt text |
| 5 | Video date | Video date and length, with no author name or photo |
| 6 | Short answer | Up to three sentences that answer the page's main question |
| 7 | Places | Numbered, in video order |
| 8 | Article | Question headings, in the order below |
| 9 | Checked date | Date and a link to the disclaimer |
| 10 | Chapters | From the video description |
| 11 | Related videos | One to three cards |
| 12 | More trips | Subscribe and all videos |

Each place has a name, a note, an address, a Google Maps button and a timestamp link.

**Article order:**

1. The main comparison or decision, with a table if there are two or more options
2. What Jani measured, tried or found first-hand
3. Cost
4. Best time to go
5. How to get there or find it
6. Safety or what to know before going
7. A natural link to another post

Skip a section if the sources don't support it. Never fill a gap with general travel writing.

**Optional sections.** The user can ask for these two extra question sections in the article, just before the checked date. Use the optional blocks in the templates.

- **Flights** ("How do you fly from Finland to Chiang Mai?"): only facts from a lookup, and a plain search link. No affiliate link unless the user supplied one.
- **Where to stay**: link each hotel to its own website and state only what that site says. Say they aren't from the video. Never call a hotel "the best" without a source.

## 3. Headlines and metadata

| Element | Rule |
|---|---|
| H1 | Keyword first where it reads naturally. Name the place. A playful phrase is fine if the keyword stays. |
| SEO title | Under about 60 characters including ` \| CMJani`. Keyword first. |
| Meta description | Under about 155 characters. Says what's on the page and names the main places. |
| Slug | Lowercase, unaccented, hyphenated. Main search words. Never changes once published. |
| H2 in the article | Always a real question someone would ask |

The YouTube title goes in the video data, not the H1, unless it already contains the keyword.

**Good:** Khao Soi Chiang Maissa: kolme ravintolaa testissä

**Bad:** Mitä ruokaa Chiang Maissa jonotetaan joka päivä?

## 4. Writing easy-to-quote facts

Search engines and AI tools lift short, self-contained statements. Write so that any paragraph still makes sense when quoted alone.

- **Answer first.** The first sentence under a question heading answers it fully.
- **Name things.** Write "The Monk's Trail costs 100 baht", not "It costs 100 baht".
- **Give numbers.** Use exact figures with units, like 9.65 km, not "a long way".
- **Date anything that changes.** Add "as of October 2026" to prices and fees.
- **Use tables to compare.** Two or more restaurants, routes or options go in a table.
- **Keep paragraphs short.** One idea, two to four sentences.
- **State the source of uncertain facts.** Say "according to the info board" or "my app estimated".

## 5. First-hand data

First-hand detail is what generic AI summaries and travel sites can't copy. Every post needs at least three of these:

- Numbers Jani measured: distance, time, ascent, calories, temperature
- Something that went differently from the plan
- What it cost him
- Practical things he learned the hard way
- A clear personal verdict
- Timestamp links that prove the claim in the video

Link the timestamp next to the claim. Don't invent a detail to reach three. If a post can't reach three, tell the user and ask for the full transcript.

## 6. Voice

- Write in Jani's first person ("I", "minä"), as this is his site.
- Stay dry, friendly and practical. Humour is welcome if the fact stays clear.
- Use his video description for tone.
- Keep profanity out.
- Finnish comes first. Rewrite for English readers rather than translating word for word.
- Avoid "best" and "must-see" unless the video says so.
- Only use opinions he states in the video.
- Don't tell readers how to use the page.

Jani should read each post before it's published, because it speaks for him.

## 7. Facts and sources

- Every fact needs a source: the video, its description or a lookup you made.
- Never invent a place, price, opening time, distance, verdict or opinion.
- Transcripts are often machine-translated. Check names against the video description and a web search.
- Don't reveal or guess a winner you can't confirm. Send the reader to the video instead.
- Leave out opening hours when sources disagree, and tell readers to check.
- A place only gets a Maps button if you confirmed the search opens the right place. Otherwise say why on the page and tell the user.
- Only use addresses you've confirmed. Leave out a house number if you aren't sure of it.
- Update the checked date whenever you recheck a post.

## 8. Internal links

Every post links to:

- One to three related posts, as cards
- At least one related post inside the article text, using descriptive words rather than "click here"
- The other language version
- The disclaimer, through the checked date

Choose related posts by shared topic first, then shared place. When you publish a post, also add it to the related list and article text of at least one older post, so no page is left without inbound links.

When a topic or destination reaches about five posts, suggest a hub page for it.

## 9. Structured data

Each post has one JSON-LD block containing:

| Item | Purpose |
|---|---|
| `BlogPosting` | The post, with dates. No author field |
| `VideoObject` | The video |
| `ItemList` | The places, in video order, with the most specific type available |
| `BreadcrumbList` | The breadcrumb |
| `Person` | Jani, using the identity below |

Everything in the structured data must also be visible on the page. Use these place types where they fit: `Restaurant`, `CafeOrCoffeeShop`, `BarOrPub`, `ExerciseGym`, `BuddhistTemple`, `Campground`, `TouristAttraction`, `Place`. Add `geo` only with confirmed coordinates. Don't add `FAQPage`, ratings or reviews.

## 10. Jani's identity

Use these details everywhere, without variation.

| Field | Value |
|---|---|
| Name | Jani |
| Channel and brand | CMJani |
| Also known as | Chiang Mai Jani |
| Finnish description | Kaakkois-Aasian erikoistoimittaja |
| English description | Southeast Asia's special correspondent |
| Experience | 20 years |
| About page | `/jani/` and `/en/jani/` |
| Photo | `/assets/jani.jpg` |
| YouTube | `https://www.youtube.com/@ChiangMaiJani` |
| JSON-LD `@id` | `https://cmjani.pages.dev/#jani` |

Name him "Jani" in writing and "Jani (CMJani)" in metadata. New social profiles must use the same name and photo, and link back to this site.

## 11. Images

- Save thumbnails to `site/assets/thumbs/<video-id>.jpg`. Don't load them from YouTube.
- A place can have one screenshot from the video, saved to `site/assets/shots/<video-id>-<place-slug>.jpg`. Only use one the user approved. Where each was taken is in `screenshots.txt`.
- Alt text says what the image shows and includes the place.
- Always set `width` and `height`.
- Use `loading="lazy"` on images below the first screen.

## 12. Affiliate links

- Only use real links supplied by the user.
- Place them next to the location they relate to.
- Label each one and use `rel="sponsored nofollow noopener"`.
- Keep the footer disclosure on any page with one.
- Never let a link change a recommendation.

## 13. Pre-publish checklist

**Content**
- [ ] H1 contains the keyword and place
- [ ] Short answer is three sentences or fewer
- [ ] Every article H2 is a question, answered in its first sentence
- [ ] At least three first-hand details, with timestamps
- [ ] Prices and fees are dated
- [ ] Options are compared in a table
- [ ] Every fact has a source

**Places**
- [ ] Listed in video order, with confirmed addresses
- [ ] Every Maps button opens the right place
- [ ] Any stop with no button says why

**Search and AI**
- [ ] Title and description are within length
- [ ] Canonical and hreflang tags point to each other
- [ ] JSON-LD is valid and matches the page
- [ ] All images have alt text and dimensions

**Linking**
- [ ] Related videos added, and an older post links to this one
- [ ] Added to all six video lists, `sitemap.xml` and `site/llms.txt`

**Final**
- [ ] Both languages exist and link to each other
- [ ] Checked date is today
- [ ] `grep -r "{{" site/` finds nothing
- [ ] Jani has approved the post
