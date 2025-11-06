function parseInputList(value) {
  if (!value) return [];
  return value
    .split(/[,;\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

document
  .getElementById('researcher-onboarding-form')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const organization = formData.get('organization').trim();
    const specialties = parseInputList(formData.get('specialties'));
    const interests = parseInputList(formData.get('interests'));
    const availability = formData.get('availability');
    const orcid = formData.get('orcid').trim();
    const researchgate = formData.get('researchgate').trim();

    if (!name || !email || interests.length === 0) {
      alert('Please share your name, email, and at least one research interest.');
      return;
    }

    const profile = {
      role: 'researcher',
      name,
      email,
      organization,
      specialties,
      interests,
      availability,
      orcid,
      researchgate,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('curalink-researcher-profile', JSON.stringify(profile));
    window.location.href = 'researcher-dashboard.html';
  });
