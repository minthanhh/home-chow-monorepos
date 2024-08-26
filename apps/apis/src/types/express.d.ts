declare global {
    namespace Express {
        export interface Request {
            user?: {
                id?: string
                accessToken?: string
                refreshToken?: string
            }
        }
    }
}
