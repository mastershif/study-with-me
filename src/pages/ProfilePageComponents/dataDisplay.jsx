import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withWidth } from "@material-ui/core";
import {isAuth} from "../signInComponents/isAuth";

class DataDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            username: "",
            emailAddress: "",
            institute: "",
            degree: "",
            major: "",
            minor: "",
        };
    }

    async componentDidMount() {
        if (await isAuth()) {
            await fetch("http://localhost:5000/profile/userInformation", {
                credentials: "include",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(res.json());
                })
                .then(
                    (result) => {
                        this.setState({
                            userID: result._id,
                            emailAddress: result.email,
                            username: result.username,
                            institute: result.institute,
                            degree: result.degree,
                            major: result.major,
                            minor: result.minor
                        });
                    }
                )
                .catch((error) => {console.log("There was a problem!", error)});
        }
    }

    render() {
        if (
            this.state.degree === "אחר" ||
            this.state.degree === "" ||
            this.state.major === ""
        ) {
            return (
                <Grid container alignItems={"center"}>
                    <Grid item style={{ marginRight: 20 }}>
                        <h4>שם משתמש:</h4>
                        <h4>כתובת אימייל:</h4>
                        <h4>מוסד לימודים:</h4>
                        <h4>תואר:</h4>
                    </Grid>
                    <Grid item style={{ marginRight: 35 }}>
                        <h4>{this.state.username}</h4>
                        <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
                        <h4>{this.state.institute}</h4>
                        <h4>{this.state.degree}</h4>
                    </Grid>
                </Grid>
            );
        } else if (this.state.minor === "") {
            return (
                <Grid container alignItems={"center"}>
                    <Grid item style={{ marginRight: 20 }}>
                        <h4>שם משתמש:</h4>
                        <h4>כתובת אימייל:</h4>
                        <h4>מוסד לימודים:</h4>
                        <h4>תואר:</h4>
                        <h4>חוג ראשי:</h4>
                    </Grid>
                    <Grid item style={{ marginRight: 35 }}>
                        <h4>{this.state.username}</h4>
                        <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
                        <h4>{this.state.institute}</h4>
                        <h4>{this.state.degree}</h4>
                        <h4>{this.state.major}</h4>
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Grid container alignItems={"center"}>
                    <Grid item style={{ marginRight: 20 }}>
                        <h4>שם משתמש:</h4>
                        <h4>כתובת אימייל:</h4>
                        <h4>מוסד לימודים:</h4>
                        <h4>תואר:</h4>
                        <h4>חוג ראשי:</h4>
                        <h4>חוג משני:</h4>
                    </Grid>
                    <Grid item style={{ marginRight: 35 }}>
                        <h4>{this.state.username}</h4>
                        <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
                        <h4>{this.state.institute}</h4>
                        <h4>{this.state.degree}</h4>
                        <h4>{this.state.major}</h4>
                        <h4>{this.state.minor}</h4>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default withWidth()(DataDisplay);
