---
name: new-video
description: Create a new CMJani blog post from a YouTube video, step by step with the user. Use when someone wants to add a video, make a new post or slug, or shares a video link, video file or transcript for the site.
---

# Add a new video

Guide the user through one new post in Finnish and English, one step at a time. Read `CLAUDE.md` and `blog_writing_rules_and_guidelines.md` first. The guidelines decide the page structure, headlines, voice and quotable facts for every post.

**How to run it**
- **The user may not be technical.** Use plain words. Never ask them to run a command or edit a file.
- Do one step, show the result, then ask before moving on. Use AskUserQuestion for choices, so they can click. Ask for links and file paths in plain chat.
- Skip anything the user has already given you.
- No scripts and nothing to install without asking. Every step below is a single command or a built-in tool.
- If a step fails, say so in one sentence and offer the next best option. Never invent what you couldn't get.

## 0. Check the tools

Run `which yt-dlp ffmpeg git python3`. If one is missing, tell the user which, point them to "What you need" in `README.md`, and offer to install it with Homebrew (`brew install yt-dlp ffmpeg`). Ask before installing. Don't continue without `yt-dlp` and `ffmpeg`.

## 1. The video

Ask: **"Where is the video?"** with these choices: **A YouTube link** / **A video file on my computer**.

**YouTube link.** From the video ID, fetch these. If a fetch fails, ask the user.
- **Title:** `curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"`
- **Length, date and description:** fetch the watch page and read `lengthSeconds`, `publishDate` and `shortDescription`. The description is usually in Finnish and has the most reliable place names.
- **Thumbnail:** download it so the page doesn't load it from Google:
  `curl -sfL "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" -o site/assets/thumbs/VIDEO_ID.jpg`
  If that fails, use `hqdefault.jpg`, and set `width="480" height="360"` on the page's `img` tags.

**File on the computer.** Ask for the path ("drag the file into this window and press Enter"). Get its length with `ffprobe -loglevel error -show_entries format=duration -of csv=p=0 "FILE"`. The page needs a YouTube link, so ask "Is it on YouTube yet?"
- Yes: ask for the link and do the YouTube steps above too.
- No: carry on with steps 2 to 5 using the file, but don't write the pages until the user gives you the YouTube link. Ask for it before step 6.

Show the title, length and date and ask if that's the right video.

## 2. The transcript

Ask: **"Do you have a transcript?"** with these choices: **Get it from YouTube (Recommended)** / **I'll paste it** / **Make one from the video** / **No transcript**.

- **Get it from YouTube.** Save it in a temporary folder, not in the project:
  `yt-dlp --skip-download --write-auto-subs --sub-langs "fi,en" --sub-format vtt -o "TEMP/%(id)s" "https://www.youtube.com/watch?v=VIDEO_ID"`
  Prefer the Finnish file (`.fi.vtt`). An error on one language is fine if the other downloaded. Read the file and ignore the timing tags and the repeated lines. If nothing downloads, offer the other choices.
- **I'll paste it.** Tell them: open the video on YouTube on a computer, click **...more** under the video, then **Show transcript**, select the text, copy it and paste it here. Finnish is best.
- **Make one from the video.** This needs `whisper-cli` and a speech model that isn't English-only (a model name ending in `.en` can't do Finnish). Check with `which whisper-cli` and ask where the model file is. If either is missing, explain in one sentence, offer to set it up together, and fall back to the other choices if they'd rather not. If both exist:
  1. Make the audio: `ffmpeg -loglevel error -i "VIDEO_FILE" -ar 16000 -ac 1 -c:a pcm_s16le TEMP/audio.wav` (for a YouTube link, first `yt-dlp -x --audio-format wav -o "TEMP/video.%(ext)s" "URL"`, then convert that file the same way).
  2. Transcribe: `whisper-cli -m MODEL -l fi -f TEMP/audio.wav -osrt -of TEMP/transcript`
- **No transcript.** A summary with timestamps is enough for a shorter post. Tell the user the post will have less detail.

Also ask for the description if you don't have it from YouTube. Check that the link, transcript and description all belong to the same video. If they don't match, stop and ask.

Tell the user what you got and how reliable it is. Automatic captions are rough, and place names in them are often wrong. Interpret them. Never quote them.

## 3. The chapters

Use the chapters from the description if there are any. Show them and ask if they're right.

If there are none, make them from the transcript: one chapter per place or topic, as `m:ss` and a short label, starting at `0:00`. Show them and ask: **Use these** / **Change something**. Tell the user they can paste these chapters into the YouTube description too.

## 4. The places

1. List every place in video order with its timestamp. Use the description's names over the transcript's, which are often wrong ("Khao So i" turned out to be Khao-Sō-i, not "Khao Soi I"). Show the list and ask if anything is missing, extra or misspelled.
2. Check each one with a web search: the real name, the area and any fact you plan to state. Never state a price, opening time, distance or opinion you don't have a source for.
3. **For each place, one at a time, ask how to get its Google Maps link.** Choices: **Find it for me** / **I'll paste the link** / **No Maps button for this one**.
   - **Find it for me:** use Playwright. Load the tools with ToolSearch (`select:mcp__plugin_playwright_playwright__browser_navigate,mcp__plugin_playwright_playwright__browser_snapshot`). Open `https://www.google.com/maps/search/?api=1&query=Place+Name+Chiang+Mai` (add the city, not just the name), look at what it landed on, and try other spellings if it shows a list of results. Tell the user what it opened and ask: **Yes, that's the place** / **No, try again** / **I'll paste the link**. Use the search URL as the Maps link only after a yes. Only use Playwright when the user picks it for that place.
   - **I'll paste the link:** use the link they give you as it is.
   - **No Maps button:** keep the stop, leave out the button and say why on the page.
4. Note each place's confirmed address and, if available, its coordinates. Leave out a house number if you aren't sure of it.
5. Show the final list, marking any place without a Maps link.

## 5. Slugs and screenshots

1. Choose the slugs and tell the user. Finnish: `site/<fi-slug>/index.html`. English: `site/en/<en-slug>/index.html`. Use the words people search for, such as `khao-soi-chiang-mai-kolme-ravintolaa`. Never reuse or change an existing slug.
2. Ask: **"Do you want a picture from the video for each place?"** Choices: **Yes** / **No**. If yes, follow `.claude/skills/screenshots/SKILL.md` for every place, one at a time. The pages don't exist yet, so it only saves each approved picture and logs it in `screenshots.txt`. Step 6 puts them on the pages. A place the user skips gets no picture.

## 6. Write the pages

Before you write, ask these two things, one at a time:
- **"Do you have affiliate links for this video?"** "No" is a fine answer. Never make one up.
- **"Do you want a flights section and a where-to-stay section?"** If yes, use the optional blocks in the templates. Look up the facts as the guidelines say.

Then:
1. Copy `templates/post.fi.html` to the Finnish path, fill in every placeholder and remove all template comments.
2. Copy `templates/post.en.html` to the English path and do the same. Rewrite for English readers.
3. For every place with an approved screenshot in `screenshots.txt`, add its `img` from the `SCREENSHOT` comment, with alt text in each language.

**Filling in the templates**
- `{{SEO_TITLE}}`: the words people search for. With ` | CMJani`, keep it under about 60 characters.
- `{{META_DESCRIPTION}}`: under about 155 characters. Say what's on the page.
- `{{TITLE}}`: the page headline. It must contain the main keyword and the place.
- `{{SHORT_TITLE}}`: the breadcrumb label, a few words long.
- `{{THREE_SENTENCE_ANSWER}}`: the "Lyhyesti" / "In short" box. Up to three sentences that answer the page's main question.
- `{{IMAGE_ALT}}`: what the thumbnail shows, including the place.
- `{{POST_DATE}}` and `{{CHECKED_DATE}}`: today as `YYYY-MM-DD`. `{{CHECKED_DATE_FI}}` is like `31.10.2026`, and `{{CHECKED_DATE_EN}}` is like `31 October 2026`.
- `{{VIDEO_DATE}}`: the video's publish date as `YYYY-MM-DD`.
- `{{SCHEMA_PLACE_TYPE}}`: the place type from section 9 of the guidelines.
- `{{MAPS_URL}}`: the confirmed Maps link. It appears in the page and in the JSON-LD `hasMap` field.
- `{{YOUTUBE_TITLE}}`: the exact title. The Finnish page uses the Finnish one. The English page uses the English title if there is one, otherwise the Finnish one.
- `{{ISO_DURATION}}`: `lengthSeconds` as `PT27M44S`. `{{DURATION}}` is the same as `27 min 44 s`.
- `{{SECONDS}}`: the timestamp in seconds (minutes × 60 + seconds).
- The English video date line says English subtitles are available. Check that the video has them, and delete that sentence if it doesn't.
- Escape `&` as `&amp;` in links and text. Inside the JSON-LD block, use a plain `&`.

**Places**
- Keep them in video order. Numbers continue across routes.
- Use routes for trips with separate legs, and a single list for places that aren't a route. With a single list, stop names are `h3` and the `h3` route heading and `dl` are removed.
- Include only the facts you have. Delete any `dl` row you can't support.

**Article**
- Follow the article order in section 2 of the guidelines. Every heading is a question, and the first sentence answers it.
- Write something useful and original. Never paste the transcript.
- Include at least three first-hand details, with timestamp links.
- Add the place details to the `ItemList` in the JSON-LD, one `ListItem` per stop.
- Use the chapters from step 3 for the chapter list.

## 7. Update the rest of the site

1. Add a card to the video list on all six of these pages, using the existing cards as the pattern:
   - Finnish: `site/index.html`, `site/jani/index.html`, `site/404.html`
   - English: `site/en/index.html`, `site/en/jani/index.html`, `site/en/404.html`

   Cards go in publish date order, newest first, so an older video goes further down. Only the first card's image leaves out `loading="lazy"`, except on the "Who is Jani?" pages, where every card has it.
2. Add both URLs to `site/sitemap.xml`, and update the `lastmod` date on the home and "Who is Jani?" pages.
3. Add both posts to `site/llms.txt`, with a one-line description of what each covers.
4. Add one to three related cards to the new post, then link to it from at least one older post, in its related list and article text. Use section 8 of the guidelines.
5. If either home page's `og:image` should show the newest video, update it.
6. If any page now has an affiliate link, make sure its footer has the disclosure. A page without one must not have it.

## 8. Check everything

Work through the pre-publish checklist in section 13 of the guidelines, and confirm:

- [ ] The post exists in both languages and each links to the other.
- [ ] Canonical and all three hreflang tags are correct on both pages.
- [ ] All six video lists and `sitemap.xml` include the post, with working links.
- [ ] The video date line has no author name, photo or author link.
- [ ] Every Maps button opens the right place. A stop with no button says why.
- [ ] Every timestamp link points to the right moment.
- [ ] Every screenshot on the page is in `screenshots.txt`.
- [ ] The JSON-LD is valid and has no placeholders.
- [ ] `grep -r "{{" site/` finds nothing.
- [ ] Every price, stat and claim has a source.

Fix what you can, then tell the user what you changed and what is still unconfirmed.

## 9. Finish

Ask: **"The post is ready. What next?"** Choices: **Test it on my computer** / **Put it on the test page** / **Save it (commit) and push**. They can pick one after another. Keep asking "Anything else?" until they say they're done.

- **Test it on my computer:** run `python3 -m http.server 8000 --directory site` in the background, then `open "http://localhost:8000/<fi-slug>/"` so it opens in their browser. Tell them the English page is at `/en/<en-slug>/`. Opening the HTML files directly breaks their paths. Stop the server when they're done.
- **Put it on the test page:** this uploads a copy to the `cmjani-test` project on Cloudflare, which isn't connected to GitHub and is hidden from search engines. It needs `wrangler`, already logged in (`wrangler whoami`). Run these, with a temporary folder for the copy:
  ```
  cp -R site TEMP/deploy
  printf '/*\n  X-Robots-Tag: noindex, nofollow\n' > TEMP/deploy/_headers
  wrangler pages deploy TEMP/deploy --project-name cmjani-test --branch main --commit-dirty=true
  ```
  Then give them https://cmjani-test.pages.dev and the post's address on it. The test page only changes when you run this again.
- **Save it (commit) and push:** pushing to `main` publishes the real site, so check first that the user has seen the preview and approved the post. Remind them of anything still open in `todo.txt`, and of any demo content such as a placeholder affiliate link. Ask before you commit and again before you push. Commit all the changes with a clear message. If `git remote -v` shows no remote, there is nothing to push to: explain that and ask whether to create a GitHub repository (name and private or public) before you do anything. Never create or push to a repository without a yes.

When the post is published, give them the line to paste into the YouTube description:

```
📍 Kaikki videon paikat kartalla: https://cmjani.pages.dev/<fi-slug>/
```

Finally, say which places have no Maps button or no picture, so they know what's left.
