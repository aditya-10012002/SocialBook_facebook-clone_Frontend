import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: {
    //     _id: "6405e9812e01fc0ebf0be9cf",
    //     username: "jenny",
    //     email: "jenny@gmail.com",
    //     password: "$2b$10$fuNq8/WBWQkXNLm/acuwS.GnaPa4MSnoHu5eFrqAKId4j8z6JVxA6",
    //     profilePicture: "person/1.jpeg",
    //     coverPicture: "",
    //     isAdmin: false,
    //     followers: [],
    //     followings: ["6405edf99f2c1a5f91ea7773"]
    // },
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}