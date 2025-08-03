export interface PersonalInfo {
    displayName: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    github: string;
    linkedin: string;
    avatar: string;
  }

export interface AppearanceSettings {
    theme: string;
  }

export interface SecuritySettings {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
  }

export interface UserPreferences {
    emailNotifications: boolean;
    interviewReminders: boolean;
    contestReminders: boolean;
    language: string;
    timezone: string;
    publicProfile: boolean;
    showActivity: boolean;
  }
