import { sampleTags } from '../../data/sample-data.js';

function extractConditions(inputText, fallbackList) {
  if (!inputText) return fallbackList;
  const delimiters = /[,;\n]/;
  const tokens = inputText
    .split(delimiters)
    .map((item) => item.trim())
    .filter(Boolean);
  if (tokens.length === 0) return fallbackList;
  return Array.from(new Set(tokens));
}

document
  .getElementById('patient-onboarding-form')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const location = formData.get('location').trim();
    const conditionText = formData.get('condition').trim();
    const manualConditions = formData.get('conditions').trim();
    const distance = formData.get('distance');

    if (!name || !email || !conditionText) {
      alert('Please fill in your name, email, and condition to continue.');
      return;
    }

    const autoConditions = extractConditions(conditionText, []);
    const inferredFromNarrative = sampleTags.filter((tag) =>
      conditionText.toLowerCase().includes(tag.toLowerCase())
    );
    const additionalConditions = extractConditions(manualConditions, []);
    const allConditions = Array.from(
      new Set([...autoConditions, ...additionalConditions, ...inferredFromNarrative])
    );

    const profile = {
      role: 'patient',
      name,
      email,
      location,
      conditions: allConditions,
      narrative: conditionText,
      distance,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('curalink-patient-profile', JSON.stringify(profile));

    window.location.href = 'patient-dashboard.html';
  });
