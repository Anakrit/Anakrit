const FAVORITES_KEY = 'curalink-researcher-favorites';

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
  } catch (error) {
    console.error('Unable to parse favorites', error);
    return {};
  }
}

function renderList(items, containerId, emptyId, renderer) {
  const container = document.getElementById(containerId);
  const empty = document.getElementById(emptyId);
  container.innerHTML = '';

  if (!items || items.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'list-card';
    card.innerHTML = renderer(item);
    container.appendChild(card);
  });
}

function initialize() {
  const favorites = loadFavorites();

  renderList(
    favorites.collaborators,
    'favorites-collaborators',
    'favorites-collaborators-empty',
    (collaborator) => `
      <h3>${collaborator.name}</h3>
      <p>${collaborator.title}</p>
      <p>${collaborator.summary}</p>
      <div class="badge">${collaborator.publications} publications</div>
    `
  );

  renderList(
    favorites.trials,
    'favorites-researcher-trials',
    'favorites-researcher-trials-empty',
    (trial) => `
      <h3>${trial.title}</h3>
      <p>${trial.summary}</p>
      <p><strong>Condition:</strong> ${trial.condition}</p>
      <p><strong>Status:</strong> ${trial.status}</p>
      <a href="mailto:${trial.contact}">Email coordinator</a>
    `
  );

  renderList(
    favorites.publications,
    'favorites-researcher-publications',
    'favorites-researcher-publications-empty',
    (publication) => `
      <h3>${publication.title}</h3>
      <p><strong>${publication.journal}</strong></p>
      <p>${publication.summary}</p>
      <a href="${publication.url}" target="_blank" rel="noopener">Open resource</a>
    `
  );
}

initialize();
