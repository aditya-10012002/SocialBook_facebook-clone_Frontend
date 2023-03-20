import axios from "axios";

export const loginCall = async (userCredential, setError, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("https://socialbook-api.cyclic.app/api/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        setError(err)
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};