/* PSSSB-style exam mode: candidate login, instructions, a fixed timer per part, auto-submit, printable result sheet. */
const PRESETS = [
  {id: 'psssb', name: 'PSSSB Clerk typing test', sub: 'Punjabi, then English · 10 + 10 minutes', parts: ['pa', 'en'], min: 10, back: true},
  {id: 'pa', name: 'Punjabi typing test (Raavi)', sub: 'Punjabi only · 10 minutes', parts: ['pa'], min: 10, back: true},
  {id: 'en', name: 'English typing test', sub: 'English only · 10 minutes', parts: ['en'], min: 10, back: true},
  {id: 'strict', name: 'Strict Punjabi mock', sub: 'No Backspace · 10 minutes', parts: ['pa'], min: 10, back: false},
  {id: 'quick', name: 'Quick Punjabi mock', sub: 'Punjabi only · 5 minutes', parts: ['pa'], min: 5, back: true}
];
const PASS_WPM = 30, PASS_ACC = 92;
const CHUNK_WORDS = 40, CHUNK_NEXT = 0.8;   // words per chunk, as on the exam screen; share of a chunk to type before moving on
const LANG = {pa: 'Punjabi (Raavi, INSCRIPT)', en: 'English'};

let X = null;    // the whole sitting
let P = null;    // the running part
const shell = () => $('#ex-shell');
const ta = () => $('#ex-input');

function screen(name, scroll = true) {
  ['login', 'instr', 'result'].forEach(n => { $('#s-' + n).hidden = n !== name; });
  shell().hidden = !['run', 'break'].includes(name);
  $('#ex-run').hidden = name !== 'run';
  $('#ex-break').hidden = name !== 'break';
  document.body.classList.toggle('exam-lock', !shell().hidden);
  if (shell().hidden && scroll) window.scrollTo(0, $('#ex-app').offsetTop - 80);
}

function passageFor(lang, minutes) {
  const bank = lang === 'pa' ? PASSAGES : ENG_PASSAGES;
  const start = Math.floor(Math.random() * bank.length), need = minutes * 55;
  const out = []; let words = 0, i = start;
  do { const p = bank[i % bank.length]; out.push(p); words += p.x.split(/\s+/).length; i++; } while (words < need && i - start < bank.length);
  return {title: out[0].t, id: out[0].id, text: canon(out.map(p => p.x).join(' '))};
}

// Split a passage into fixed-size chunks of words, like the exam software (a chunk can end mid-sentence).
function chunkText(text) {
  const words = text.split(' '), out = [];
  for (let i = 0; i < words.length; i += CHUNK_WORDS) out.push(words.slice(i, i + CHUNK_WORDS).join(' '));
  if (out.length > 1 && out[out.length - 1].split(' ').length < 8) out[out.length - 2] += ' ' + out.pop();
  return out;
}

/* ---------- login ---------- */
function renderPresets() {
  const sel = PRESETS.find(p => p.id === $('#ex-app').dataset.preset) ? $('#ex-app').dataset.preset : 'psssb';
  $('#ex-presets').innerHTML = PRESETS.map(p => `<label class="preset"><input type="radio" name="preset" value="${p.id}"${p.id === sel ? ' checked' : ''}><span><b>${esc(p.name)}</b><small>${esc(p.sub)}</small></span></label>`).join('');
  $('#ex-name').value = DB.settings.cand || '';
}
function login(e) {
  e.preventDefault();
  const name = $('#ex-name').value.trim();
  if (!name) { $('#ex-name').focus(); $('#ex-name-err').hidden = false; return; }
  $('#ex-name-err').hidden = true;
  const preset = PRESETS.find(p => p.id === $('input[name=preset]:checked').value);
  const roll = $('#ex-roll').value.trim() || String(Math.floor(10000000 + Math.random() * 89999999));
  DB.settings.cand = name; save();
  X = {preset, name, roll, parts: [], partIdx: 0, startedAt: Date.now(), chunked: true};
  renderInstructions();
  screen('instr');
}

/* ---------- instructions ---------- */
function renderInstructions() {
  const p = X.preset;
  $('#in-cand').textContent = `${X.name} · Roll no. ${X.roll}`;
  $('#in-exam').textContent = p.name;
  const parts = p.parts.map((l, i) => `<li><b>Part ${i + 1}: ${LANG[l]}</b>, ${p.min} minutes.</li>`).join('');
  $('#in-list').innerHTML = `
    ${parts}
    <li>The timer starts when you press <b>Start test</b> and the test submits on its own when time runs out. You can submit early, but speed is still worked out over the full ${p.min} minutes, as in the real test.</li>
    <li>To qualify you need at least <b>${PASS_WPM} words per minute</b> with at least <b>${PASS_ACC}% accuracy</b> in ${p.parts.length > 1 ? 'each part' : 'the test'}.</li>
    <li>${p.back ? 'Backspace is allowed for corrections.' : '<b>Backspace is switched off.</b> You cannot correct mistakes.'}</li>
    <li id="in-chunkli"${X.chunked ? '' : ' hidden'}>The passage appears one chunk at a time, as in the exam. Press <b>Enter</b> or <b>↓</b> for the next chunk once you have typed ${Math.round(CHUNK_NEXT * 100)}% of the current one, and <b>Page Up</b> / <b>Page Down</b> to move between chunks.</li>
    <li>Mistakes are not shown while you type, as in the real test. A wrong, missing or extra word is a full mistake; a spacing error is a half mistake.</li>
    <li>Copy, paste and right click are disabled. The test opens full screen; leaving the window is recorded on your result.</li>
    ${p.parts.includes('pa') ? '<li>For Punjabi, type on your normal English keyboard. The test converts it to the INSCRIPT layout used with Raavi font. If the Windows Punjabi keyboard is already on, that works too.</li>' : ''}`;
  $('#in-check').hidden = !p.parts.includes('pa');
  $('#in-kbtest').value = ''; $('#in-kbok').hidden = true;
  $('#in-agree').checked = false; $('#in-start').disabled = true; $('#in-chunk').checked = X.chunked;
}

/* ---------- running a part ---------- */
function startPart() {
  const lang = X.preset.parts[X.partIdx], min = X.preset.min;
  const ps = passageFor(lang, min);
  P = {lang, min, ...ps, start: performance.now(), keys: 0, backs: 0, blurs: 0, timer: 0, running: true, chunked: X.chunked};
  if (P.chunked) { P.chunks = chunkText(P.text); P.typed = P.chunks.map(() => ''); P.ci = 0; }
  $('#ex-part').textContent = `${lang === 'pa' ? 'Punjabi' : 'English'} Mock Type Test${X.preset.parts.length > 1 ? ` (Part ${X.partIdx + 1} of ${X.preset.parts.length})` : ''}`;
  $('#ex-cand').textContent = X.name; $('#ex-cand').title = `Roll no. ${X.roll}`;
  const src = $('#ex-src');
  src.textContent = P.chunked ? P.chunks[0] : P.text; src.lang = lang; src.scrollTop = 0;
  $('#ex-chunkno').hidden = $('#ex-chunkno2').hidden = !P.chunked; $('#ex-msg').textContent = ''; $('#ex-run').classList.toggle('chunked', P.chunked); if (P.chunked) showChunk();
  src.classList.toggle('en', lang === 'en');
  const t = ta();
  t.value = ''; t.disabled = false; t.lang = lang; t.classList.toggle('en', lang === 'en');
  t.placeholder = '';
  $('#ex-kbbtn').hidden = lang !== 'pa';
  $('#ex-prev').hidden = $('#ex-next').hidden = !P.chunked;
  $('#ex-kbwrap').hidden = true; t.inputMode = '';
  $('#ex-confirm').hidden = true;
  screen('run');
  tick(); P.timer = setInterval(tick, 250);
  setTimeout(() => t.focus(), 30);
}
function tick() {
  const left = Math.max(0, P.min * 60 - (performance.now() - P.start) / 1000);
  const s = Math.ceil(left);
  $('#ex-clock').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  $('#ex-clock').classList.toggle('low', s <= 60);
  if (left <= 0) endPart(true);
}
function chunkWords(i) { const v = (i === P.ci ? ta().value : P.typed[i]).trim(); return v ? v.split(/\s+/).length : 0; }
function showChunk(msg) {
  $('#ex-src').textContent = P.chunks[P.ci];
  $('#ex-chunkno').textContent = $('#ex-chunkno2').textContent = `chunk#${P.ci + 1}`;
  $('#ex-chunkno').title = `Chunk ${P.ci + 1} of ${P.chunks.length}`;
  $('#ex-msg').textContent = msg || 'Enter or ↓ for the next chunk. Page Up and Page Down move between chunks.';
  $('#ex-msg').classList.toggle('warn', !!msg);
}
function goChunk(d) {
  const to = P.ci + d;
  if (to < 0 || to >= P.chunks.length) { showChunk(to < 0 ? 'This is the first chunk.' : 'This is the last chunk. Submit when you are done.'); return; }
  if (d > 0) {
    const need = Math.ceil(P.chunks[P.ci].split(' ').length * CHUNK_NEXT);
    if (chunkWords(P.ci) < need) { showChunk(`Type at least ${need} words of this chunk before moving to the next one.`); return; }
  }
  P.typed[P.ci] = ta().value;
  P.ci = to;
  const t = ta(); t.value = P.typed[P.ci]; t.setSelectionRange(t.value.length, t.value.length); t.scrollTop = t.scrollHeight;
  showChunk();
}
function typedAll() {
  if (!P.chunked) return ta().value;
  P.typed[P.ci] = ta().value;
  return P.typed.map(x => x.trim()).filter(Boolean).join(' ');
}
function insert(ch) {
  const t = ta();
  t.setRangeText(ch, t.selectionStart, t.selectionEnd, 'end');
  P.keys++;
}
function endPart(timeUp) {
  if (!P || !P.running) return;
  P.running = false; clearInterval(P.timer);
  ta().disabled = true;
  // as in the real test, speed is worked out over the full allotted time even if you submit early
  const used = P.min, took = timeUp ? P.min : (performance.now() - P.start) / 60000;
  const typed = typedAll();
  const r = scoreTest(P.text, typed, used);
  r.passed = r.grossWpm >= PASS_WPM && r.accuracy >= PASS_ACC;
  X.parts.push({lang: P.lang, title: P.title, id: P.id, min: used, took, timeUp, keys: P.keys, backs: P.backs, blurs: P.blurs, text: P.text, typed, r});
  DB.tests.push({d: Date.now(), p: P.id, t: P.title, m: +used.toFixed(2), g: r.grossWpm, n: +r.netWpm.toFixed(1), a: +r.accuracy.toFixed(1), f: r.full, h: r.half, ok: r.passed, x: X.preset.id});
  if (DB.tests.length > 200) DB.tests.shift();
  save();
  X.partIdx++;
  if (X.partIdx < X.preset.parts.length) {
    $('#br-done').textContent = `Part ${X.partIdx} ${timeUp ? 'ended when time ran out' : 'was submitted'}.`;
    $('#br-next').textContent = `Part ${X.partIdx + 1}: ${LANG[X.preset.parts[X.partIdx]]}, ${X.preset.min} minutes. The timer starts when you press Start.`;
    screen('break');
    return;
  }
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  renderResult();
  screen('result');
}

/* ---------- result sheet ---------- */
function renderResult() {
  const all = X.parts.every(p => p.r.passed);
  $('#rs-verdict').className = 'verdict ' + (all ? 'good' : 'bad');
  $('#rs-verdict').textContent = all ? 'Qualified' : 'Not qualified';
  $('#rs-meta').innerHTML = [
    ['Candidate', esc(X.name)], ['Roll no.', esc(X.roll)], ['Test', esc(X.preset.name)],
    ['Date', new Date(X.startedAt).toLocaleString('en-IN', {dateStyle: 'medium', timeStyle: 'short'})],
    ['Standard', `${PASS_WPM} WPM gross and ${PASS_ACC}% accuracy`]
  ].map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
  const rows = [
    ['Passage', p => `<span lang="${p.lang}" class="${p.lang === 'pa' ? 'guru' : ''}">${esc(p.title)}</span>`],
    ['Time allowed', p => `${p.min} min${p.timeUp ? '' : ` <small class="muted">(submitted after ${fmtMin(p.took)})</small>`}`],
    ['Keystrokes', p => p.keys + (p.backs ? ` + ${p.backs} Backspace` : '')],
    ['Gross characters', p => p.r.gross],
    ['Full mistakes', p => p.r.full],
    ['Half mistakes', p => p.r.half],
    ['Error characters', p => `${p.r.errChars} <small class="muted">(mistakes × 5)</small>`],
    ['Net characters', p => p.r.net],
    ['Gross speed', p => `${p.r.grossWpm} WPM`],
    ['Net speed', p => `${p.r.netWpm.toFixed(1)} WPM`],
    ['Accuracy', p => `${p.r.accuracy.toFixed(1)}%`],
    ['Left the test window', p => p.blurs ? `${p.blurs} time${p.blurs > 1 ? 's' : ''}` : 'No'],
    ['Result', p => `<b class="${p.r.passed ? 'ok' : 'no'}">${p.r.passed ? 'Qualified' : 'Not qualified'}</b>`]
  ];
  const head = X.parts.map(p => `<th class="num">${p.lang === 'pa' ? 'Punjabi' : 'English'}</th>`).join('');
  $('#rs-table').innerHTML = `<thead><tr><th></th>${head}</tr></thead><tbody>${rows.map(([l, f]) => `<tr><th scope="row">${l}</th>${X.parts.map(p => `<td class="num">${f(p)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  $('#rs-why').innerHTML = X.parts.map(p => {
    const why = [];
    if (p.r.grossWpm < PASS_WPM) why.push(`gross speed ${p.r.grossWpm} WPM is below ${PASS_WPM}`);
    if (p.r.accuracy < PASS_ACC) why.push(`accuracy ${p.r.accuracy.toFixed(1)}% is below ${PASS_ACC}%`);
    return why.length ? `<li>${p.lang === 'pa' ? 'Punjabi' : 'English'}: ${why.join(' and ')}.</li>` : '';
  }).join('');
  $('#rs-whywrap').hidden = !$('#rs-why').innerHTML;
  $('#rs-parts').innerHTML = X.parts.map((p, i) => `
    <div class="rs-part">
      <h3>${p.lang === 'pa' ? 'Punjabi' : 'English'}: your typing against the passage</h3>
      <div class="dlegend"><span><i style="background:var(--bad-soft);border:1px solid var(--bad)"></i>Wrong word (yours, then the correct one)</span><span><i style="border:1px dashed var(--muted)"></i>Missed word</span><span><i style="background:var(--gold-soft);border:1px solid var(--gold)"></i>Extra word</span><span><i style="background:var(--blue-soft);border:1px solid var(--blue)"></i>Spacing (half mistake)</span></div>
      <div class="diff${p.lang === 'en' ? ' en' : ''}" lang="${p.lang}">${diffHTML(p.r)}</div>
      <details><summary>Show typed text and original side by side</summary>
        <div class="side"><div><div class="c-l">Original</div><div class="sbox${p.lang === 'en' ? ' en' : ''}" lang="${p.lang}">${esc(p.text.split(/\s+/).slice(0, Math.max(p.r.attempted, 1)).join(' '))}</div></div>
        <div><div class="c-l">Typed</div><div class="sbox${p.lang === 'en' ? ' en' : ''}" lang="${p.lang}">${esc(p.typed) || '<span class="muted">Nothing typed</span>'}</div></div></div>
      </details>
    </div>`).join('');
}
function fmtMin(m) { const s = Math.round(m * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
function diffHTML(r) {
  if (!r.items.length) return '<span class="muted">Nothing was typed.</span>';
  return r.items.map(it => {
    if (it.k === 'ok') return `<span class="w">${esc(it.o)}</span>`;
    if (it.k === 'sub') return `<span class="w sub" title="Expected: ${esc(it.o)}"><s>${esc(it.t)}</s><b>${esc(it.o)}</b></span>`;
    if (it.k === 'omit') return `<span class="w omit" title="Missed word">${esc(it.o)}</span>`;
    if (it.k === 'extra') return `<span class="w extra" title="Extra word">${esc(it.t)}</span>`;
    return `<span class="w space" title="Spacing error. Expected: ${esc(it.o)}">${esc(it.t)}</span>`;
  }).join(' ');
}

/* ---------- wiring ---------- */
function backspace() {
  const t = ta(), s = t.selectionStart, e = t.selectionEnd;
  if (s !== e) t.setRangeText('', s, e, 'end');
  else if (s > 0) { const cut = [...t.value.slice(0, s)].pop().length; t.setRangeText('', s - cut, s, 'end'); }
  P.backs++;
}
function initExam() {
  renderPresets();
  $('#s-login').addEventListener('submit', login);
  $('#in-back').addEventListener('click', () => screen('login'));
  $('#in-chunk').addEventListener('change', e => { if (X) X.chunked = e.target.checked; $('#in-chunkli').hidden = !e.target.checked; });
  $('#in-agree').addEventListener('change', e => { $('#in-start').disabled = !e.target.checked; });
  $('#in-kbtest').addEventListener('keydown', e => {
    if (e.key === 'Backspace' || e.key === 'Tab') return;
    const ch = charFromEvent(e); if (ch === null) return;
    e.preventDefault(); e.target.setRangeText(ch, e.target.selectionStart, e.target.selectionEnd, 'end');
    $('#in-kbok').hidden = !/[਀-੿]/.test(e.target.value);
  });
  const begin = () => {
    const el = document.documentElement;
    if (el.requestFullscreen && !document.fullscreenElement) el.requestFullscreen().catch(() => {});
    startPart();
  };
  $('#in-start').addEventListener('click', begin);
  $('#br-start').addEventListener('click', begin);

  const t = ta();
  t.addEventListener('keydown', e => {
    if (!P || !P.running) { e.preventDefault(); return; }
    if (P.chunked && (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'PageDown')) { e.preventDefault(); goChunk(1); return; }
    if (P.chunked && e.key === 'PageUp') { e.preventDefault(); goChunk(-1); return; }
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); return; }
    if (e.key === 'Backspace' || e.key === 'Delete') { if (!X.preset.back) e.preventDefault(); else P.backs++; return; }
    if ((e.ctrlKey || e.metaKey) && /^[vxcaz]$/i.test(e.key)) { e.preventDefault(); return; }
    if (P.lang === 'en') { if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) P.keys++; return; }
    const ch = charFromEvent(e);
    if (ch === null) { if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) e.preventDefault(); return; }
    e.preventDefault(); kbFlash($('#ex-kb'), e.code, 'hit'); insert(ch);
  });
  t.addEventListener('beforeinput', e => {
    if (!P || !P.running) { e.preventDefault(); return; }
    if (/^insertFrom(Paste|Drop)|^insertReplacementText|^deleteByCut/.test(e.inputType)) { e.preventDefault(); return; }
    if (/^delete/.test(e.inputType) && !X.preset.back) e.preventDefault();
  });
  ['paste', 'drop', 'cut', 'copy', 'contextmenu'].forEach(ev => t.addEventListener(ev, e => e.preventDefault()));
  $('#ex-src').addEventListener('copy', e => e.preventDefault());
  shell().addEventListener('contextmenu', e => e.preventDefault());
  const blur = () => { if (P && P.running && !shell().hidden) P.blurs++; };
  window.addEventListener('blur', blur);
  document.addEventListener('visibilitychange', () => { if (document.hidden) blur(); });

  buildKeyboard($('#ex-kb'), (ch, code, special) => {
    if (!P || !P.running) return;
    if (special === 'Backspace') { if (X.preset.back) backspace(); return; }
    insert(ch);
  });
  $('#ex-kbbtn').addEventListener('click', () => {
    const w = $('#ex-kbwrap'); w.hidden = !w.hidden;
    ta().inputMode = w.hidden ? '' : 'none';
    $('#ex-kbbtn').textContent = w.hidden ? 'On-screen keyboard' : 'Hide keyboard';
  });
  $('#ex-submit').addEventListener('click', () => { $('#ex-confirm').hidden = false; $('#ex-yes').focus(); });
  $('#ex-no').addEventListener('click', () => { $('#ex-confirm').hidden = true; ta().focus(); });
  $('#ex-yes').addEventListener('click', () => endPart(false));
  $('#ex-prev').addEventListener('click', () => { goChunk(-1); ta().focus(); });
  $('#ex-next').addEventListener('click', () => { goChunk(1); ta().focus(); });

  $('#rs-print').addEventListener('click', () => window.print());
  $('#rs-again').addEventListener('click', () => { X = null; P = null; screen('login'); });
  window.addEventListener('beforeunload', e => { if (P && P.running) { e.preventDefault(); e.returnValue = ''; } });
  screen('login', false);
}
initExam();
