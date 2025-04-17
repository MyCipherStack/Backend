import { AppearanceSettings, PersonalInfo, SecuritySettings, UserPreferences } from "../interfaces/ProfileInterfaces.js"



//  HERE IAM USING THAT POWER OF DTO

export class ProfileDTO{
    
        personal: PersonalInfo
        appearance: AppearanceSettings
        security: SecuritySettings
        preferences:UserPreferences

        constructor(personal: PersonalInfo,appearance:AppearanceSettings,preferences:UserPreferences,security:SecuritySettings){
            this.personal = {
                displayName: personal.displayName,
                username: personal.username,
                email: personal.email,
                phone: personal.phone,
                bio: personal.bio,
                github: personal.github,
                twitter: personal.twitter,
                linkedin: personal.linkedin,
                avatar: personal.avatar,
              };
          
              this.appearance = {
                theme: appearance.theme,
                accentColor: appearance.accentColor,
              };
          
              this.security = {
                currentPassword: security.currentPassword,
                newPassword: security.newPassword,
                confirmPassword: security.confirmPassword,
                twoFactorEnabled: security.twoFactorEnabled,
              };
          
              this.preferences = {
                emailNotifications: preferences.emailNotifications,
                interviewReminders: preferences.interviewReminders,
                contestReminders: preferences.contestReminders,
                language: preferences.language,
                timezone: preferences.timezone,
                publicProfile: preferences.publicProfile,
                showActivity: preferences.showActivity,
              };
        }


}