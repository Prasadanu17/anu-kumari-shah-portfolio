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

export async function getProfileApi() {
  return {
    personalInfo: fallbackPersonalInfo,
    heroHighlights: fallbackHeroHighlights,
    currentlyExploring: fallbackCurrentlyExploring,
  };
}

export async function getEducationApi() {
  return fallbackEducation;
}

export async function getJourneyApi() {
  return fallbackJourneyTimeline;
}

export async function getSkillsApi() {
  return fallbackSkillsCategorized;
}

export async function getProjectsApi() {
  return fallbackProjects;
}

export async function getExperienceApi() {
  return fallbackExperience;
}

export async function getCertificationsApi() {
  return fallbackCertifications;
}

export async function getAchievementsApi() {
  return fallbackAchievements;
}

/**
 * Submits the contact message using Web3Forms (serverless form submission).
 * Requires VITE_WEB3FORMS_ACCESS_KEY to be set in .env.
 */
export async function submitContactForm(formData) {
  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '50a164b7-f7ac-4995-87b4-16f07453d28d';

  if (!accessKey || accessKey.trim() === '' || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
    throw new Error(
      'Web3Forms access key is not configured. Please add your key to VITE_WEB3FORMS_ACCESS_KEY in frontend/.env'
    );
  }

  const payload = new FormData();
  payload.append('access_key', accessKey.trim());
  payload.append('name', formData.name);
  payload.append('email', formData.email);
  payload.append('message', formData.message);
  payload.append('subject', `Portfolio Contact: New message from ${formData.name}`);
  payload.append('from_name', `${formData.name} via Portfolio`);
  if (formData.botcheck) {
    payload.append('botcheck', 'spam');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: payload,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to submit form through Web3Forms.');
  }

  return result;
}
