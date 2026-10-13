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
const DB = Object.assign({lessons: {}, tests: [], weak: {}, seen: {}, settings: {}}, loadDB());
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

/* ================= routing ================= */
const VIEWS = ['home', 'learn', 'drill', 'practice', 'exam', 'keyboard', 'progress'];
let current = 'home';
function go(v, push = true) {
  if (!VIEWS.includes(v)) v = 'home';
  if (v === 'drill' && !D) v = 'learn';
  if (current === 'exam' && v !== 'exam' && E && E.running) finishExam(false, true);
  if (current === 'drill' && v !== 'drill') stopDrillTimer();
  current = v;
  VIEWS.forEach(n => { const s = $('#v-' + n); if (s) s.hidden = n !== v; });
  $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.v === v || (v === 'drill' && a.dataset.v === (D && D.kind === 'lesson' ? 'learn' : 'practice'))));
  if (push && v !== 'drill') { try { history.replaceState(null, '', '#' + v); } catch (e) {} }
  if (v === 'home') renderHome();
  if (v === 'learn') renderLessons();
  if (v === 'practice') renderPractice();
  if (v === 'progress') renderProgress();
  if (v === 'exam' && !(E && E.running)) showExamPanel('setup');
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => go(location.hash.slice(1), false));

/* ================= lesson generation ================= */
function learnedUpTo(id) {
  const s = new Set([' ']);
  LESSONS.forEach(l => { if (l.id <= id) l.keys.forEach(k => s.add(canon(k))); });
  return s;
}
function unitFor(r, c, cons) {
  const base = cons.length ? pick(r, cons) : 'ਕ';
  if (c === '਼') return pick(r, ['ਖ', 'ਗ', 'ਜ', 'ਫ']) + c;
  if (c === '੍') return base + c + pick(r, ['ਰ', 'ਰ', 'ਹ', 'ਵ']);
  if (c === 'ੱ') { const b2 = pick(r, cons.filter(x => x !== 'ਹ')) || 'ਕ'; return base + c + b2 + 'ਾ'; }
  if (c === 'ਂ') return base + pick(r, ['ਾ', 'ੀ', 'ੇ', 'ੈ', 'ੋ']) + c;
  if (c === 'ੰ') return base + pick(r, ['', 'ਿ', 'ੁ', 'ੂ']) + c;
  if (isMark(c)) return base + c;
  return c;
}
function genLesson(lesson, seed) {
  const r = rng(seed * 7919 + lesson.id);
  if (lesson.special === 'words') {
    const pool = shuffle(r, [...new Set(WORDS)]);
    return [pool.slice(0, 14).join(' '), pool.slice(14, 28).join(' '), pool.slice(28, 40).join(' ')].join(' ');
  }
  if (lesson.special === 'sentences') return shuffle(r, SENTENCES).slice(0, 5).join(' ');
  const learned = learnedUpTo(lesson.id);
  const fresh = lesson.keys.map(canon);
  const cons = [...learned].filter(isCons).filter(c => c.length === 1);
  const parts = [];
  if (lesson.id === 18) {
    for (let i = 0; i < 14; i++) { let w = ''; const n = 2 + Math.floor(r() * 3); for (let j = 0; j < n; j++) w += pick(r, fresh); parts.push(w); }
    return fresh.join(' ') + ' ' + parts.join(' ');
  }
  // 1) each new key three times
  fresh.forEach(c => { for (let i = 0; i < 3; i++) parts.push(/[,\u0964]/.test(c) ? pick(r, cons) + pick(r, ['\u0A3E', '', '\u0A40']) + pick(r, cons) + c : unitFor(r, c, cons)); });
  // 2) short syllable groups mixing the new keys with ones already learned
  const MATRAS = ['\u0A3E','\u0A3F','\u0A40','\u0A41','\u0A42','\u0A47','\u0A48','\u0A4B','\u0A4C'].filter(c => learned.has(c));
  const letters = [...learned].filter(k => k !== ' ' && !isMark(k) && !/[,\u0964]/.test(k));
  const syl = c => {
    if (c === ',' || c === '\u0964') return syl(pick(r, letters.length ? letters : ['ਕ'])) + c;
    if (isMark(c)) return unitFor(r, c, cons);
    return c + (isCons(c) && MATRAS.length && r() < 0.45 ? pick(r, MATRAS) : '');
  };
  for (let i = 0; i < 10; i++) {
    const n = 2 + Math.floor(r() * 2); const featured = Math.floor(r() * n); let w = '';
    for (let j = 0; j < n; j++) {
      const c = j === featured ? pick(r, fresh) : pick(r, letters.length ? letters : fresh);
      const part = syl(c);
      w += (j < n - 1 && /[,\u0964]$/.test(part)) ? part.slice(0, -1) : part;
    }
    parts.push(w);
  }
  // 3) real words using only learned keys and at least one new key
  const ok = w => { const cps = [...canon(w)]; return cps.every(c => learned.has(c)) && cps.some(c => fresh.includes(c)); };
  let words = [...new Set(WORDS.filter(ok))];
  if (lesson.id === 9) words = shuffle(r, SENTENCES.filter(s => [...canon(s)].every(c => learned.has(c) || c === ' '))).slice(0, 2);
  if (words.length) { const ws = shuffle(r, words); for (let i = 0; i < Math.min(18, Math.max(8, ws.length)); i++) parts.push(ws[i % ws.length]); }
  return parts.join(' ');
}

/* ================= drill runner ================= */
let D = null;
function startDrill(cfg) {
  stopDrillTimer();
  const text = canon(cfg.text).replace(/\s+/g, ' ').trim();
  const cps = [...text];
  const cl = clusters(cps);
  const clusterOf = new Int32Array(cps.length);
  cl.forEach(([a, b], i) => { for (let k = a; k < b; k++) clusterOf[k] = i; });
  D = Object.assign({}, cfg, {cps, cl, clusterOf, pos: 0, errors: 0, correct: 0, start: 0, errCl: new Set(), done: false, timer: 0});
  $('#d-title').textContent = cfg.title;
  $('#d-sub').textContent = cfg.sub || '';
  $('#d-tip').innerHTML = cfg.tip ? esc(cfg.tip) : '';
  $('#d-tip').hidden = !cfg.tip;
  const box = $('#d-text');
  box.innerHTML = cl.map(([a, b], i) => `<span class="ch${cps[a] === ' ' ? ' sp' : ''}">${esc(cps.slice(a, b).join(''))}</span>`).join('');
  D.spans = [...box.children];
  box.scrollTop = 0;
  $('#d-result').hidden = true;
  $('#d-stage').hidden = false;
  paintRange(0, 0);
  updateHint(); updateLive();
  go('drill');
}
function clState(i) {
  const [a, b] = D.cl[i];
  if (b <= D.pos) return D.errCl.has(i) ? 'ch done err' : 'ch done';
  if (a <= D.pos && D.pos < b) return 'ch cur' + (D.errCl.has(i) ? ' err' : '') + (D.pos > a ? ' part' : '');
  return 'ch';
}
function paintRange(i0, i1) {
  for (let i = i0; i <= i1 && i < D.spans.length; i++) {
    D.spans[i].className = clState(i) + (D.cps[D.cl[i][0]] === ' ' ? ' sp' : '');
  }
  const cur = D.spans[D.clusterOf[Math.min(D.pos, D.cps.length - 1)]];
  if (cur) {
    const box = $('#d-text');
    const top = cur.offsetTop - box.offsetTop;
    if (top > box.scrollTop + box.clientHeight - 70 || top < box.scrollTop) box.scrollTop = Math.max(0, top - 50);
  }
}
function updateHint() {
  const kb = $('#d-kb');
  if (!D || D.pos >= D.cps.length) { kbClear(kb, 'next'); $('#d-hint').innerHTML = ''; return; }
  const ch = D.cps[D.pos];
  const r = kbNext(kb, ch);
  let html = `<span class="hint-ch guru">${ch === ' ' ? '␣' : esc(showMark(ch))}</span>`;
  if (r) html += `<span class="hint-key">${esc(keyLabel(ch))}</span><span class="hint-f">${FINGER_NAME[FINGER[r.code]] || ''}</span>`;
  if (ch === 'ਿ') html += `<span class="hint-note">Sihari shows before the letter but is typed after it.</span>`;
  $('#d-hint').innerHTML = html;
}
function elapsedMin() { return D && D.start ? (performance.now() - D.start) / 60000 : 0; }
function updateLive() {
  if (!D) return;
  const m = elapsedMin();
  const wpm = m > 0.02 ? (D.correct / 5) / m : 0;
  const acc = D.correct + D.errors ? 100 * D.correct / (D.correct + D.errors) : 100;
  const s = Math.floor(m * 60);
  $('#d-wpm').textContent = Math.round(wpm);
  $('#d-acc').textContent = acc.toFixed(0) + '%';
  $('#d-err').textContent = D.errors;
  $('#d-time').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  $('#d-bar').style.width = (100 * D.pos / D.cps.length).toFixed(1) + '%';
}
function stopDrillTimer() { if (D && D.timer) { clearInterval(D.timer); D.timer = 0; } }
function drillInput(ch, code) {
  if (!D || D.done) return;
  if (!D.start) { D.start = performance.now(); D.timer = setInterval(updateLive, 500); }
  const exp = D.cps[D.pos];
  const seq = [...canon(ch)];
  const ok = seq.every((c, k) => D.cps[D.pos + k] === c);
  DB.seen[exp] = (DB.seen[exp] || 0) + 1;
  const kb = $('#d-kb');
  if (ok) {
    const c0 = D.clusterOf[D.pos];
    D.pos += seq.length; D.correct += seq.length;
    const c1 = D.clusterOf[Math.min(D.pos, D.cps.length - 1)];
    paintRange(c0, c1);
    if (code) kbFlash(kb, code, 'hit');
  } else {
    D.errors++; D.errCl.add(D.clusterOf[D.pos]);
    DB.weak[exp] = (DB.weak[exp] || 0) + 1;
    paintRange(D.clusterOf[D.pos], D.clusterOf[D.pos]);
    if (code) kbFlash(kb, code, 'wrong');
    const box = $('#d-text'); box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    beep();
  }
  save();
  if (D.pos >= D.cps.length) finishDrill(); else { updateHint(); updateLive(); }
}
function finishDrill() {
  D.done = true; stopDrillTimer(); updateLive(); updateHint();
  const m = Math.max(elapsedMin(), 1 / 60);
  const wpm = (D.cps.length / 5) / m;
  const acc = 100 * D.correct / (D.correct + D.errors);
  let msg = '', next = null;
  if (D.kind === 'lesson') {
    const prev = DB.lessons[D.lessonId] || {};
    const passed = acc >= 90;
    DB.lessons[D.lessonId] = {done: prev.done || passed, wpm: Math.max(prev.wpm || 0, passed ? wpm : 0), acc: Math.max(prev.acc || 0, acc), tries: (prev.tries || 0) + 1};
    save();
    msg = passed ? 'Lesson complete. Accuracy is above 90%, so the next lesson is ready.' : 'Aim for 90% accuracy to complete this lesson. Slow down and try again.';
    if (passed) next = LESSONS.find(l => l.id === D.lessonId + 1);
  } else {
    msg = acc >= 92 ? 'Accuracy is above the 92% exam bar.' : 'The exam needs 92% accuracy. Slow down a little and focus on the matras.';
  }
  $('#r-wpm').textContent = Math.round(wpm);
  $('#r-acc').textContent = acc.toFixed(1) + '%';
  $('#r-err').textContent = D.errors;
  $('#r-time').textContent = (m * 60).toFixed(0) + 's';
  $('#r-msg').textContent = msg;
  $('#r-next').hidden = !next;
  $('#r-next').dataset.id = next ? next.id : '';
  $('#d-result').hidden = false;
  $('#d-stage').hidden = true;
}
function startLesson(id, seedBump = 0) {
  const l = LESSONS.find(x => x.id === id); if (!l) return;
  const tries = (DB.lessons[id] && DB.lessons[id].tries) || 0;
  startDrill({kind: 'lesson', lessonId: id, title: `Lesson ${id} · ${l.t}`, sub: l.pa, tip: l.tip, text: genLesson(l, tries + seedBump + 1)});
}
function retryDrill() {
  if (!D) return;
  if (D.kind === 'lesson') return startLesson(D.lessonId, Math.floor(Math.random() * 1000));
  if (D.regen) return startDrill(Object.assign({}, D, {text: D.regen()}));
  startDrill({kind: D.kind, title: D.title, sub: D.sub, tip: D.tip, text: D.cps.join(''), regen: D.regen});
}

/* ================= lists ================= */
function renderLessons() {
  const nextId = (LESSONS.find(l => !(DB.lessons[l.id] && DB.lessons[l.id].done)) || {}).id;
  $('#lesson-list').innerHTML = LESSONS.map(l => {
    const p = DB.lessons[l.id] || {};
    const keys = l.keys.length ? l.keys.map(k => `<span class="kc guru">${esc(showMark(k))}</span>`).join('') : `<span class="kc-all">All keys</span>`;
    const state = p.done ? `<span class="pill good">Done · ${Math.round(p.wpm)} WPM</span>` : (l.id === nextId ? `<span class="pill acc">Up next</span>` : (p.tries ? `<span class="pill">Best ${Math.round(p.acc)}%</span>` : ''));
    return `<button type="button" class="lesson${p.done ? ' is-done' : ''}${l.id === nextId ? ' is-next' : ''}" data-id="${l.id}">
      <span class="l-num">${l.id}</span>
      <span class="l-body"><span class="l-t">${esc(l.t)}</span><span class="l-pa guru">${esc(l.pa)}</span><span class="l-keys">${keys}</span></span>
      <span class="l-state">${state}</span></button>`;
  }).join('');
  const done = LESSONS.filter(l => DB.lessons[l.id] && DB.lessons[l.id].done).length;
  $('#learn-count').textContent = `${done} of ${LESSONS.length} complete`;
}
function weakList() {
  return Object.keys(DB.seen).filter(c => c !== ' ' && (DB.seen[c] || 0) >= 5 && DB.weak[c])
    .map(c => ({c, rate: DB.weak[c] / DB.seen[c], n: DB.weak[c]})).sort((a, b) => b.rate - a.rate).slice(0, 8);
}
function weakText() {
  const weak = weakList().map(w => w.c);
  const r = rng(Date.now() & 0xffff);
  if (!weak.length) return shuffle(r, WORDS).slice(0, 30).join(' ');
  const ws = WORDS.map(canon).filter(w => [...w].some(c => weak.includes(c)));
  const cons = [...'ਕਤਰਪਸਮਨਲਦਗ'];
  const drills = []; weak.slice(0, 5).forEach(c => { for (let i = 0; i < 3; i++) drills.push(unitFor(r, c, cons)); });
  return drills.join(' ') + ' ' + shuffle(r, ws).slice(0, 30).join(' ');
}
function renderPractice() {
  const weak = weakList();
  $('#weak-keys').innerHTML = weak.length ? weak.slice(0, 6).map(w => `<span class="kc guru">${esc(showMark(w.c))}</span>`).join('') : '<span class="muted">Type a few lessons first and your slowest keys will show here.</span>';
  $('#passage-list').innerHTML = PASSAGES.map((p, i) => {
    const words = p.x.split(/\s+/).length;
    return `<button type="button" class="passage" data-i="${i}"><span class="p-t guru">${esc(p.t)}</span><span class="p-en">${esc(p.en)}</span><span class="p-meta">${words} words · ${[...p.x].length} characters</span><span class="p-prev guru">${esc(p.x.slice(0, 70))}…</span></button>`;
  }).join('');
}

/* ================= exam ================= */
let E = null;
function showExamPanel(name) { ['setup', 'run', 'result'].forEach(n => { $('#x-' + n).hidden = n !== name; }); }
function examText(startIdx, minutes) {
  const need = minutes * 45; let out = [], words = 0, i = startIdx;
  do { out.push(PASSAGES[i % PASSAGES.length].x); words += PASSAGES[i % PASSAGES.length].x.split(/\s+/).length; i++; } while (words < need && i - startIdx < PASSAGES.length);
  return canon(out.join(' '));
}
function startExam() {
  const sel = $('#x-passage').value;
  const idx = sel === 'random' ? Math.floor(Math.random() * PASSAGES.length) : +sel;
  const minutes = +$('#x-dur').value;
  const allowBack = $('#x-back').checked;
  const highlight = $('#x-hl').checked;
  const target = +$('#x-target').value || 30;
  DB.settings.target = target; save();
  const text = examText(idx, minutes);
  E = {idx, minutes, allowBack, highlight, target, text, words: text.split(' '), start: 0, running: true, keys: 0, timer: 0, title: PASSAGES[idx].t};
  $('#x-ptitle').textContent = PASSAGES[idx].t;
  $('#x-src').innerHTML = E.words.map((w, i) => `<span data-w="${i}">${esc(w)}</span>`).join(' ');
  $('#x-src').scrollTop = 0;
  const ta = $('#x-input'); ta.value = ''; ta.disabled = false;
  $('#x-clock').textContent = `${minutes}:00`;
  $('#x-clock').classList.remove('low');
  $('#x-status').textContent = 'The timer starts with your first keystroke.';
  showExamPanel('run');
  setTimeout(() => ta.focus(), 30);
}
function examTick() {
  const left = Math.max(0, E.minutes * 60 - (performance.now() - E.start) / 1000);
  const s = Math.ceil(left);
  $('#x-clock').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  $('#x-clock').classList.toggle('low', s <= 60);
  if (left <= 0) finishExam(true);
}
function examBegin() { if (E.start) return; E.start = performance.now(); E.timer = setInterval(examTick, 250); $('#x-status').textContent = 'Typing. Submit any time, or the test ends when the clock reaches zero.'; }
function examHighlight() {
  if (!E || !E.highlight) return;
  const n = $('#x-input').value.trim() ? $('#x-input').value.trim().split(/\s+/).length : 0;
  const ends = /\s$/.test($('#x-input').value);
  const idx = ends ? n : Math.max(0, n - 1);
  $$('#x-src .cw').forEach(s => s.classList.remove('cw'));
  const s = $(`#x-src [data-w="${idx}"]`); if (s) { s.classList.add('cw'); const box = $('#x-src'); const top = s.offsetTop - box.offsetTop; if (top > box.scrollTop + box.clientHeight - 40) box.scrollTop = top - 40; }
}
function examInsert(ch) {
  const ta = $('#x-input');
  ta.setRangeText(ch, ta.selectionStart, ta.selectionEnd, 'end');
  examBegin(); E.keys++; examHighlight();
}
function finishExam(timeUp, silent) {
  if (!E || !E.running) return;
  E.running = false; clearInterval(E.timer);
  $('#x-input').disabled = true;
  if (silent) return;
  const usedMin = E.start ? (timeUp ? E.minutes : Math.max(0.25, (performance.now() - E.start) / 60000)) : E.minutes;
  const res = scoreTest(E.text, $('#x-input').value, usedMin);
  res.passed = res.grossWpm >= E.target && res.accuracy >= 92;
  DB.tests.push({d: Date.now(), p: PASSAGES[E.idx].id, t: E.title, m: +usedMin.toFixed(2), g: res.grossWpm, n: +res.netWpm.toFixed(1), a: +res.accuracy.toFixed(1), f: res.full, h: res.half, ok: res.passed});
  if (DB.tests.length > 200) DB.tests.shift();
  save();
  renderExamResult(res, usedMin, timeUp);
  showExamPanel('result');
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
function renderExamResult(r, minutes, timeUp) {
  $('#xr-verdict').className = 'verdict ' + (r.passed ? 'good' : 'bad');
  $('#xr-verdict').textContent = r.passed ? 'Qualified' : 'Not qualified yet';
  $('#xr-line').textContent = `${E.title} · ${minutes.toFixed(minutes % 1 ? 1 : 0)} min · ${timeUp ? 'time up' : 'submitted early'} · target ${E.target} WPM and 92% accuracy`;
  const cells = [
    ['Net speed', r.netWpm.toFixed(1), 'WPM'],
    ['Gross speed', r.grossWpm, 'WPM'],
    ['Accuracy', r.accuracy.toFixed(1), '%'],
    ['Full mistakes', r.full, 'words'],
    ['Half mistakes', r.half, 'spacing'],
    ['Gross characters', r.gross, ''],
    ['Error characters', r.errChars, '= mistakes × 5'],
    ['Net characters', r.net, '']
  ];
  $('#xr-grid').innerHTML = cells.map(([a, b, c]) => `<div class="cell"><span class="c-l">${a}</span><span class="c-v">${b}</span><span class="c-u">${c}</span></div>`).join('');
  $('#xr-diff').innerHTML = r.items.length ? r.items.map(it => {
    if (it.k === 'ok') return `<span class="w">${esc(it.o)}</span>`;
    if (it.k === 'sub') return `<span class="w sub" title="Expected: ${esc(it.o)}"><s>${esc(it.t)}</s><b>${esc(it.o)}</b></span>`;
    if (it.k === 'omit') return `<span class="w omit" title="Missed word">${esc(it.o)}</span>`;
    if (it.k === 'extra') return `<span class="w extra" title="Extra word">${esc(it.t)}</span>`;
    return `<span class="w space" title="Spacing error. Expected: ${esc(it.o)}">${esc(it.t)}</span>`;
  }).join(' ') : '<span class="muted">Nothing was typed.</span>';
}

/* ================= home & progress ================= */
function stats() {
  const t = DB.tests;
  const best = t.length ? Math.max(...t.map(x => x.n)) : null;
  const last5 = t.slice(-5);
  const acc = last5.length ? last5.reduce((s, x) => s + x.a, 0) / last5.length : null;
  const done = LESSONS.filter(l => DB.lessons[l.id] && DB.lessons[l.id].done).length;
  return {tests: t.length, best, acc, done};
}
function renderHome() {
  const s = stats();
  const next = LESSONS.find(l => !(DB.lessons[l.id] && DB.lessons[l.id].done)) || LESSONS[LESSONS.length - 1];
  $('#h-continue').textContent = s.done ? `Continue: Lesson ${next.id}` : 'Start Lesson 1';
  $('#h-continue').dataset.id = next.id;
  $('#h-stats').innerHTML = [
    ['Lessons done', `${s.done}/${LESSONS.length}`],
    ['Best net speed', s.best == null ? '–' : s.best.toFixed(1) + ' WPM'],
    ['Recent accuracy', s.acc == null ? '–' : s.acc.toFixed(1) + '%'],
    ['Exam tests taken', s.tests]
  ].map(([a, b]) => `<div class="stat"><span class="s-v">${b}</span><span class="s-l">${a}</span></div>`).join('');
}
function renderProgress() {
  const s = stats(); const t = DB.tests;
  $('#p-stats').innerHTML = [
    ['Exam tests', s.tests], ['Best net WPM', s.best == null ? '–' : s.best.toFixed(1)],
    ['Avg accuracy (last 5)', s.acc == null ? '–' : s.acc.toFixed(1) + '%'], ['Lessons done', `${s.done}/${LESSONS.length}`]
  ].map(([a, b]) => `<div class="stat"><span class="s-v">${b}</span><span class="s-l">${a}</span></div>`).join('');
  // chart
  const pts = t.slice(-20);
  const svg = $('#p-chart');
  if (!pts.length) { svg.innerHTML = `<text x="300" y="110" text-anchor="middle" class="ch-empty">Take an exam test and your speed will be charted here.</text>`; }
  else {
    const Wd = 600, H = 220, l = 40, r = 16, tp = 16, b = 30;
    const maxY = Math.max(40, Math.ceil(Math.max(...pts.map(p => p.n), DB.settings.target) / 10) * 10);
    const x = i => pts.length === 1 ? (l + Wd - r) / 2 : l + i * (Wd - l - r) / (pts.length - 1);
    const y = v => tp + (1 - v / maxY) * (H - tp - b);
    let g = '';
    for (let v = 0; v <= maxY; v += 10) g += `<line x1="${l}" x2="${Wd - r}" y1="${y(v)}" y2="${y(v)}" class="ch-grid"/><text x="${l - 8}" y="${y(v) + 4}" text-anchor="end" class="ch-lab">${v}</text>`;
    const tg = DB.settings.target;
    g += `<line x1="${l}" x2="${Wd - r}" y1="${y(tg)}" y2="${y(tg)}" class="ch-target"/><text x="${Wd - r}" y="${y(tg) - 6}" text-anchor="end" class="ch-lab tgt">target ${tg}</text>`;
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.n).toFixed(1)}`).join('');
    const area = line + `L${x(pts.length - 1).toFixed(1)},${y(0)}L${x(0).toFixed(1)},${y(0)}Z`;
    g += `<path d="${area}" class="ch-area"/><path d="${line}" class="ch-line"/>`;
    pts.forEach((p, i) => { g += `<circle cx="${x(i)}" cy="${y(p.n)}" r="${i === pts.length - 1 ? 5 : 3}" class="ch-dot${p.ok ? ' ok' : ''}"><title>${p.n} WPM, ${p.a}%</title></circle>`; });
    g += `<text x="${l}" y="${H - 8}" class="ch-lab">oldest</text><text x="${Wd - r}" y="${H - 8}" text-anchor="end" class="ch-lab">latest</text>`;
    svg.innerHTML = g;
  }
  $('#p-table').innerHTML = t.length ? `<table><thead><tr><th>Date</th><th>Passage</th><th class="num">Min</th><th class="num">Gross</th><th class="num">Net</th><th class="num">Accuracy</th><th class="num">Mistakes</th><th>Result</th></tr></thead><tbody>${
    t.slice().reverse().slice(0, 30).map(x => `<tr><td>${new Date(x.d).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}</td><td class="guru">${esc(x.t)}</td><td class="num">${x.m}</td><td class="num">${x.g}</td><td class="num">${x.n}</td><td class="num">${x.a}%</td><td class="num">${x.f} + ${x.h}½</td><td>${x.ok ? '<span class="pill good">Qualified</span>' : '<span class="pill bad">Below</span>'}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">No exam tests yet.</p>';
  // weak key heatmap
  const kb = $('#p-kb');
  const max = Math.max(0.0001, ...Object.keys(DB.seen).map(c => (DB.weak[c] || 0) / (DB.seen[c] || 1)));
  $$('.key', kb).forEach(k => { k.style.removeProperty('--heat'); });
  Object.keys(DB.weak).forEach(c => {
    const r = REV[c]; if (!r || (DB.seen[c] || 0) < 3) return;
    const k = kb.querySelector(`[data-code="${r.code}"]`); if (!k) return;
    const v = (DB.weak[c] / DB.seen[c]) / max;
    const prev = parseFloat(k.style.getPropertyValue('--heat')) || 0;
    k.style.setProperty('--heat', Math.max(prev, v).toFixed(2));
  });
}

/* ================= home demo ================= */
function runDemo() {
  const kb = $('#demo-kb'); const out = $('#demo-out');
  const words = ['ਪੰਜਾਬ', 'ਪੰਜਾਬੀ ਟਾਈਪਿੰਗ', 'ਰਾਵੀ ਫੌਂਟ', 'ਸਰਕਾਰੀ ਨੌਕਰੀ'];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { out.textContent = words[1]; return; }
  let w = 0, i = 0;
  const step = () => {
    if (current !== 'home') { setTimeout(step, 800); return; }
    const cps = [...canon(words[w])];
    if (i < cps.length) {
      const ch = cps[i]; kbNext(kb, ch); const r = REV[ch]; if (r) kbFlash(kb, r.code, 'hit');
      out.textContent = cps.slice(0, i + 1).join(''); i++; setTimeout(step, 420);
    } else { kbClear(kb, 'next'); i = 0; w = (w + 1) % words.length; setTimeout(step, 1500); }
  };
  step();
}

/* ================= wiring ================= */
function applyTheme() {
  const t = DB.settings.theme;
  if (t === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
  $('#theme-btn').textContent = t === 'system' ? 'Theme: auto' : t === 'dark' ? 'Theme: dark' : 'Theme: light';
  document.documentElement.dataset.size = DB.settings.size;
}
function init() {
  buildKeyboard($('#d-kb'), (ch, code, special) => { if (ch) drillInput(ch, code); });
  buildKeyboard($('#x-kb'), (ch, code, special) => {
    if (!E || !E.running) return; const ta = $('#x-input');
    if (special === 'Backspace') { if (!E.allowBack) return; const s = ta.selectionStart, e = ta.selectionEnd; if (s !== e) ta.setRangeText('', s, e, 'end'); else if (s > 0) { const cps = [...ta.value.slice(0, s)]; const cut = cps.pop().length; ta.setRangeText('', s - cut, s, 'end'); } examHighlight(); return; }
    examInsert(ch);
  });
  buildKeyboard($('#k-kb'));
  buildKeyboard($('#p-kb'));
  buildKeyboard($('#demo-kb'));

  document.addEventListener('keydown', e => {
    if (current !== 'drill' || !D) return;
    if (e.target.closest && e.target.closest('input, select, textarea')) return;
    if (D.done) { if (e.key === 'Enter') { e.preventDefault(); retryDrill(); } return; }
    if (e.key === 'Backspace') { e.preventDefault(); return; }
    const ch = charFromEvent(e);
    if (ch === null) { if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) e.preventDefault(); return; }
    e.preventDefault();
    drillInput(ch, e.code);
  });

  const ta = $('#x-input');
  ta.addEventListener('keydown', e => {
    if (!E || !E.running) { e.preventDefault(); return; }
    if (e.key === 'Backspace' || e.key === 'Delete') { if (!E.allowBack) e.preventDefault(); else setTimeout(examHighlight); return; }
    if (e.key === 'Enter') { e.preventDefault(); return; }
    const ch = charFromEvent(e);
    if (ch === null) { if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) e.preventDefault(); return; }
    e.preventDefault(); kbFlash($('#x-kb'), e.code, 'hit'); examInsert(ch);
  });
  ta.addEventListener('beforeinput', e => {
    if (!E || !E.running) { e.preventDefault(); return; }
    if (/^insertFrom(Paste|Drop)/.test(e.inputType)) { e.preventDefault(); return; }
    if (/^delete/.test(e.inputType) && !E.allowBack) { e.preventDefault(); return; }
    if (e.inputType.startsWith('insert')) examBegin();
  });
  ta.addEventListener('input', () => examHighlight());
  ['paste', 'drop', 'cut'].forEach(ev => ta.addEventListener(ev, e => e.preventDefault()));

  document.addEventListener('click', e => {
    const a = e.target.closest('[data-go]'); if (a) { e.preventDefault(); go(a.dataset.go); return; }
    const l = e.target.closest('.lesson'); if (l) { startLesson(+l.dataset.id); return; }
    const p = e.target.closest('.passage'); if (p) { const ps = PASSAGES[+p.dataset.i]; startDrill({kind: 'practice', title: ps.t, sub: ps.en + ' · practice mode', text: ps.x}); return; }
  });
  $('#h-continue').addEventListener('click', e => startLesson(+e.currentTarget.dataset.id));
  $('#r-retry').addEventListener('click', retryDrill);
  $('#r-next').addEventListener('click', e => startLesson(+e.currentTarget.dataset.id));
  $('#r-back').addEventListener('click', () => go(D && D.kind === 'lesson' ? 'learn' : 'practice'));
  $('#d-back').addEventListener('click', () => go(D && D.kind === 'lesson' ? 'learn' : 'practice'));
  $('#d-restart').addEventListener('click', retryDrill);
  $('#pr-weak').addEventListener('click', () => startDrill({kind: 'practice', title: 'Weak keys drill', sub: 'Built from the keys you miss most', text: weakText(), regen: weakText}));
  $('#pr-words').addEventListener('click', () => { const g = () => shuffle(rng(Date.now() & 0xffff), [...new Set(WORDS)]).slice(0, 45).join(' '); startDrill({kind: 'practice', title: 'Common words', sub: 'Random words from every lesson', text: g(), regen: g}); });
  $('#pr-sent').addEventListener('click', () => { const g = () => shuffle(rng(Date.now() & 0xffff), SENTENCES).slice(0, 6).join(' '); startDrill({kind: 'practice', title: 'Sentences', sub: 'Short sentences with danda and commas', text: g(), regen: g}); });

  $('#x-passage').innerHTML = '<option value="random">Random passage</option>' + PASSAGES.map((p, i) => `<option value="${i}">${esc(p.t)} · ${esc(p.en)}</option>`).join('');
  $('#x-target').value = DB.settings.target;
  $('#x-start').addEventListener('click', startExam);
  $('#x-submit').addEventListener('click', () => finishExam(false));
  $('#x-quit').addEventListener('click', () => { finishExam(false, true); showExamPanel('setup'); });
  $('#xr-again').addEventListener('click', () => showExamPanel('setup'));
  $('#x-showkb').addEventListener('change', e => { $('#x-kbwrap').hidden = !e.target.checked; });

  $('#d-kbtoggle').addEventListener('click', () => { DB.settings.kb = !DB.settings.kb; save(); syncKb(); });
  $('#d-sound').addEventListener('click', () => { DB.settings.sound = !DB.settings.sound; save(); syncKb(); });
  $('#theme-btn').addEventListener('click', () => { const o = ['system', 'light', 'dark']; DB.settings.theme = o[(o.indexOf(DB.settings.theme) + 1) % 3]; save(); applyTheme(); });
  $('#size-sel').value = DB.settings.size;
  $('#size-sel').addEventListener('change', e => { DB.settings.size = e.target.value; save(); applyTheme(); });
  let armed = false;
  $('#p-reset').addEventListener('click', e => {
    if (!armed) { armed = true; e.currentTarget.textContent = 'Click again to erase everything'; e.currentTarget.classList.add('danger'); setTimeout(() => { armed = false; $('#p-reset').textContent = 'Reset all progress'; $('#p-reset').classList.remove('danger'); }, 4000); return; }
    DB.lessons = {}; DB.tests = []; DB.weak = {}; DB.seen = {}; save(); armed = false; e.currentTarget.textContent = 'Progress erased'; renderProgress();
  });
  $('#p-weakbtn').addEventListener('click', () => $('#pr-weak').click());

  syncKb(); applyTheme();
  go(location.hash.slice(1) || 'home', false);
  runDemo();
}
function syncKb() {
  $('#d-kbwrap').hidden = !DB.settings.kb;
  $('#d-kbtoggle').textContent = DB.settings.kb ? 'Hide keyboard' : 'Show keyboard';
  $('#d-sound').textContent = DB.settings.sound ? 'Error sound: on' : 'Error sound: off';
}
init();
