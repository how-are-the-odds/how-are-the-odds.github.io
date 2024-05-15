import User from "./User"

interface LoginStatus {
    loggedIn: boolean
    user: User | null
}

export default LoginStatus