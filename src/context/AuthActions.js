export const LoginStart = userCredentials => ({
    type: "LOGIN_START"
});

export const LoginSuccess = user => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = error => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
});

export const UpdateUserPP = profilePicturePath => ({
    type: "UPDATE_PROFILE_PICTURE",
    payload: profilePicturePath
});

export const UpdateUserCP = coverPicturePath => ({
    type: "UPDATE_COVER_PICTURE",
    payload: coverPicturePath
});

export const UpdateUserDetails = userDetails => ({
    type: "UPDATE_USER_DETAILS",
    payload: userDetails
});