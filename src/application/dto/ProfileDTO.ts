import { AppearanceSettings, PersonalInfo, UserPreferences } from "../interfaces/ProfileInterfaces.js"



//  HERE IAM USING THAT POWER OF DTO

export class ProfileDTO{

  username: string;
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  github: string;
  linkedin: string;
  image: string;
  theme: string;
  preferences:UserPreferences

        constructor(personal: PersonalInfo,appearance:AppearanceSettings,preferences:UserPreferences){

                this.displayName= personal.displayName,
                this.username= personal.username,
                this.email= personal.email,
                this. phone= personal.phone,
                this.bio= personal.bio,
                this.github= personal.github,
                this.linkedin= personal.linkedin,
                this.image= personal.avatar,
                this.theme= appearance.theme,

    
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