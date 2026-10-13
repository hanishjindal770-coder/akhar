/* Shared by the main app and the exam page: helpers, key maps, storage, on-screen keyboard, scoring. */
/* ================= core helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MARK_RE = /[ਁ-ਃ਼ਾ-੍ੑੰੱੵ]/;
const CONS_RE = /[ਕ-ਹਖ਼-ਫ਼]/;
const GURU_RE = /[਀-੿।॥]/;
const isMark = c => MARK_RE.test(c);
const isCons = c => CONS_RE.test(c);
const showMark = c => isMark(c) ? '◌' + c : c;

// One canonical spelling so typed text and passages compare cleanly.
function canon(s) {
  return s.normalize('NFD')
    .replace(/ਸ਼/g, 'ਸ਼')
    .replace(/ਲ਼/g, 'ਲ਼')
    .replace(/‌|‍/g, '');
}

// Visual clusters: base + marks, and halant joins the next consonant (ਪ੍ਰ, ਪੜ੍ਹ).
function clusters(cps) {
  const out = []; let i = 0;
  while (i < cps.length) {
    const s = i; i++;
    while (i < cps.length && isMark(cps[i])) {
      if (cps[i] === '੍' && i + 1 < cps.length && isCons(cps[i + 1])) { i += 2; continue; }
      i++;
    }
    out.push([s, i]);
  }
  return out;
}

function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
function shuffle(r, a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ================= key maps ================= */
const KEYMAP = {}; const REV = {};
ROWS.forEach(row => row.forEach(([code, en, n, s]) => {
  KEYMAP[code] = {en, n, s};
  if (n && [...n].length === 1 && !REV[n]) REV[n] = {code, shift: false};
}));
ROWS.forEach(row => row.forEach(([code, en, n, s]) => { if (s && [...s].length === 1 && !REV[s]) REV[s] = {code, shift: true}; }));
REV[' '] = {code: 'Space', shift: false};
const LEFT = c => FINGER[c] !== undefined && FINGER[c] <= 3;

function charFromEvent(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return null;
  if (e.key && e.key.length <= 2 && [...e.key].length === 1 && GURU_RE.test(e.key)) return e.key; // OS Punjabi keyboard already on
  if (e.code === 'Space') return ' ';
  const k = KEYMAP[e.code]; if (!k) return null;
  return (e.shiftKey ? k.s : k.n) || null;
}
function keyLabel(ch) {
  const r = REV[ch]; if (!r) return '';
  if (r.code === 'Space') return 'Space';
  const en = KEYMAP[r.code].en;
  return (r.shift ? 'Shift + ' : '') + en;
}

/* ================= storage ================= */
const KEY = 'akhar.v1';
function loadDB() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
const DB = Object.assign({lp: {}, tests: [], weak: {}, seen: {}, settings: {}}, loadDB());
delete DB.lessons; // numbering from the first version no longer matches
DB.settings = Object.assign({sound: true, kb: true, theme: 'system', target: 30, size: 'm'}, DB.settings);
let saveT = 0;
function save() { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} }, 150); }

/* ================= sound ================= */
let AC = null;
function beep() {
  if (!DB.settings.sound) return;
  try { AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain(); o.type = 'square'; o.frequency.value = 220;
    g.gain.setValueAtTime(0.05, AC.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + 0.09);
    o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime + 0.1);
  } catch (e) {}
}

/* ================= on-screen keyboard ================= */
const EXTRA = {Backspace:['⌫ Backspace',2], Tab:['Tab',1.5], CapsLock:['Caps',1.8], Enter:['Enter',2.2], ShiftLeft:['Shift',2.4], ShiftRight:['Shift',2.6], Space:['Space · ਖਾਲੀ ਥਾਂ',8]};
function buildKeyboard(el, onTap) {
  const rows = [
    [...ROWS[0].map(r => r[0]), 'Backspace'],
    ['Tab', ...ROWS[1].map(r => r[0])],
    ['CapsLock', ...ROWS[2].map(r => r[0]), 'Enter'],
    ['ShiftLeft', ...ROWS[3].map(r => r[0]), 'ShiftRight'],
    ['Space']
  ];
  el.innerHTML = rows.map(row => `<div class="kb-row">${row.map(code => {
    const f = FINGER[code] ?? 9;
    if (EXTRA[code]) return `<button type="button" class="key mod f${f}" data-code="${code}" style="flex-grow:${EXTRA[code][1]}" tabindex="-1"><span class="k-e">${EXTRA[code][0]}</span></button>`;
    const k = KEYMAP[code];
    return `<button type="button" class="key f${f}${code==='KeyF'||code==='KeyJ'?' bump':''}" data-code="${code}" tabindex="-1" aria-label="${k.en}">
      <span class="k-s guru">${k.s ? esc(showMark(k.s)) : ''}</span><span class="k-n guru">${k.n ? esc(showMark(k.n)) : ''}</span><span class="k-e">${esc(k.en)}</span></button>`;
  }).join('')}</div>`).join('');
  if (onTap) {
    let shift = false;
    el.addEventListener('pointerdown', e => {
      const b = e.target.closest('.key'); if (!b) return; e.preventDefault();
      const code = b.dataset.code;
      if (code === 'ShiftLeft' || code === 'ShiftRight') { shift = !shift; el.classList.toggle('shifted', shift); return; }
      if (code === 'Backspace') { onTap(null, code, 'Backspace'); return; }
      if (code === 'Space') { onTap(' ', code); return; }
      const k = KEYMAP[code]; if (!k) return;
      const ch = shift ? k.s : k.n;
      if (shift) { shift = false; el.classList.remove('shifted'); }
      if (ch) onTap(ch, code);
    });
  }
}
function kbClear(el, cls) { $$('.' + cls, el).forEach(k => k.classList.remove(cls)); }
function kbMark(el, code, cls) { const k = el.querySelector(`[data-code="${code}"]`); if (k) k.classList.add(cls); }
function kbNext(el, ch) {
  kbClear(el, 'next');
  const r = REV[ch]; if (!r) return null;
  kbMark(el, r.code, 'next');
  if (r.shift) kbMark(el, LEFT(r.code) ? 'ShiftRight' : 'ShiftLeft', 'next');
  return r;
}
function kbFlash(el, code, cls = 'wrong') {
  const k = el.querySelector(`[data-code="${code}"]`); if (!k) return;
  k.classList.remove(cls); void k.offsetWidth; k.classList.add(cls);
  setTimeout(() => k.classList.remove(cls), 260);
}


/*
  Scoring follows the published Punjab typing-test method:
  full mistake  = omitted, wrong or extra word (punctuation counts; a wrong matra makes the whole word wrong)
  half mistake  = spacing error (two words joined or one word split)
  error chars   = mistakes x 5;  net chars = gross - error chars
  gross WPM     = floor(gross chars / 5 / minutes);  net WPM = net chars / 5 / minutes
  accuracy      = net chars / gross chars x 100
*/
function scoreTest(origText, typedText, minutes) {
  const O = canon(origText).trim().split(/\s+/).filter(Boolean);
  const T = canon(typedText).trim().split(/\s+/).filter(Boolean);
  const n = T.length, m = O.length, W = m + 1;
  const dp = new Float64Array((n + 1) * W).fill(1e9), op = new Uint8Array((n + 1) * W);
  dp[0] = 0;
  for (let j = 1; j <= m; j++) { dp[j] = j; op[j] = 2; }
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      let best = dp[(i - 1) * W + j] + 1, o = 3; // extra word
      if (j > 0) {
        const d = dp[(i - 1) * W + j - 1] + (T[i - 1] === O[j - 1] ? 0 : 1);
        if (d < best || (d === best && T[i - 1] === O[j - 1])) { best = d; o = 1; }
        const del = dp[i * W + j - 1] + 1; if (del < best) { best = del; o = 2; }
        if (j > 1 && T[i - 1] === O[j - 2] + O[j - 1]) { const v = dp[(i - 1) * W + j - 2] + 0.5; if (v < best) { best = v; o = 4; } }
        if (i > 1 && T[i - 2] + T[i - 1] === O[j - 1]) { const v = dp[(i - 2) * W + j - 1] + 0.5; if (v < best) { best = v; o = 5; } }
      }
      dp[i * W + j] = best; op[i * W + j] = o;
    }
  }
  // the candidate is not expected to finish the passage: stop where alignment is cheapest
  let bj = 0, bv = Infinity;
  for (let j = 0; j <= m; j++) { const v = dp[n * W + j]; if (v <= bv) { bv = v; bj = j; } } // furthest point among equal costs
  const items = []; let i = n, j = bj;
  while (i > 0 || j > 0) {
    const o = op[i * W + j];
    if (i === 0) { items.push({k: 'omit', o: O[j - 1]}); j--; continue; }
    if (o === 1) { items.push({k: T[i - 1] === O[j - 1] ? 'ok' : 'sub', o: O[j - 1], t: T[i - 1]}); i--; j--; }
    else if (o === 2) { items.push({k: 'omit', o: O[j - 1]}); j--; }
    else if (o === 3) { items.push({k: 'extra', t: T[i - 1]}); i--; }
    else if (o === 4) { items.push({k: 'join', o: O[j - 2] + ' ' + O[j - 1], t: T[i - 1]}); i--; j -= 2; }
    else if (o === 5) { items.push({k: 'split', o: O[j - 1], t: T[i - 2] + ' ' + T[i - 1]}); i -= 2; j--; }
    else break;
  }
  items.reverse();
  const L = w => [...w].length;
  let gross = 0, full = 0, half = 0;
  items.forEach(it => {
    if (it.k === 'ok') gross += L(it.o) + 1;
    else if (it.k === 'sub') { gross += Math.min(L(it.t), L(it.o)) + 1; full++; }
    else if (it.k === 'extra') { gross += L(it.t) + 1; full++; }
    else if (it.k === 'omit') full++;
    else if (it.k === 'join') { gross += L(it.t) + 1; half++; }
    else if (it.k === 'split') { gross += L(it.t.replace(' ', '')) + 2; half++; }
  });
  if (gross > 0) gross -= 1;
  const mistakes = full + half / 2;
  const errChars = mistakes * 5;
  const net = Math.max(0, gross - errChars);
  return {items, gross, full, half, mistakes, errChars, net,
    grossWpm: Math.floor(gross / 5 / minutes), netWpm: net / 5 / minutes,
    accuracy: gross ? 100 * net / gross : 0, typedWords: T.length, attempted: bj};
}
