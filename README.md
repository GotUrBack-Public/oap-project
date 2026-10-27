# Objectives as Policies — project website

Public project page for **Objectives as Policies: Vision-Language Model Cost Programs for Contact-Rich Manipulation**.

- Website: https://zihaolu001.github.io/oap-project/
- Research code: https://github.com/ZihaoLu001/OaP

Authors: Zihao Lu*, Trong Gia Hung Nguyen*, Fuquan Wang, and Yifan Zhu. All authors are with the University of Illinois Chicago. *Equal contribution.

## Editing

This is a static website. Edit `index.html` for text, authors, links, and BibTeX; edit `static/css/index.css` for styles and `static/js/index.js` for the task selector. Videos and figures live in `static/`. Fonts and icons are hosted locally.

GitHub Pages publishes the root of the `main` branch. No build step is needed.

For a local preview, run `python -m http.server 8000` in this directory and open `http://localhost:8000`.

## When the arXiv paper is available

1. Replace the disabled arXiv button in `index.html` with a link to the paper's arXiv abstract page.
2. Add the assigned identifier to the BibTeX entry and remove the pending-publication note.
3. Replace `static/paper/oap.pdf` when publishing an updated PDF.

The website uses the author names and order from the arXiv preprint. Video playback duration is not a measurement of robot execution time.

## Template

Adapted from [Nerfies](https://nerfies.github.io/) by Keunhong Park and contributors, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Changes include OaP content, local assets, a task selector, results, and a copyable citation. The template attribution remains in the footer. See `static/vendor/THIRD_PARTY_NOTICES.md` for dependency notices.

The website source license is separate from the Apache-2.0 license of the OaP research code repository.
