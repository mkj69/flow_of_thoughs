const state = { papers: [], insights: [], dossiers: [], category: '', year: '', status: '', query: '' };

const els = {
  list: document.querySelector('#paper-list'),
  insightList: document.querySelector('#insight-list'),
  dossierList: document.querySelector('#dossier-list'),
  search: document.querySelector('#search'),
  category: document.querySelector('#category-filter'),
  year: document.querySelector('#year-filter'),
  status: document.querySelector('#status-filter'),
  count: document.querySelector('#result-count'),
  clear: document.querySelector('#clear-filters'),
};

function niceTag(tag) {
  return tag.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function renderInsights() {
  els.insightList.innerHTML = state.insights.map((x, i) => `
    <article class="insight-card" id="insight-${x.id}">
      <div class="insight-topline">
        <span class="insight-no">${String(i + 1).padStart(2, '0')}</span>
        <span class="evidence-level">${x.level}</span>
      </div>
      <h3>${x.title}</h3>
      <p class="insight-summary">${x.summary}</p>

      <div class="evidence-block">
        <h4>What the papers show</h4>
        <div class="evidence-items">
          ${x.evidence.map(e => `
            <div class="evidence-item">
              <span class="evidence-type ${e.type.toLowerCase()}">${e.type}</span>
              <div>
                <a href="${e.url}" target="_blank" rel="noreferrer">${e.paper} ↗</a>
                <p>${e.claim}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="synthesis-block">
        <div><span class="micro-label">SYNTHESIS</span><p>${x.synthesis}</p></div>
        <div><span class="micro-label gap-label">UNRESOLVED GAP</span><p>${x.gap}</p></div>
      </div>

      <details class="hypothesis-box">
        <summary>Testable hypotheses</summary>
        <ul>${x.hypotheses.map(h => `<li>${h}</li>`).join('')}</ul>
      </details>
    </article>
  `).join('');
}


function renderDossiers() {
  const roleLabel = {core: 'Core', root: 'Root', adjacent: 'Adjacent'};
  document.querySelector('#dossier-count').textContent = `${state.dossiers.length} paper-level evidence ledgers`;
  els.dossierList.innerHTML = state.dossiers.map((d, i) => `
    <article class="dossier-card">
      <div class="dossier-head">
        <div>
          <div class="dossier-kicker">${d.year} · ${roleLabel[d.role] || d.role}</div>
          <h3><a href="${d.url}" target="_blank" rel="noreferrer">${d.title} ↗</a></h3>
        </div>
        <span class="dossier-index">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <p class="dossier-question">${d.research_question}</p>
      <div class="mechanism-grid">
        <div><b>STATE</b><span>${d.state}</span></div>
        <div><b>UPDATE</b><span>${d.update}</span></div>
        <div><b>COMPUTE POLICY</b><span>${d.compute_policy}</span></div>
      </div>
      <details class="dossier-details">
        <summary>Inspect evidence</summary>
        <div class="dossier-columns">
          <div>
            <h4>Direct findings</h4>
            ${d.direct_findings.map(x => `
              <div class="claim-row">
                <span class="claim-badge direct">DIRECT</span>
                <p>${x.claim}<small>${x.source}</small></p>
              </div>`).join('')}
          </div>
          <div>
            <h4>Limitations / future</h4>
            ${d.limitations_future.map(x => `
              <div class="claim-row">
                <span class="claim-badge scope">SCOPE</span>
                <p>${x.claim}<small>${x.source}</small></p>
              </div>`).join('')}
          </div>
        </div>
        <div class="why-box">
          <b>WHY IT MATTERS</b>
          <p>${d.why_it_matters}</p>
          <div class="connections">${d.connections.map(c => `<span>${c}</span>`).join('')}</div>
        </div>
      </details>
    </article>
  `).join('');
}

function render() {
  const q = state.query.trim().toLowerCase();
  const filtered = state.papers.filter(p => {
    const haystack = [p.title, p.authors, p.state, p.compute, p.task, p.takeaway, p.why, ...(p.categories || [])].join(' ').toLowerCase();
    return (!q || haystack.includes(q)) &&
      (!state.category || p.categories.includes(state.category)) &&
      (!state.year || String(p.year) === state.year) &&
      (!state.status || p.status === state.status);
  }).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  els.count.textContent = `${filtered.length} of ${state.papers.length} papers`;
  if (!filtered.length) {
    els.list.innerHTML = '<div class="empty">No papers match these filters.</div>';
    return;
  }

  els.list.innerHTML = filtered.map(p => `
    <article class="paper">
      <div class="paper-year">${p.year}</div>
      <div>
        <span class="role">${p.status}</span>
        <h3><a href="${p.url}" target="_blank" rel="noreferrer">${p.title} ↗</a></h3>
        <div class="authors">${p.authors}</div>
        <p class="takeaway">${p.takeaway}</p>
        <div class="tags">${p.categories.map(c => `<span class="tag">${niceTag(c)}</span>`).join('')}</div>
      </div>
      <div class="paper-meta">
        <div class="meta-row"><strong>State</strong><br>${p.state}</div>
        <div class="meta-row"><strong>Compute</strong><br>${p.compute}</div>
        <div class="meta-row"><strong>Setting</strong><br>${p.task}</div>
        <div class="meta-row"><strong>Why it matters</strong><br>${p.why}</div>
      </div>
    </article>
  `).join('');
}

function syncFilters() {
  state.query = els.search.value;
  state.category = els.category.value;
  state.year = els.year.value;
  state.status = els.status.value;
  render();
}

async function init() {
  const [papersResponse, insightsResponse, dossiersResponse] = await Promise.all([
    fetch('data/papers.json'),
    fetch('data/insights.json'),
    fetch('data/dossiers.json')
  ]);
  state.papers = await papersResponse.json();
  state.insights = await insightsResponse.json();
  state.dossiers = await dossiersResponse.json();

  const categories = [...new Set(state.papers.flatMap(p => p.categories))].sort();
  const years = [...new Set(state.papers.map(p => p.year))].sort((a,b) => b-a);

  categories.forEach(c => els.category.insertAdjacentHTML('beforeend', `<option value="${c}">${niceTag(c)}</option>`));
  years.forEach(y => els.year.insertAdjacentHTML('beforeend', `<option value="${y}">${y}</option>`));

  document.querySelector('#stat-papers').textContent = state.papers.length;
  document.querySelector('#stat-years').textContent = new Set(state.papers.map(p => p.year)).size;
  document.querySelector('#stat-categories').textContent = categories.length;
  document.querySelector('#stat-insights').textContent = state.insights.length;

  [els.search, els.category, els.year, els.status].forEach(el => el.addEventListener('input', syncFilters));
  els.clear.addEventListener('click', () => {
    els.search.value = '';
    els.category.value = '';
    els.year.value = '';
    els.status.value = '';
    syncFilters();
  });

  document.querySelectorAll('.map-card').forEach(card => {
    card.addEventListener('click', () => {
      els.category.value = card.dataset.filter;
      state.category = card.dataset.filter;
      render();
      document.querySelector('#papers').scrollIntoView({behavior:'smooth'});
    });
  });

  renderInsights();
  renderDossiers();
  render();
}

init().catch(err => {
  console.error(err);
  els.list.innerHTML = '<div class="empty">Could not load the database. If you opened this file directly, serve the docs folder with a local HTTP server.</div>';
});
