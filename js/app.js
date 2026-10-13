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
// Lesson progress moved to its own key when lessons were renumbered.
function LP(id) { return DB.lp[id] || {}; }
function learnedUpTo(id) {
  const s = new Set([' ']);
  LESSONS.forEach(l => { if (l.id <= id && l.keys) l.keys.forEach(k => s.add(canon(k))); });
  return s;
}
function unitFor(r, c, cons, focus) {
  const base = cons.length ? pick(r, cons) : 'ਕ';
  if (c === '਼') return pick(r, ['ਖ', 'ਗ', 'ਜ', 'ਫ']) + c;
  if (c === '੍') return base + (focus || (c + pick(r, ['ਰ', 'ਰ', 'ਹ', 'ਵ']))) + (r() < 0.4 ? 'ਾ' : '');
  if (c === 'ੱ') { const b2 = pick(r, cons.filter(x => x !== 'ਹ')) || 'ਕ'; return base + c + b2 + pick(r, ['ਾ', 'ੀ', 'ੇ', '']); }
  if (c === 'ਂ') return base + pick(r, ['ਾ', 'ੀ', 'ੇ', 'ੈ', 'ੋ']) + c;
  if (c === 'ੰ') return base + pick(r, ['', 'ਿ', 'ੁ', 'ੂ']) + c;
  if (c === ',' || c === '।') return base + pick(r, ['ਾ', '', 'ੀ', 'ੇ']) + pick(r, cons) + c;
  if (isMark(c)) return base + c;
  return c;
}
// Lines of ~N groups so each exercise is a few lines long.
const line = (n, f) => Array.from({length: n}, f).join(' ');
function cycle(r, arr, n) { const out = []; let pool = []; while (out.length < n && arr.length) { if (!pool.length) pool = shuffle(r, arr); out.push(pool.pop()); } return out; }
function sentenceChunks(text, per) {
  const s = text.match(/[^।]+।?/g).map(x => x.trim()).filter(Boolean);
  const out = []; for (let i = 0; i < s.length; i += per) out.push(s.slice(i, i + per).join(' '));
  return out;
}
function genLesson(lesson, seed) {
  const r = rng(seed * 7919 + lesson.id);
  const ex = (name, text) => ({name, text});
  if (lesson.kind === 'words') {
    const list = [...new Set(WORD_LISTS[lesson.list].split(/\s+/).filter(Boolean))];
    const all = cycle(r, list, 8 * 25);
    return [0, 1, 2, 3, 4, 5, 6, 7].map(i => ex(`Words ${i + 1}`, all.slice(i * 25, i * 25 + 25).join(' ')));
  }
  if (lesson.kind === 'sentences') {
    const list = lesson.list === 'OFFICE_SENTENCES' ? OFFICE_SENTENCES : SENTENCES;
    const all = cycle(r, list, 24);
    return [0, 1, 2, 3, 4, 5, 6, 7].map(i => ex(`Sentences ${i + 1}`, all.slice(i * 3, i * 3 + 3).join(' ')));
  }
  if (lesson.kind === 'para') {
    const p = PASSAGES.find(x => x.id === lesson.passage);
    return sentenceChunks(p.x, 2).map((t, i) => ex(`Part ${i + 1}`, t));
  }
  if (lesson.kind === 'digits') {
    const d = lesson.keys;
    const grp = n => line(26, () => Array.from({length: n}, () => pick(r, d)).join(''));
    const nums = ['ਸਾਲ', 'ਰੁਪਏ', 'ਦਿਨ', 'ਮਿੰਟ', 'ਨੰਬਰ', 'ਮਿਤੀ', 'ਘੰਟੇ', 'ਕਿਲੋ'];
    return [
      ex('Each digit', d.map(c => line(4, () => c + c)).join(' ')),
      ex('Pairs', grp(2)), ex('Threes', grp(3)), ex('Fours', grp(4)),
      ex('Numbers with words', line(22, () => Array.from({length: 1 + Math.floor(r() * 3)}, () => pick(r, d)).join('') + ' ' + pick(r, nums))),
      ex('Dates', line(16, () => `${pick(r, d)}${pick(r, d)}.${pick(r, d)}${pick(r, d)}.੨੦${pick(r, d)}${pick(r, d)}`))
    ];
  }
  const learned = learnedUpTo(lesson.id);
  const fresh = lesson.keys.map(canon);
  const cons = [...learned].filter(isCons).filter(c => c.length === 1);
  const MATRAS = ['ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'].filter(c => learned.has(c));
  const letters = [...learned].filter(k => k !== ' ' && !isMark(k) && !/[,।]/.test(k) && !/[੦-੯]/.test(k));
  const syl = c => {
    if (c === ',' || c === '।' || isMark(c)) return unitFor(r, c, cons, lesson.focus);
    return c + (isCons(c) && MATRAS.length && r() < 0.45 ? pick(r, MATRAS) : '');
  };
  const group = (featured, n) => { const f = Math.floor(r() * n); let w = ''; for (let j = 0; j < n; j++) { let part = syl(j === f ? pick(r, featured) : pick(r, letters.length ? letters : featured)); if (j < n - 1) part = part.replace(/[,।]$/, ''); w += part; } return w; };
  const usable = w => [...canon(w)].every(c => learned.has(c));
  const focusOk = w => !lesson.focus || canon(w).includes(lesson.focus);
  const withFresh = [...new Set(WORDS.filter(w => usable(w) && focusOk(w) && [...canon(w)].some(c => fresh.includes(c))))];
  const anyLearned = [...new Set(WORDS.filter(usable))];
  const sents = [...SENTENCES, ...OFFICE_SENTENCES].filter(s => [...canon(s)].every(c => learned.has(c)) && [...canon(s)].some(c => fresh.includes(c)));
  const words = (pool, n) => cycle(r, pool, n).join(' ');
  const out = [];
  if (lesson.kind === 'keys') {
    out.push(ex('Meet the new keys', fresh.map(c => line(fresh.length > 2 ? 8 : 12, () => { const u = unitFor(r, c, cons, lesson.focus); return isMark(c) || /[,।]/.test(c) ? u : u + u; })).join(' ')));
    out.push(ex('New keys together', line(30, () => group(fresh, 1 + Math.floor(r() * 2)).replace(/^(.)$/, '$1$1'))));
  } else {
    out.push(ex('Warm up', line(30, () => group(fresh, 2))));
  }
  out.push(ex('Mix with known keys', line(26, () => group(fresh, 2 + Math.floor(r() * 2)))));
  out.push(ex('Mix again', line(26, () => group(fresh, 2 + Math.floor(r() * 2)))));
  if (withFresh.length >= 4) {
    out.push(ex('Real words', words(withFresh, 28)));
    out.push(ex('More words', words(withFresh, 28)));
    if (withFresh.length >= 8) out.push(ex('Even more words', words(withFresh, 28)));
  } else {
    out.push(ex('Longer groups', line(22, () => group(fresh, 3 + Math.floor(r() * 2)))));
  }
  if (sents.length >= 2) out.push(ex('Sentences', cycle(r, sents, 5).join(' ')));
  else if (anyLearned.length >= 10) out.push(ex('Everything so far', words([...withFresh, ...anyLearned], 30)));
  else out.push(ex('Final drill', line(26, () => group(fresh, 2 + Math.floor(r() * 2)))));
  return out;
}

/* ================= drill runner ================= */
// A drill is a list of exercises typed one after another; stats add up across them.
let D = null;
function startDrill(cfg) {
  stopDrillTimer();
  const exercises = cfg.exercises || [{name: '', text: cfg.text}];
  D = Object.assign({}, cfg, {exercises, ex: 0, errors: 0, correct: 0, ms: 0, start: 0, done: false, timer: 0, chars: 0});
  $('#d-title').textContent = cfg.title;
  $('#d-sub').textContent = cfg.sub || '';
  $('#d-tip').innerHTML = cfg.tip ? esc(cfg.tip) : '';
  $('#d-tip').hidden = !cfg.tip;
  $('#d-result').hidden = true;
  $('#d-stage').hidden = false;
  loadExercise(0);
  go('drill');
}
function loadExercise(i) {
  if (D.start) { D.ms += performance.now() - D.start; D.start = 0; }
  stopDrillTimer();
  D.ex = i;
  const text = canon(D.exercises[i].text).replace(/\s+/g, ' ').trim();
  const cps = [...text];
  const cl = clusters(cps);
  const clusterOf = new Int32Array(cps.length);
  cl.forEach(([a, b], k) => { for (let j = a; j < b; j++) clusterOf[j] = k; });
  Object.assign(D, {cps, cl, clusterOf, pos: 0, errCl: new Set()});
  const box = $('#d-text');
  box.innerHTML = cl.map(([a, b]) => `<span class="ch${cps[a] === ' ' ? ' sp' : ''}">${esc(cps.slice(a, b).join(''))}</span>`).join('');
  D.spans = [...box.children];
  box.scrollTop = 0;
  const n = D.exercises.length;
  $('#d-steps').hidden = n < 2;
  $('#d-steps').innerHTML = n < 2 ? '' : D.exercises.map((e, k) => `<span class="step${k < i ? ' done' : ''}${k === i ? ' on' : ''}" title="${esc(e.name)}">${k + 1}</span>`).join('') + `<span class="step-name">Exercise ${i + 1} of ${n} · ${esc(D.exercises[i].name)}</span>`;
  paintRange(0, 0);
  updateHint(); updateLive();
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
  if (!D || D.done || D.pos >= D.cps.length) { kbClear(kb, 'next'); $('#d-hint').innerHTML = ''; return; }
  const ch = D.cps[D.pos];
  const r = kbNext(kb, ch);
  let html = `<span class="hint-ch guru">${ch === ' ' ? '␣' : esc(showMark(ch))}</span>`;
  if (r) html += `<span class="hint-key">${esc(keyLabel(ch))}</span><span class="hint-f">${FINGER_NAME[FINGER[r.code]] || ''}</span>`;
  if (ch === 'ਿ') html += `<span class="hint-note">Sihari shows before the letter but is typed after it.</span>`;
  $('#d-hint').innerHTML = html;
}
function elapsedMin() { return D ? (D.ms + (D.start ? performance.now() - D.start : 0)) / 60000 : 0; }
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
  const total = D.exercises.length;
  $('#d-bar').style.width = (100 * (D.ex + D.pos / D.cps.length) / total).toFixed(1) + '%';
}
function stopDrillTimer() { if (D && D.timer) { clearInterval(D.timer); D.timer = 0; } }
function drillInput(ch, code) {
  if (!D || D.done) return;
  if (!D.start) { D.start = performance.now(); if (!D.timer) D.timer = setInterval(updateLive, 500); }
  const exp = D.cps[D.pos];
  const seq = [...canon(ch)];
  const ok = seq.every((c, k) => D.cps[D.pos + k] === c);
  DB.seen[exp] = (DB.seen[exp] || 0) + 1;
  const kb = $('#d-kb');
  if (ok) {
    const c0 = D.clusterOf[D.pos];
    D.pos += seq.length; D.correct += seq.length; D.chars += seq.length;
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
  if (D.pos >= D.cps.length) {
    if (D.ex + 1 < D.exercises.length) loadExercise(D.ex + 1);
    else finishDrill();
  } else { updateHint(); updateLive(); }
}
function finishDrill() {
  if (D.start) { D.ms += performance.now() - D.start; D.start = 0; }
  D.done = true; stopDrillTimer(); updateLive(); updateHint();
  const m = Math.max(elapsedMin(), 1 / 60);
  const wpm = (D.chars / 5) / m;
  const acc = 100 * D.correct / (D.correct + D.errors);
  let msg = '', next = null;
  if (D.kind === 'lesson') {
    const prev = LP(D.lessonId);
    const passed = acc >= 90;
    DB.lp[D.lessonId] = {done: prev.done || passed, wpm: Math.max(prev.wpm || 0, passed ? wpm : 0), acc: Math.max(prev.acc || 0, acc), tries: (prev.tries || 0) + 1};
    save();
    msg = passed ? 'Lesson complete. Accuracy is above 90%, so the next lesson is ready.' : 'Aim for 90% accuracy to complete this lesson. Slow down and try again.';
    if (passed) next = LESSONS.find(l => l.id === D.lessonId + 1);
  } else {
    msg = acc >= 92 ? 'Accuracy is above the 92% exam bar.' : 'The exam needs 92% accuracy. Slow down a little and focus on the matras.';
  }
  $('#r-wpm').textContent = Math.round(wpm);
  $('#r-acc').textContent = acc.toFixed(1) + '%';
  $('#r-err').textContent = D.errors;
  const s = Math.round(m * 60);
  $('#r-time').textContent = s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : s + 's';
  $('#r-msg').textContent = msg;
  $('#r-next').hidden = !next;
  $('#r-next').dataset.id = next ? next.id : '';
  $('#d-result').hidden = false;
  $('#d-stage').hidden = true;
}
function startLesson(id, seedBump = 0) {
  const l = LESSONS.find(x => x.id === id); if (!l) return;
  const tries = LP(id).tries || 0;
  const ex = genLesson(l, tries + seedBump + 1);
  startDrill({kind: 'lesson', lessonId: id, title: `Lesson ${id} · ${l.t}`, sub: l.pa, tip: l.tip, exercises: ex});
}
function retryDrill() {
  if (!D) return;
  if (D.kind === 'lesson') return startLesson(D.lessonId, Math.floor(Math.random() * 1000));
  if (D.regen) return startDrill(Object.assign({}, D, {exercises: null, text: D.regen()}));
  startDrill({kind: D.kind, title: D.title, sub: D.sub, tip: D.tip, exercises: D.exercises});
}

/* ================= lists ================= */
function renderLessons() {
  const nextId = (LESSONS.find(l => !LP(l.id).done) || {}).id;
  $('#lesson-list').innerHTML = STAGES.map((st, si) => {
    const ls = LESSONS.filter(l => l.stage === st.id);
    const doneN = ls.filter(l => LP(l.id).done).length;
    return `<div class="stage"><div class="stage-h"><span class="stage-n">Stage ${si + 1}</span><h2>${esc(st.t)}</h2><span class="guru stage-pa">${esc(st.pa)}</span><span class="pill${doneN === ls.length ? ' good' : ''}">${doneN}/${ls.length}</span></div><div class="lessons">${ls.map(l => {
      const p = LP(l.id);
      const keys = l.kind === 'keys' || l.kind === 'review' || l.kind === 'digits' ? l.keys.slice(0, 10).map(k => `<span class="kc guru">${esc(showMark(k))}</span>`).join('') : `<span class="kc-all">${l.kind === 'words' ? 'Word list' : l.kind === 'para' ? 'Exam passage' : 'Sentences'}</span>`;
      const tag = l.kind === 'review' ? '<span class="pill">Review</span> ' : '';
      const state = p.done ? `<span class="pill good">Done · ${Math.round(p.wpm)} WPM</span>` : (l.id === nextId ? `<span class="pill acc">Up next</span>` : (p.tries ? `<span class="pill">Best ${Math.round(p.acc)}%</span>` : ''));
      return `<button type="button" class="lesson${p.done ? ' is-done' : ''}${l.id === nextId ? ' is-next' : ''}" data-id="${l.id}">
      <span class="l-num">${l.id}</span>
      <span class="l-body"><span class="l-t">${esc(l.t)}</span><span class="l-pa guru">${esc(l.pa)}</span><span class="l-keys">${keys}</span></span>
      <span class="l-state">${tag}${state}</span></button>`;
    }).join('')}</div></div>`;
  }).join('');
  const done = LESSONS.filter(l => LP(l.id).done).length;
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
  const done = LESSONS.filter(l => LP(l.id).done).length;
  return {tests: t.length, best, acc, done};
}
function renderHome() {
  const s = stats();
  const next = LESSONS.find(l => !LP(l.id).done) || LESSONS[LESSONS.length - 1];
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
    DB.lp = {}; DB.tests = []; DB.weak = {}; DB.seen = {}; save(); armed = false; e.currentTarget.textContent = 'Progress erased'; renderProgress();
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
