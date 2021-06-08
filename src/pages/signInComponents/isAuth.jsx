
export const isAuth = async () => {
    let isLoggedIn = false;
    await fetch("http://localhost:5000/isAuth", {
        credentials: "include"
    })
        .then((res) => { return res.json() })
        .then((result) => {
            if (result) {
                isLoggedIn = true;
            }
        })
        .catch((error) => {console.log("There was a problem!", error)});
    return isLoggedIn;
}
