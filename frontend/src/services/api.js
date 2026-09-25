import {
  personalInfo as fallbackPersonalInfo,
  heroHighlights as fallbackHeroHighlights,
  education as fallbackEducation,
  journeyTimeline as fallbackJourneyTimeline,
  skillsCategorized as fallbackSkillsCategorized,
  projects as fallbackProjects,
  certifications as fallbackCertifications,
  currentlyExploring as fallbackCurrentlyExploring,
  experience as fallbackExperience,
  achievements as fallbackAchievements,
} from '../utils/constants';

const API_BASE = '/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`API fetch notice on ${endpoint}, using static fallback:`, err.message || err);
    return null;
  }
}

export async function getProfileApi() {
  const data = await fetchJson('/profile');
  if (data && data.name) {
    return {
      personalInfo: {
        name: data.name || fallbackPersonalInfo.name,
        title: data.title || fallbackPersonalInfo.title,
        tagline: data.tagline || fallbackPersonalInfo.tagline,
        email: data.email || fallbackPersonalInfo.email,
        location: data.location || fallbackPersonalInfo.location,
        bio: data.bio || fallbackPersonalInfo.bio,
        github: data.github || fallbackPersonalInfo.github,
        linkedin: data.linkedin || fallbackPersonalInfo.linkedin,
        resume: data.resume || fallbackPersonalInfo.resume,
      },
      heroHighlights: data.heroHighlights?.length ? data.heroHighlights : fallbackHeroHighlights,
      currentlyExploring: data.currentlyExploring?.length ? data.currentlyExploring : fallbackCurrentlyExploring,
    };
  }
  return {
    personalInfo: fallbackPersonalInfo,
    heroHighlights: fallbackHeroHighlights,
    currentlyExploring: fallbackCurrentlyExploring,
  };
}

export async function getEducationApi() {
  const data = await fetchJson('/education');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      degree: item.degree,
      institution: item.institution,
      period: item.period,
      cgpa: item.cgpa,
      description: item.description,
    }));
  }
  return fallbackEducation;
}

export async function getJourneyApi() {
  const data = await fetchJson('/journey');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      title: item.title,
      subtitle: item.subtitle,
      period: item.period,
      description: item.description,
    }));
  }
  return fallbackJourneyTimeline;
}

export async function getSkillsApi() {
  const data = await fetchJson('/skills');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item) => ({
      category: item.category,
      description: item.description,
      skills: item.skills,
    }));
  }
  return fallbackSkillsCategorized;
}

export async function getProjectsApi() {
  const data = await fetchJson('/projects');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      title: item.title,
      category: item.category,
      isProminent: item.isProminent,
      tag: item.tag,
      description: item.description,
      technologies: item.technologies || [],
      image: item.image,
      demo: item.demo,
      github: item.github,
      keyFeatures: item.keyFeatures || [],
    }));
  }
  return fallbackProjects;
}

export async function getExperienceApi() {
  const data = await fetchJson('/experience');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      title: item.title,
      company: item.company,
      location: item.location,
      period: item.period,
      type: item.type,
      highlights: item.highlights || [],
      technologies: item.technologies || [],
      projectsMentioned: item.projectsMentioned || [],
    }));
  }
  return fallbackExperience;
}

export async function getCertificationsApi() {
  const data = await fetchJson('/certifications');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      title: item.title,
      organization: item.organization,
      date: item.date,
      category: item.category,
      credentialId: item.credentialId,
      skills: item.skills || [],
      description: item.description,
      link: item.link,
    }));
  }
  return fallbackCertifications;
}

export async function getAchievementsApi() {
  const data = await fetchJson('/achievements');
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item, idx) => ({
      id: item._id || item.id || idx + 1,
      title: item.title,
      category: item.category,
      description: item.description,
      icon: item.icon,
    }));
  }
  return fallbackAchievements;
}

export async function submitContactForm(formData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error('Failed to send contact message');
  }
  return await res.json();
}
