import {isAuth} from "./isAuth";

export const setUserFromDB = async (setUser) => {
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
            .then((result) => setUser(result))
            .catch((error) => console.log(error));
    } else {
        setUser({_id: 0, institute: ''});
    }
}
