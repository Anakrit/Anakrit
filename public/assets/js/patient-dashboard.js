import {
  sampleExperts,
  sampleTrials,
  samplePublications,
  sampleForums,
} from '../../data/sample-data.js';

const FAVORITES_KEY = 'curalink-patient-favorites';

function readProfile() {
  const stored = localStorage.getItem('curalink-patient-profile');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Unable to parse profile', error);
    return null;
  }
}

function saveFavorite(type, item) {
  const existing = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
  const items = existing[type] || [];
  const isPresent = items.some((entry) => entry.id === item.id);
  if (!isPresent) {
    existing[type] = [...items, item];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(existing));
  }
  alert(`${item.title || item.name} was added to favorites.`);
}

function renderTags(container, tags) {
  const fragment = document.createDocumentFragment();
  tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    fragment.appendChild(span);
  });
  container.appendChild(fragment);
}

function populateExperts(profile) {
  const list = document.getElementById('experts-list');
  const empty = document.getElementById('experts-empty');
  const count = document.getElementById('expert-count');
  const locationFilter = document.getElementById('expert-location-filter');
  const searchInput = document.getElementById('expert-search');

  function applyFilters() {
    const preference = locationFilter.value;
    const search = searchInput.value.toLowerCase();

    const matches = sampleExperts.filter((expert) => {
      const matchesCondition =
        profile.conditions.length === 0 ||
        expert.specialties.some((spec) =>
          profile.conditions
            .map((condition) => condition.toLowerCase())
            .includes(spec.toLowerCase())
        );

      const matchesLocation =
        preference === 'all' ||
        (preference === 'nearby' && profile.location &&
          expert.locations.some((loc) =>
            loc.toLowerCase().includes(profile.location.toLowerCase())
          )) ||
        (preference === 'global');

      const matchesSearch =
        search.trim().length === 0 ||
        expert.specialties.join(' ').toLowerCase().includes(search);

      return matchesCondition && matchesLocation && matchesSearch;
    });

    list.innerHTML = '';
    if (matches.length === 0) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      matches.forEach((expert) => {
        const card = document.createElement('article');
        card.className = 'list-card';
        card.innerHTML = `
          <h3>${expert.name}</h3>
          <p>${expert.title}</p>
          <p>${expert.summary}</p>
        `;

        const tagContainer = document.createElement('div');
        tagContainer.className = 'list-card__tags';
        renderTags(tagContainer, expert.specialties);
        card.appendChild(tagContainer);

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.innerHTML = `
          <span class="badge">${expert.available ? 'Accepting meetings' : 'Request via admin'}</span>
          <button type="button">Save</button>
        `;
        actions.querySelector('button').addEventListener('click', () =>
          saveFavorite('experts', {
            id: expert.id,
            name: expert.name,
            title: expert.title,
            summary: expert.summary,
            specialties: expert.specialties,
          })
        );
        card.appendChild(actions);
        list.appendChild(card);
      });
    }
    count.textContent = matches.length;
  }

  locationFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
  applyFilters();
}

function populateTrials(profile) {
  const list = document.getElementById('trials-list');
  const empty = document.getElementById('trials-empty');
  const count = document.getElementById('trial-count');
  const statusFilter = document.getElementById('trial-status-filter');
  const searchInput = document.getElementById('trial-search');

  function applyFilters() {
    const status = statusFilter.value;
    const search = searchInput.value.toLowerCase();

    const matches = sampleTrials.filter((trial) => {
      const conditionMatches =
        profile.conditions.length === 0 ||
        profile.conditions
          .map((condition) => condition.toLowerCase())
          .some((condition) => trial.condition.toLowerCase().includes(condition));

      const statusMatches = status === 'all' || trial.status === status;
      const searchMatches =
        search.trim().length === 0 ||
        [trial.title, trial.summary, trial.location]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return conditionMatches && statusMatches && searchMatches;
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
          <p><strong>Phase:</strong> ${trial.phase} · <strong>Status:</strong> ${trial.status}</p>
          <p><strong>Location:</strong> ${trial.location}</p>
        `;

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.innerHTML = `
          <a href="mailto:${trial.contact}">Email coordinator</a>
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

  statusFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
  applyFilters();
}

function populatePublications(profile) {
  const list = document.getElementById('publications-list');
  const empty = document.getElementById('publications-empty');
  const count = document.getElementById('publication-count');
  const searchInput = document.getElementById('publication-search');

  function applyFilters() {
    const search = searchInput.value.toLowerCase();

    const matches = samplePublications.filter((publication) => {
      const conditionMatches =
        profile.conditions.length === 0 ||
        profile.conditions
          .map((condition) => condition.toLowerCase())
          .some((condition) => publication.condition.toLowerCase().includes(condition));

      const searchMatches =
        search.trim().length === 0 ||
        [publication.title, publication.summary, publication.journal]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return conditionMatches && searchMatches;
    });

    list.innerHTML = '';
    if (matches.length === 0) {
      empty.hidden = false;
    } else {
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
          <a href="${publication.url}" target="_blank" rel="noopener">Read full paper</a>
          <button type="button">Save</button>
        `;
        actions.querySelector('button').addEventListener('click', () =>
          saveFavorite('publications', publication)
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

function populateForums(profile) {
  const list = document.getElementById('forums-list');
  const empty = document.getElementById('forums-empty');

  const matches = sampleForums.filter((forum) => forum.audience === 'patients');

  list.innerHTML = '';
  if (matches.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  matches.forEach((forum) => {
    const card = document.createElement('article');
    card.className = 'list-card';
    card.innerHTML = `
      <h3>${forum.title}</h3>
      <p>${forum.summary}</p>
      <span class="badge">${forum.replies} researcher replies</span>
    `;
    list.appendChild(card);
  });
}

function initialize() {
  const profile = readProfile();
  if (!profile) {
    window.location.href = 'patient-onboarding.html';
    return;
  }

  document.getElementById('patient-greeting').textContent = `Welcome back, ${profile.name}`;
  const summary = profile.conditions.length
    ? `Curated for: ${profile.conditions.join(', ')}`
    : 'Tell us what you are exploring to unlock personalized recommendations.';
  document.getElementById('patient-summary').textContent = summary;

  populateExperts(profile);
  populateTrials(profile);
  populatePublications(profile);
  populateForums(profile);
}

initialize();
