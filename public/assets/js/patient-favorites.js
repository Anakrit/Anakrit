const FAVORITES_KEY = 'curalink-patient-favorites';

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
  } catch (error) {
    console.error('Unable to parse favorites', error);
    return {};
  }
}

function renderList(items, containerId, emptyId, renderItem) {
  const container = document.getElementById(containerId);
  const emptyState = document.getElementById(emptyId);
  container.innerHTML = '';

  if (!items || items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'list-card';
    card.innerHTML = renderItem(item);
    container.appendChild(card);
  });
}

function initialize() {
  const favorites = loadFavorites();

  renderList(
    favorites.experts,
    'favorites-experts',
    'favorites-experts-empty',
    (expert) => `
      <h3>${expert.name}</h3>
      <p>${expert.title}</p>
      <p>${expert.summary}</p>
      <div class="list-card__tags">
        ${(expert.specialties || [])
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join('')}
      </div>
    `
  );

  renderList(
    favorites.trials,
    'favorites-trials',
    'favorites-trials-empty',
    (trial) => `
      <h3>${trial.title}</h3>
      <p>${trial.summary}</p>
      <p><strong>Phase:</strong> ${trial.phase} · <strong>Status:</strong> ${trial.status}</p>
      <p><strong>Location:</strong> ${trial.location}</p>
      <a href="mailto:${trial.contact}">Email coordinator</a>
    `
  );

  renderList(
    favorites.publications,
    'favorites-publications',
    'favorites-publications-empty',
    (publication) => `
      <h3>${publication.title}</h3>
      <p><strong>${publication.journal}</strong></p>
      <p>${publication.summary}</p>
      <a href="${publication.url}" target="_blank" rel="noopener">Open publication</a>
    `
  );
}

initialize();
