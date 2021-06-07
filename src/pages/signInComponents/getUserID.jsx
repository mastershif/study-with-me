import {isAuth} from "./isAuth";

export const getUserID = async (setUserID) => {
    if (await isAuth()) {
        fetch("http://localhost:5000/profileSettings", {
            credentials: "include",
        })
            .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response.json());
                }
            )
            .then((result) => setUserID(result._id))
            .catch((error) => console.log(error));
    } else {
        setUserID(0);
    }
}
