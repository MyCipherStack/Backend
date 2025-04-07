import { User } from "./User.js";
export class temUser extends User {
    otp;
    createdAt;
    constructor(name, email, password, otp, createdAt) {
        super(name, email, password);
        this.otp = otp;
        this.createdAt = createdAt;
    }
}
