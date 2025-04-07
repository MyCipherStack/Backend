//  entity should encapsulate important rules like email validation, password format rules, etc. You shouldn't create it just to wrap data — make it meaningful.
export class User {
    name;
    email;
    password;
    _id;
    constructor(name, email, password, _id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this._id = _id;
    }
    toDTO() {
        return {
            name: this.name,
            email: this.email
        };
    }
}
