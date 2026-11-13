# Gabriel Johnston — personal website

Live at https://orionjohnston.github.io/Website2/

A static site with no build step: three HTML pages, one stylesheet, one script.

| File | What it is |
|------|------------|
| `index.html` | Home: introduction, featured recording, recent news, contact |
| `academic.html` | Research, publications, presentations, positions, teaching, awards |
| `music.html` | Recordings, professional experience, ensembles, teachers |
| `404.html` | Not-found page served by GitHub Pages |
| `css/site.css` | All styles |
| `js/script.js` | Mobile menu, click-to-play videos, homepage globe |
| `images/` | Photos, video thumbnails, favicon |
| `docs/` | Downloadable CVs (PDF) |

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

GitHub Pages serves the `main` branch, so pushing to `main` updates the live site within a minute or two.

## Updating content

- **CVs**: replace `docs/Gabriel_Johnston_CV.pdf` and `docs/Gabriel_Johnston_Music_CV.pdf`, keeping the filenames.
- **A new video**: copy one of the `<a class="video">` blocks in `music.html`, change the YouTube ID in both `href` and `data-video-id`, and add a thumbnail to `images/`.
