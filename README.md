# CMJani site

Companion site for the [CMJani YouTube channel](https://www.youtube.com/@ChiangMaiJani). Each video gets a page with the video, every place in it on Google Maps, and useful information. The site itself is plain HTML, so nothing is built or installed to run it. The helper programs under "What you need" are only for making new posts.

## Add a new video

1. Open this folder in [Claude Code](https://claude.com/claude-code).
2. Type `/new-video`.
3. Claude takes you through it one step at a time and asks you to confirm each one:
   1. **The video.** A YouTube link, or a video file on your computer.
   2. **The transcript.** Claude gets it from YouTube, you paste your own, or Claude makes one from the video.
   3. **The chapters.** From the description, or Claude suggests them for you to approve.
   4. **The places.** For each place you choose: Claude finds the Google Maps link, you paste one, or the place gets no Maps button.
   5. **The screenshots.** A picture from the video for each place. You approve every one.
   6. **The pages.** Claude writes the Finnish and English posts and adds them to the rest of the site.
   7. **Finish.** You choose: test it on your computer, put it on the test page, or commit and push.
4. When you publish, Claude gives you the line to paste into the YouTube description.

The full instructions Claude follows are in [`.claude/skills/new-video/SKILL.md`](.claude/skills/new-video/SKILL.md).

### Screenshots of the places

Claude can take a picture from the video for each place. It shows you every picture and asks if you want it. To change one later, say for example: "Take the screenshot for Khao Soi Maesai from second 754 instead." The seconds used are listed in `screenshots.txt`. The instructions are in [`.claude/skills/screenshots/SKILL.md`](.claude/skills/screenshots/SKILL.md).

### Getting the transcript yourself

Claude can fetch the transcript from YouTube, so you don't have to. If you'd rather paste your own:

1. Open the video on YouTube on a computer.
2. Click **...more** under the video, then **Show transcript**.
3. Select the text and copy it.

Paste the description and chapters as well. Finnish is best.

## What you need

These steps are for a Mac. Open the **Terminal** app and paste each command. Or ask Claude Code: "Check that I have everything installed", and it will tell you what's missing and offer to install it.

| Program | What it's for | Needed? |
|---|---|---|
| [Claude Code](https://claude.com/claude-code) | Runs everything above | Yes |
| [Homebrew](https://brew.sh) | The easiest way to install the programs below | Yes, to install them |
| `yt-dlp` and `ffmpeg` | Fetch the YouTube transcript and take screenshots from the video | Yes |
| `git` | Saves your changes (commit) and pushes them to GitHub | Yes |
| `python3` | Shows the preview on your computer | Yes |
| `wrangler` | Puts a copy on the Cloudflare test page | Only for the test page |
| GitHub CLI (`gh`) | Creates the GitHub repository for you | Only if you want Claude to set it up |
| `whisper-cpp` and a speech model | Makes a transcript when YouTube has none | Optional |

**Install the main ones** after you've installed Homebrew:

```sh
brew install yt-dlp ffmpeg
```

`git` and `python3` come with the Mac's Command Line Tools. If the Mac asks to install them the first time you use them, say yes. Check with `git --version` and `python3 --version`.

**Test page (optional).** `wrangler` needs [Node.js](https://nodejs.org). Install it, then run `npm install -g wrangler` and `wrangler login`. This is only used to upload a test copy. The site itself never uses Node.

**GitHub CLI (optional).** Run `brew install gh`, then `gh auth login`.

**Speech to text (optional).** Run `brew install whisper-cpp`. It also needs a speech model file, and for Finnish the model must not be English-only (the file name must not end in `.en`). Ask Claude to set this up with you. Most videos don't need it, because YouTube already has captions.

**Keep `yt-dlp` up to date.** YouTube changes often. If screenshots or transcripts stop working, run `brew upgrade yt-dlp`.

## First-time setup

You only do this once. You need free GitHub and Cloudflare accounts.

### 1. Put the code on GitHub

Create an empty repository at [repo.new](https://repo.new), then run this in this folder, using your own username and repository name:

```sh
git add .
git commit -m "First version of the site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages**.
2. Select **Create application**, then the **Pages** tab.
3. Select **Import an existing Git repository** and choose your repository.
4. Use these settings:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | None |
   | Build command | `exit 0` |
   | Build output directory | `site` |

5. Select **Save and Deploy**.

From now on, every push to `main` updates the site automatically.

### 3. Set the real address

The site currently assumes it lives at `https://cmjani.pages.dev`. Search engines depend on this address being right, so fix it before submitting the site to Google.

If Cloudflare gives you a different address, or you buy a domain, ask Claude Code:

> Change the site address from https://cmjani.pages.dev to https://your-address

### 4. Add the site to Google Search Console

Search Console shows which searches bring people to the site, and tells Google about new pages. Do this after step 3, because Google treats each address as a separate site.

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in with a Google account.
2. Select **Add property** and choose **URL prefix**.
3. Enter the site address exactly, with `https://` and the slash at the end, for example `https://cmjani.pages.dev/`.
4. Under **Other verification methods**, choose **HTML file** and download the file. Its name looks like `google1234abcd5678.html`.
5. Put the file in the `site/` folder, then commit and push. You can ask Claude Code: "Add this Google verification file to the site and push it", and drag the file into the window.
6. Wait a minute for Cloudflare to publish it, and check that `https://cmjani.pages.dev/google1234abcd5678.html` opens.
7. Back in Search Console, select **Verify**.
8. In the left menu, open **Sitemaps**, type `sitemap.xml` and select **Submit**. The status should say **Success**.

Never delete the verification file. If it's removed, Google stops trusting that the site is yours.

Search Console needs a few days before it shows any data. After publishing a new video page, you can speed things up: paste the page's address into the search bar at the top of Search Console and select **Request indexing**.

If you buy your own domain later, add it as a new property and repeat these steps.

### 5. Add the site to Bing Webmaster Tools

Bing's results are also used by DuckDuckGo, Yahoo and Ecosia, so this reaches more people than Bing alone.

The easy way, once Google Search Console is done:

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in with a Microsoft, Google or Facebook account.
2. Choose **Import your sites from GSC** and sign in with the same Google account you used for Search Console.
3. Select the site and select **Import**. Bing verifies it and copies the sitemap from Google, so there's nothing else to do.

If the import doesn't work, add it by hand:

1. Under **Add your site manually**, enter the site address and select **Add**.
2. Choose **XML file**, download `BingSiteAuth.xml`, put it in the `site/` folder, then commit and push.
3. Once it's published, select **Verify**.
4. Open **Sitemaps**, select **Submit sitemap** and enter the full address, for example `https://cmjani.pages.dev/sitemap.xml`.

As with Google, never delete `BingSiteAuth.xml`.

### 6. Add Google Analytics (optional)

Google Analytics shows how many people visit, which pages they read and where they came from.

**Before you add it.** Google Analytics stores cookies and sends visitor data to Google. Visitors in Finland and the rest of the EU have to agree to that before it runs, so the site would need a cookie banner. At the moment the site loads nothing from other companies until the visitor clicks, and it has no banner. Adding Google Analytics changes that, and the privacy pages have to say so.

If you only need visitor numbers, Cloudflare Web Analytics is simpler: it uses no cookies and needs no banner. In Cloudflare, open **Workers & Pages**, select the project, open **Metrics** and enable **Web Analytics**.

**To set up Google Analytics:**

1. Go to [Google Analytics](https://analytics.google.com) and select **Start measuring**.
2. Enter an account name, for example `CMJani`, and select **Next**.
3. Enter a property name, set the time zone to Thailand and choose your currency, then select **Next**.
4. Answer the questions about the business and select **Create**. Accept the terms.
5. For the platform, choose **Web**. Enter the site address and a name such as `CMJani site`, then select **Create stream**.
6. Copy the **Measurement ID**. It starts with `G-`, for example `G-AB12CD34EF`.
7. Ask Claude Code, using your own ID:

   > Add Google Analytics with measurement ID G-AB12CD34EF. Only load it after the visitor accepts in a cookie banner, in Finnish and English. Add it to every page, both 404 pages and both templates, and update the privacy pages in both languages.

   The templates matter: new video pages are made from them, so they get Google Analytics automatically.
8. Commit and push, then open the site and accept the banner. In Google Analytics, open **Reports**, then **Realtime**. You should see your own visit within a minute.

## Preview on your computer

Double-clicking the HTML files won't work properly. Run this in this folder and open <http://localhost:8000>:

```sh
python3 -m http.server 8000 --directory site
```

Or ask Claude Code to start a preview. Cloudflare also makes a preview address for every branch you push.

## Add a social media account

Ask Claude Code, for example: "Add Jani's Instagram to the footer: https://instagram.com/..."

## Add affiliate links

Add each program to the table at the end of `CLAUDE.md`, or give Claude the link when it asks during `/new-video`. Links are labelled as ads, and the page gets a disclosure line.

## What's where

| Path | What it is |
|---|---|
| `site/` | The published website |
| `templates/` | Starting points for new posts |
| `blog_writing_rules_and_guidelines.md` | The rules every post must meet |
| `.claude/skills/new-video/` | How Claude makes a new post |
| `.claude/skills/screenshots/` | How Claude takes and changes place screenshots |
| `screenshots.txt` | Which second of the video each screenshot came from |
| `CLAUDE.md` | Project rules for Claude |
