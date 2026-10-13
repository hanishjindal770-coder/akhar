# Akhar · ਅੱਖਰ

A free Punjabi typing tutor for the **Raavi font** and the **Gurmukhi INSCRIPT keyboard**. This is the layout and font used in the typing tests for Punjab govt clerk and typist posts.

## What it does

- **57 lessons in seven stages, each with 6 to 8 exercises.** They start with ਕ ਤ ਰ ਚ on the home row and go through the matras, the Shift letters, tippi and bindi, addak (ੱ), pair bindi (਼), pairi rara (੍ਰ) and numerals. Then come themed word lists, sentences and full exam paragraphs. Each drill uses real Punjabi words built only from the keys learned so far.
- **On-screen keyboard.** It highlights the next key and shows which finger presses it. You can tap it on phones.
- **PSSSB mock test** at `psssb-typing-test.html`. It runs Punjabi then English like the real sitting, in a full-screen exam screen with no live error marks, and ends with a printable result sheet.
- **Practice mode.** It has 12 exam-style passages, common words, sentences, and a drill built from the keys you miss most.
- **Timed exam test** (2, 5, 10 or 15 minutes). It is scored the way the board's typing-test notices describe:
  - full mistake: a missed, wrong or extra word, or missing punctuation
  - half mistake: a spacing error
  - error characters = mistakes × 5
  - net WPM = (gross characters − error characters) ÷ 5 ÷ minutes
  - accuracy = net characters ÷ gross characters × 100
  - you qualify at 30 WPM with 92% accuracy (both can be changed)
- **Progress page.** It shows a speed chart, your test history and a heat map of your weak keys. Everything is stored in `localStorage` on your device.

You type on a normal English keyboard and the app converts each key to INSCRIPT, so nothing needs to be installed. If the Windows Punjabi keyboard is already turned on, that works too.

## Run it

This is a static site with no build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

To host it for free, turn on GitHub Pages: go to Settings → Pages, choose Deploy from branch, then select `main` and `/ (root)`.

## Files

- `index.html`: the page markup
- `styles.css`: the theme, with both light and dark modes
- `js/data.js`: the keyboard layout, lessons, word bank and exam passages
- `js/core.js`: shared helpers, key maps, storage, on-screen keyboard and exam scoring
- `js/app.js`: the lesson generator, drill runner, quick exam test and progress tracking
- `js/exam.js` and `psssb-typing-test.html`: the PSSSB mock test with candidate login, instructions, a fixed timer per part (Punjabi, then English), auto submit and a printable result sheet
