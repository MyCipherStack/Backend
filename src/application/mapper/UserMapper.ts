import { User } from "@/domain/entities/User";



export class UserMapper {


    static toResponseDTO(user: User) {
        return {
            name: user.name,
            email: user.email,
            image: user.image,
            id: user._id,
            displayName: user.displayName,
            theme: user.theme,
            bio: user.bio,
            github: user.github,
            linkedin: user.linkedin,
            createdAt: user.createdAt,
            status: user.status,
            role: user.role,
            streak:user.streak,
            preferences: user.preferences,
            refreshToken: user.refreshToken,
            googleId: user.googleId,
            updatedAt: user.updatedAt,
            subscriptionId: user.subscriptionId,
        }
    }
}