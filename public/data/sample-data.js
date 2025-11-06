const sampleExperts = [
  {
    id: 'exp-1',
    name: 'Dr. Maya Chen',
    title: 'Neuro-oncologist, Boston Medical Center',
    specialties: ['Brain Cancer', 'Glioma'],
    interests: ['Precision Oncology', 'Clinical Trials'],
    locations: ['Boston, USA'],
    available: true,
    summary:
      'Leading investigator for immunotherapy trials focused on aggressive brain tumors.',
  },
  {
    id: 'exp-2',
    name: 'Dr. Daniel Ibanez',
    title: 'Medical Oncologist, Hospital Clínic Barcelona',
    specialties: ['Lung Cancer', 'Immunotherapy'],
    interests: ['Cell Therapy', 'Clinical AI'],
    locations: ['Barcelona, Spain'],
    available: false,
    summary:
      'Pioneer in AI-assisted screening protocols for lung cancer patient eligibility.',
  },
  {
    id: 'exp-3',
    name: 'Dr. Fatima Al-Masri',
    title: 'Radiation Oncologist, Cleveland Clinic',
    specialties: ['Breast Cancer', 'Lymphoma'],
    interests: ['Radiomics', 'Patient Outcomes'],
    locations: ['Cleveland, USA'],
    available: true,
    summary:
      'Researches radiation dosing strategies and their long-term quality of life outcomes.',
  },
];

const sampleCollaborators = [
  {
    id: 'col-1',
    name: 'Dr. Kevin Matthews',
    title: 'Director of Translational Medicine, Stanford',
    specialties: ['Immunology', 'Oncology'],
    interests: ['CAR-T', 'Gene Therapy'],
    publications: 64,
    summary:
      'Works on bridging laboratory discoveries to early-phase immunotherapy trials.',
  },
  {
    id: 'col-2',
    name: 'Dr. Aisha Rahman',
    title: 'AI in Health Fellow, Imperial College',
    specialties: ['Clinical AI', 'Neurology'],
    interests: ['Predictive Modelling', 'Neurodegeneration'],
    publications: 48,
    summary:
      'Builds explainable AI models to predict neurological disorder progression.',
  },
];

const sampleTrials = [
  {
    id: 'trial-1',
    title: 'NCT06562582: Precision Immunotherapy for Glioblastoma',
    condition: 'Brain Cancer',
    phase: 'Phase 2',
    status: 'Recruiting',
    location: 'Boston, USA',
    contact: 'gliotrial@bmc.org',
    summary:
      'Evaluates personalized vaccine approaches for patients with recurrent glioblastoma.',
  },
  {
    id: 'trial-2',
    title: 'NCT05433218: Low-dose CT Screening for Lung Cancer',
    condition: 'Lung Cancer',
    phase: 'Phase 3',
    status: 'Active, not recruiting',
    location: 'Barcelona, Spain',
    contact: 'lungscreen@clinic.es',
    summary:
      'Assesses how AI-assisted CT scanning impacts early detection of lung cancer.',
  },
  {
    id: 'trial-3',
    title: 'NCT05890045: Telehealth Recovery for Lymphoma Survivors',
    condition: 'Lymphoma',
    phase: 'Phase 2',
    status: 'Recruiting',
    location: 'Remote',
    contact: 'lymphoma@ccf.org',
    summary:
      'Explores telehealth coaching for improving long-term outcomes in lymphoma survivors.',
  },
];

const samplePublications = [
  {
    id: 'pub-1',
    title: 'Adaptive Immunotherapy Strategies in Glioma',
    journal: 'Nature Medicine',
    condition: 'Glioma',
    url: 'https://www.nature.com/articles/example',
    summary:
      'Summarizes breakthroughs in adaptive immunotherapy regimens for glioma patients.',
  },
  {
    id: 'pub-2',
    title: 'AI-driven Triage in Acute Lung Cancer Care',
    journal: 'Journal of Clinical Oncology',
    condition: 'Lung Cancer',
    url: 'https://ascopubs.org/doi/example',
    summary:
      'Reviews recent clinical AI tools that support lung cancer patient management.',
  },
  {
    id: 'pub-3',
    title: 'Patient-reported Outcomes after Lymphoma Treatment',
    journal: 'The Lancet',
    condition: 'Lymphoma',
    url: 'https://thelancet.com/journals/example',
    summary:
      'Discusses patient experience data to guide shared decision making post treatment.',
  },
];

const sampleForums = [
  {
    id: 'forum-1',
    title: 'Navigating glioma treatment side-effects',
    audience: 'patients',
    replies: 12,
    summary:
      'Patients share questions about managing fatigue and cognitive changes during treatment.',
  },
  {
    id: 'forum-2',
    title: 'Designing AI pipelines with limited datasets',
    audience: 'researchers',
    replies: 8,
    summary: 'Best practices for data augmentation and federated learning in oncology.',
  },
  {
    id: 'forum-3',
    title: 'Preparing for immunotherapy eligibility interviews',
    audience: 'patients',
    replies: 5,
    summary: 'What clinicians expect and how to document symptom history effectively.',
  },
];

const sampleTags = [
  'Brain Cancer',
  'Glioma',
  'Lung Cancer',
  'Immunology',
  'Clinical AI',
  'Telehealth',
  'Gene Therapy',
  'Precision Oncology',
];

export {
  sampleExperts,
  sampleCollaborators,
  sampleTrials,
  samplePublications,
  sampleForums,
  sampleTags,
};
