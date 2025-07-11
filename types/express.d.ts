


declare global {

    namespace Express {

        interface User {
            id: string,
            name: string,
            role: string
        }

        interface Request {
            user?: User
        }
    }
}

export {}   //make the file a module 