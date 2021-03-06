import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import CreateGroupCard from "./sharedComponents/createGroupCard";
import JoinGroupCard from "./sharedComponents/joinGroupCard";
import MainTitle from "./sharedComponents/mainTitle";
import styled from "styled-components";
import Description from "./sharedComponents/description";
import Profile from "./pages/profile";
import ProfileSettings from "./pages/profileSettings";
import CreateGroup from "./pages/createGroup";
import Header from "./sharedComponents/header";
import AccessDenied from "./pages/accessDenied";
import Search from "./pages/search";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";
import {ThemeProvider, StylesProvider, jssPreset} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import SignIn from "./pages/signIn";
import SecondaryTitle from "./sharedComponents/secondaryTitle";
import GroupPage from "./pages/groupPage";
import {isAuth} from "./pages/signInComponents/isAuth";
import MyGroups from "./pages/myGroups";


//In order that the material-ui components will work perfect in hebrew.
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const PageContainer = styled.div `
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainContent = styled.div `
  padding: 2rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const CardsGrid = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 980px;
  min-height: 250px;
  margin-top: 1.15rem;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = useState(false);
    const [group, setGroup] = useState();

    useEffect( () => {
        async function Authenticate() {
            await isAuth().then((value) => setIsLoggedIn(value));
            setShow(true);
        }
        Authenticate().then();
    }, [])

    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {
                    show &&
                    <Router>
                        <div>
                            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                                <Link to="/profile">Profile</Link>
                            </Header>
                            <Switch>
                                <Route exact path="/">
                                    <PageContainer>
                                        <MainContent>
                                            <MainTitle textLine1={'???????????? ???????????? ??????????'} textLine2={' ???? ?????? ?????????? ?????????? ????????'} />
                                            <SecondaryTitle text={'???????????? ?????????? ???? ??????????!'} />
                                            <CardsGrid>
                                                <JoinGroupCard />
                                                <CreateGroupCard isLoggedIn={isLoggedIn} />
                                            </CardsGrid>
                                            <Description text={'???????????? ?????????????? ???????????? ??????????????, ???????? ???? ?????????? ???? ?????? ?????? ?????????? ???? ????????????'} />
                                        </MainContent>
                                    </PageContainer>
                                </Route>
                                <Route path="/profile">
                                    {isLoggedIn ? <Profile /> :
                                        <Redirect to="/accessDenied" isLoggedIn={isLoggedIn}/> }
                                </Route>
                                <Route path = "/profileSettings">
                                    { isLoggedIn ? <ProfileSettings/> :
                                        <Redirect to="/accessDenied" isLoggedIn={isLoggedIn} /> }
                                </Route>
                                <Route path = "/myGroups">
                                    { isLoggedIn ? <MyGroups/> :
                                        <Redirect to="/accessDenied" isLoggedIn={isLoggedIn} /> }
                                </Route>
                                <Route path="/createGroup">
                                    {isLoggedIn ? <CreateGroup isEdit={false} group={null} /> :
                                        <Redirect to="/accessDenied" isLoggedIn={isLoggedIn} /> }
                                </Route>
                                <Route path="/group/:_id">
                                    {(props) => {
                                        const _id = props.match.params._id;
                                        fetch("http://localhost:5000/group/" + _id, {
                                            credentials: "include",
                                        })
                                            .then((response) => response.json())
                                            .then((result) => group === undefined ? setGroup(result) : null)
                                            .catch((error) => console.log(error));
                                        if (group) {
                                            return (<GroupPage group={group} />)
                                        }
                                        return null;
                                    }}
                                </Route>
                                <Route path="/editGroup/:_id">
                                    { isLoggedIn ? (props) => {
                                        const _id = props.match.params._id;
                                        let returnedValue;
                                        fetch("http://localhost:5000/group/" + _id, {
                                            credentials: "include",
                                        })
                                            .then((response) => response.json())
                                            .then((result) => {
                                                returnedValue = result;
                                                if (group === undefined) {
                                                    setGroup(result)
                                                }
                                            })
                                            .then(() => {
                                                fetch("http://localhost:5000/profileSettings", {
                                                    credentials: "include",
                                                })
                                                    .then((response) => response.json())
                                                    .then((result) => result._id !== returnedValue.admin ?
                                                        window.location.href = "/accessDenied" : null)
                                            })
                                            .catch((error) => console.log(error));
                                        if (group) {
                                            return (<CreateGroup isEdit={true} group={group} />)
                                        }
                                        return null;
                                    } : <Redirect to="/accessDenied" isLoggedIn={isLoggedIn} /> }
                                </Route>
                                <Route path="/search">
                                    <Search />
                                </Route>
                                <Route exact path="/signIn">
                                    <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                                </Route>
                                <Route exact path="/accessDenied">
                                    <AccessDenied isLoggedIn={isLoggedIn} />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                }
            </ThemeProvider>
        </StylesProvider>
    );
}

export default App;
