import { User } from "../UserInterface";

declare global{
    namespace Express {
        interface Request {
            id: string
        }
    }
}