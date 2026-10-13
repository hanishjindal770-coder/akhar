/* CBT mock test, modelled on the computer-based exam screen: question palette, Save & Next, Mark for Review, timer, auto submit. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const STORE = 'pep.cbt';
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } };
  const DBC = Object.assign({name: '', attempts: []}, load());
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(DBC)); } catch (e) {} };
  const BANK = QBANK; // from the question bank script loaded before this one
  const LETTERS = ['A', 'B', 'C', 'D'];

  let T = null; // the running test

  function show(name) {
    ['setup', 'result'].forEach(n => { $('#c-' + n).hidden = n !== name; });
    $('#c-shell').hidden = name !== 'run';
    document.body.classList.toggle('exam-lock', name === 'run');
  }

  /* ---------- setup ---------- */
  function renderHistory() {
    const a = DBC.attempts.filter(x => x.bank === BANK.id).slice(-5).reverse();
    $('#c-history').hidden = !a.length;
    $('#c-histlist').innerHTML = a.map(x => `<li>${new Date(x.d).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}: ${x.score} / ${x.n} (${x.c} right, ${x.w} wrong)</li>`).join('');
  }
  function start(e) {
    e.preventDefault();
    const name = $('#c-name').value.trim();
    if (!name) { $('#c-name').focus(); $('#c-name-err').hidden = false; return; }
    $('#c-name-err').hidden = true;
    DBC.name = name; save();
    const n = Math.min(+$('#c-count').value, BANK.questions.length);
    const neg = $('#c-neg').checked ? 0.25 : 0;
    const qs = BANK.questions.map((q, i) => i).sort(() => Math.random() - 0.5).slice(0, n).map(i => BANK.questions[i]);
    T = {name, qs, n, neg, min: n, cur: 0, ans: Array(n).fill(null), sel: Array(n).fill(null), mark: Array(n).fill(false), seen: Array(n).fill(false),
      start: Date.now(), timer: 0, running: true};
    $('#c-cand').textContent = name;
    $('#c-title').textContent = `${BANK.title} Mock Test`;
    const el = document.documentElement;
    if (el.requestFullscreen && !document.fullscreenElement) el.requestFullscreen().catch(() => {});
    show('run');
    go(0);
    tick(); T.timer = setInterval(tick, 500);
  }

  /* ---------- running ---------- */
  function tick() {
    const left = Math.max(0, T.min * 60 - (Date.now() - T.start) / 1000), s = Math.ceil(left);
    $('#c-clock').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    $('#c-clock').classList.toggle('low', s <= 60);
    if (left <= 0) finish(true);
  }
  function status(i) {
    if (!T.seen[i]) return 'nv';
    if (T.mark[i]) return T.ans[i] !== null ? 'am' : 'mk';
    return T.ans[i] !== null ? 'an' : 'na';
  }
  function go(i) {
    T.cur = i; T.seen[i] = true;
    T.sel[i] = T.ans[i]; // an answer that was not saved is dropped, as on the real screen
    const q = T.qs[i];
    $('#c-qno').textContent = `Question No. ${i + 1}`;
    $('#c-qtext').textContent = q.q;
    $('#c-opts').innerHTML = q.o.map((o, k) => `<label class="c-opt"><input type="radio" name="c-opt" value="${k}"${T.sel[i] === k ? ' checked' : ''}><span class="c-let">${LETTERS[k]}</span><span>${esc(o)}</span></label>`).join('');
    palette();
    $('#c-qarea').scrollTop = 0;
  }
  function palette() {
    const counts = {an: 0, na: 0, nv: 0, mk: 0, am: 0};
    $('#c-pal').innerHTML = T.qs.map((_, i) => { const s = status(i); counts[s]++; return `<button type="button" class="c-pb ${s}${i === T.cur ? ' cur' : ''}" data-i="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`; }).join('');
    Object.keys(counts).forEach(k => { $('#c-n-' + k).textContent = counts[k]; });
  }
  function next() { if (T.cur < T.n - 1) go(T.cur + 1); else palette(); }
  function saveNext() { T.ans[T.cur] = T.sel[T.cur]; T.mark[T.cur] = false; next(); }
  function markNext() { T.ans[T.cur] = T.sel[T.cur]; T.mark[T.cur] = true; next(); }
  function clearResp() { T.sel[T.cur] = null; T.ans[T.cur] = null; $$opts().forEach(r => { r.checked = false; }); palette(); }
  const $$opts = () => [...document.querySelectorAll('input[name=c-opt]')];

  function askSubmit() {
    const c = {an: 0, na: 0, nv: 0, mk: 0, am: 0};
    T.qs.forEach((_, i) => c[status(i)]++);
    $('#c-sum').innerHTML = `<tr><th>Answered</th><td class="num">${c.an + c.am}</td></tr><tr><th>Not answered</th><td class="num">${c.na + c.mk}</td></tr><tr><th>Marked for review</th><td class="num">${c.mk + c.am}</td></tr><tr><th>Not visited</th><td class="num">${c.nv}</td></tr>`;
    $('#c-confirm').hidden = false;
  }
  function finish(timeUp) {
    if (!T || !T.running) return;
    T.running = false; clearInterval(T.timer);
    $('#c-confirm').hidden = true;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const took = timeUp ? T.min * 60 : (Date.now() - T.start) / 1000;
    let c = 0, w = 0;
    const topics = {};
    T.qs.forEach((q, i) => {
      const tp = topics[q.t] = topics[q.t] || {c: 0, w: 0, n: 0};
      tp.n++;
      if (T.ans[i] === null) return;
      if (T.ans[i] === q.a) { c++; tp.c++; } else { w++; tp.w++; }
    });
    const score = +(c - w * T.neg).toFixed(2);
    DBC.attempts.push({d: Date.now(), bank: BANK.id, n: T.n, c, w, score});
    if (DBC.attempts.length > 100) DBC.attempts.shift();
    save();
    renderResult({c, w, s: T.n - c - w, score, took, timeUp, topics});
    show('result');
    window.scrollTo(0, $('#c-app').offsetTop - 80);
  }

  /* ---------- result ---------- */
  function renderResult(r) {
    const pct = Math.round(100 * r.score / T.n);
    $('#cr-score').innerHTML = `${r.score} <small>/ ${T.n}</small>`;
    $('#cr-line').textContent = `${pct}% · ${r.timeUp ? 'time ran out' : `submitted in ${Math.floor(r.took / 60)} min ${Math.round(r.took % 60)} s`}${T.neg ? ` · ${T.neg} mark deducted per wrong answer` : ' · no negative marking'}`;
    const cells = [['Correct', r.c], ['Wrong', r.w], ['Not answered', r.s], ['Accuracy', (r.c + r.w ? Math.round(100 * r.c / (r.c + r.w)) : 0) + '%']];
    $('#cr-cells').innerHTML = cells.map(([a, b]) => `<div class="cell"><span class="c-l">${a}</span><span class="c-v">${b}</span></div>`).join('');
    $('#cr-topics').innerHTML = `<thead><tr><th>Topic</th><th class="num">Questions</th><th class="num">Correct</th><th class="num">Wrong</th></tr></thead><tbody>${Object.entries(r.topics).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v.n}</td><td class="num">${v.c}</td><td class="num">${v.w}</td></tr>`).join('')}</tbody>`;
    renderReview();
    renderHistory();
  }
  function renderReview() {
    const onlyWrong = $('#cr-wrong').checked;
    $('#cr-review').innerHTML = T.qs.map((q, i) => {
      const a = T.ans[i], ok = a === q.a;
      if (onlyWrong && ok) return '';
      const tag = a === null ? '<span class="c-tag skip">Not answered</span>' : ok ? '<span class="c-tag ok">Correct</span>' : '<span class="c-tag no">Wrong</span>';
      return `<li class="c-rev"><div class="c-revq"><b>${i + 1}.</b> ${esc(q.q)} ${tag}</div>
        <ul>${q.o.map((o, k) => `<li class="${k === q.a ? 'right' : k === a ? 'mine' : ''}"><span class="c-let">${LETTERS[k]}</span>${esc(o)}${k === a ? ' <small>(your answer)</small>' : ''}</li>`).join('')}</ul>
        <p class="c-exp">${esc(q.e)}</p></li>`;
    }).join('') || '<li class="muted">No wrong answers. Well done.</li>';
  }

  /* ---------- wiring ---------- */
  $('#c-name').value = DBC.name || '';
  $('#c-count').innerHTML = [10, 25, 50].filter(n => n <= BANK.questions.length).map(n => `<option value="${n}"${n === 25 ? ' selected' : ''}>${n} questions, ${n} minutes</option>`).join('');
  $('#c-total').textContent = BANK.questions.length;
  $('#c-setup').addEventListener('submit', start);
  $('#c-opts').addEventListener('change', e => { if (e.target.name === 'c-opt') T.sel[T.cur] = +e.target.value; });
  $('#c-save').addEventListener('click', saveNext);
  $('#c-mark').addEventListener('click', markNext);
  $('#c-clear').addEventListener('click', clearResp);
  $('#c-pal').addEventListener('click', e => { const b = e.target.closest('.c-pb'); if (b) { go(+b.dataset.i); $('#c-side').classList.remove('open'); } });
  $('#c-paltoggle').addEventListener('click', () => $('#c-side').classList.toggle('open'));
  $('#c-submit').addEventListener('click', askSubmit);
  $('#c-no').addEventListener('click', () => { $('#c-confirm').hidden = true; });
  $('#c-yes').addEventListener('click', () => finish(false));
  $('#cr-wrong').addEventListener('change', renderReview);
  $('#cr-again').addEventListener('click', () => { T = null; show('setup'); window.scrollTo(0, $('#c-app').offsetTop - 80); });
  $('#c-shell').addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('beforeunload', e => { if (T && T.running) { e.preventDefault(); e.returnValue = ''; } });
  renderHistory();
  show('setup');
})();
