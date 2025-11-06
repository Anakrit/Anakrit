import {
  sampleCollaborators,
  sampleTrials,
  sampleForums,
  samplePublications,
} from '../../data/sample-data.js';

const FAVORITES_KEY = 'curalink-researcher-favorites';

function readProfile() {
  const stored = localStorage.getItem('curalink-researcher-profile');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Unable to parse researcher profile', error);
    return null;
  }
}

function saveFavorite(type, item) {
  const existing = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
  const items = existing[type] || [];
  const exists = items.some((entry) => entry.id === item.id);
  if (!exists) {
    existing[type] = [...items, item];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(existing));
  }
  alert(`${item.title || item.name} saved to favorites.`);
}

function populateCollaborators(profile) {
  const list = document.getElementById('collaborators-list');
  const empty = document.getElementById('collaborators-empty');
  const count = document.getElementById('collaborator-count');
  const searchInput = document.getElementById('collaborator-search');

  function applyFilters() {
    const search = searchInput.value.toLowerCase();

    const matches = sampleCollaborators.filter((collaborator) => {
      const specialtyMatch =
        profile.specialties.length === 0 ||
        collaborator.specialties.some((specialty) =>
          profile.specialties
            .map((item) => item.toLowerCase())
            .includes(specialty.toLowerCase())
        );

      const interestMatch =
        profile.interests.length === 0 ||
        collaborator.interests?.some((interest) =>
          profile.interests
            .map((item) => item.toLowerCase())
            .includes(interest.toLowerCase())
        );

      const searchMatch =
        search.trim().length === 0 ||
        [collaborator.name, collaborator.title, collaborator.summary]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return specialtyMatch && interestMatch && searchMatch;
    });

    list.innerHTML = '';
    if (matches.length === 0) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      matches.forEach((collaborator) => {
        const card = document.createElement('article');
        card.className = 'list-card';
        card.innerHTML = `
          <h3>${collaborator.name}</h3>
          <p>${collaborator.title}</p>
          <p>${collaborator.summary}</p>
          <div class="badge">${collaborator.publications} publications</div>
        `;
        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.innerHTML = `
          <button type="button">Connect</button>
          <button type="button" data-action="save">Save</button>
        `;
        actions.querySelector('[data-action="save"]').addEventListener('click', () =>
          saveFavorite('collaborators', collaborator)
        );
        card.appendChild(actions);
        list.appendChild(card);
      });
    }
    count.textContent = matches.length;
  }

  searchInput.addEventListener('input', applyFilters);
  applyFilters();
}

function populateTrials(profile) {
  const list = document.getElementById('researcher-trials-list');
  const empty = document.getElementById('researcher-trials-empty');
  const count = document.getElementById('researcher-trial-count');
  const searchInput = document.getElementById('researcher-trial-search');

  function applyFilters() {
    const search = searchInput.value.toLowerCase();

    const matches = sampleTrials.filter((trial) => {
      const interestMatch =
        profile.interests.length === 0 ||
        profile.interests
          .map((interest) => interest.toLowerCase())
          .some((interest) => trial.summary.toLowerCase().includes(interest));

      const searchMatch =
        search.trim().length === 0 ||
        [trial.title, trial.summary, trial.condition]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return interestMatch && searchMatch;
    });

    list.innerHTML = '';
    if (matches.length === 0) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      matches.forEach((trial) => {
        const card = document.createElement('article');
        card.className = 'list-card';
        card.innerHTML = `
          <h3>${trial.title}</h3>
          <p>${trial.summary}</p>
          <p><strong>Condition:</strong> ${trial.condition}</p>
          <p><strong>Status:</strong> ${trial.status}</p>
        `;
        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.innerHTML = `
          <a href="mailto:${trial.contact}">Update status</a>
          <button type="button">Save</button>
        `;
        actions.querySelector('button').addEventListener('click', () =>
          saveFavorite('trials', trial)
        );
        card.appendChild(actions);
        list.appendChild(card);
      });
    }
    count.textContent = matches.length;
  }

  searchInput.addEventListener('input', applyFilters);
  applyFilters();
}

function populateForums() {
  const list = document.getElementById('researcher-forums-list');
  const empty = document.getElementById('researcher-forums-empty');
  const count = document.getElementById('forum-count');

  const matches = sampleForums.filter((forum) => forum.audience === 'patients');

  list.innerHTML = '';
  if (matches.length === 0) {
    empty.hidden = false;
    count.textContent = '0';
    return;
  }

  empty.hidden = true;
  matches.forEach((forum) => {
    const card = document.createElement('article');
    card.className = 'list-card';
    card.innerHTML = `
      <h3>${forum.title}</h3>
      <p>${forum.summary}</p>
      <p><strong>${forum.replies}</strong> patient replies awaiting response</p>
    `;
    list.appendChild(card);
  });
  count.textContent = matches.length;
}

function populatePublications(profile) {
  const list = document.getElementById('researcher-publications-list');
  const empty = document.getElementById('researcher-publications-empty');
  const searchInput = document.getElementById('researcher-publication-search');

  function applyFilters() {
    const search = searchInput.value.toLowerCase();

    const matches = samplePublications.filter((publication) => {
      const interestMatch =
        profile.interests.length === 0 ||
        profile.interests
          .map((interest) => interest.toLowerCase())
          .some((interest) => publication.summary.toLowerCase().includes(interest));

      const searchMatch =
        search.trim().length === 0 ||
        [publication.title, publication.summary, publication.journal]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return interestMatch && searchMatch;
    });

    list.innerHTML = '';
    if (matches.length === 0) {
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    matches.forEach((publication) => {
      const card = document.createElement('article');
      card.className = 'list-card';
      card.innerHTML = `
        <h3>${publication.title}</h3>
        <p><strong>${publication.journal}</strong></p>
        <p>${publication.summary}</p>
      `;
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      actions.innerHTML = `
        <a href="${publication.url}" target="_blank" rel="noopener">Open journal</a>
        <button type="button">Save</button>
      `;
      actions.querySelector('button').addEventListener('click', () =>
        saveFavorite('publications', publication)
      );
      card.appendChild(actions);
      list.appendChild(card);
    });
  }

  searchInput.addEventListener('input', applyFilters);
  applyFilters();
}

function highlightPublications(profile) {
  const topPublication = samplePublications.find((publication) =>
    profile.interests
      .map((interest) => interest.toLowerCase())
      .some((interest) => publication.summary.toLowerCase().includes(interest))
  );

  if (topPublication) {
    const summaryEl = document.getElementById('researcher-summary');
    summaryEl.innerHTML = `Next to read: <strong>${topPublication.title}</strong> · ${topPublication.summary}`;
  }
}

function initialize() {
  const profile = readProfile();
  if (!profile) {
    window.location.href = 'researcher-onboarding.html';
    return;
  }

  document.getElementById('researcher-greeting').textContent = `Hello, ${profile.name}`;
  document.getElementById('researcher-summary').textContent =
    'Stay close to the collaborators, trials, and forums that move your work forward.';

  populateCollaborators(profile);
  populateTrials(profile);
  populateForums();
  populatePublications(profile);
  highlightPublications(profile);
}

initialize();
