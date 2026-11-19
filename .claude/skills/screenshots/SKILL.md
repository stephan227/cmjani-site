---
name: screenshots
description: Take or retake a screenshot of a place from a CMJani video and put it on the post. Use when someone wants pictures for a post, or says "take a screenshot of X from second N", "use another moment for X" or "change the picture for X".
---

# Screenshots from the video

Each place (stop) on a post can have one picture taken from the video. Read `CLAUDE.md` first.

The tools are `yt-dlp` and `ffmpeg`. Check them first with `which yt-dlp ffmpeg`. If one is missing, point the user to "What you need" in `README.md` and offer to install it with Homebrew (ask first). Don't write scripts. Each screenshot is one command.

**The user may not be technical.** Ask in plain words, one place at a time, and never ask them to run a command.

## Files

- Pictures: `site/assets/shots/<video-id>-<place-slug>.jpg`. The place slug is lowercase, unaccented and hyphenated, like `khao-soi-maesai`.
- Log: `screenshots.txt` in the repo root. It's private and never published. It has one line per picture, so a picture can be retaken later. Create the file if it doesn't exist.

Log line format:

```
Post: <fi-slug> | Video: <VIDEO_ID> | Place: <place name> | Second: <seconds> (<m:ss>) | File: <path>
```

## Take a screenshot

1. **Pick the moment.** Use the stop's timestamp from the post, or the second the user names.
2. **Run this**, with the video ID, the second and the file name filled in:
   ```
   mkdir -p site/assets/shots
   ffmpeg -loglevel error -ss SECONDS -i "$(yt-dlp -f 'bv*[height<=720]' -g 'https://www.youtube.com/watch?v=VIDEO_ID')" -frames:v 1 -q:v 3 -y site/assets/shots/VIDEO_ID-PLACE-SLUG.jpg
   ```
   If it fails, run `brew upgrade yt-dlp` and try again. If it still fails, tell the user and move on without a picture.
3. **Look at it yourself** with Read. If it's black, blurry or mid-transition, try 2 to 3 seconds later before you show anyone.
4. **Show it to the user** with `open site/assets/shots/<file>.jpg`. It opens in Preview.
5. **Ask whether to use it**, for this place only, saying the second and the place:
   "This is the video at 12:34 for Khao Soi Maesai. Is it the right place, and do you want it on the page?"
   Offer these choices: **Yes, use it** / **No, try another second** / **Skip this place**.
   - Yes: add it to the page and the log.
   - Another second: always ask, with these two choices: **Open the video so I can find the second** (run `open "https://www.youtube.com/watch?v=VIDEO_ID&t=SECONDSs"` at the place's timestamp, then wait for them to tell you the second) / **I'll type a second**. Never guess a second yourself after a "no". Then go back to step 2.
   - Skip: delete the picture file and leave that place without one. Don't log it.
6. **Never move on to the next place until the user answers.** Never use a picture they haven't approved.

**Video is a file on the computer.** Use the file's path in place of the `$(yt-dlp ...)` part: `ffmpeg -loglevel error -ss SECONDS -i "/path/to/video.mp4" -frames:v 1 -q:v 3 -y site/assets/shots/...jpg`. To let the user watch it, run `open "/path/to/video.mp4"` instead of opening YouTube. Use the video ID in the file name if there is one, otherwise the Finnish slug.

## Put it on the page

Do this only after the user says yes. If the pages don't exist yet (the `/new-video` flow is still running), only save the picture and log it. `/new-video` adds the pictures when it writes the pages. Otherwise add it to both language pages. The picture is the same, but the alt text is written for each language.

1. Add the `img` from the template (the `SCREENSHOT` comment) between the stop's note and its address.
2. The alt text says what the picture shows, including the place. Don't invent details you can't see.
3. Set `width` and `height` to the real picture size. It's 1280 × 720 for a normal video. Check with `ffprobe -loglevel error -show_entries stream=width,height -of csv=p=0 <file>` if unsure.
4. Add or update the line in `screenshots.txt`.

## Change a screenshot later

When the user says something like "take the picture for Khao Soi Maesai from second 754 instead":

1. Find the place in `screenshots.txt` to get the video ID and file name. If it isn't there, take a new one as above.
2. Run the same command with the new second. It overwrites the old picture, so the pages don't need to change.
3. Show it, ask the same question, and keep the old one if they say no. To keep the old one, take the new picture to a different file name first, such as `-new.jpg`, and only replace the old file after they say yes.
4. After a yes, update that line's second in `screenshots.txt`.

## Finish

Tell the user which places got a picture and which didn't. After a first pass for a new post, remind them that the log is `screenshots.txt` and that they can ask for any picture to be changed.
