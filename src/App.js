import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import CreateGroupCard from "./sharedComponents/createGroupCard";
import JoinGroupCard from "./sharedComponents/joinGroupCard";
import MainTitle from "./sharedComponents/mainTitle";
import styled from "styled-components";
import Description from "./sharedComponents/description";
import Profile from "./pages/profile";
import ProfileSettings from "./pages/profileSettings";
import CreateGroup from "./pages/createGroup";
import Header from "./sharedComponents/header";
import Search from "./pages/search";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";
import {ThemeProvider, StylesProvider, jssPreset,} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import SignIn from "./pages/signIn";
import SecondaryTitle from "./sharedComponents/secondaryTitle";
import {getUserFromLocalStorage} from "./localStorage.service";
import FailedToJoinOnLoginAlert from "./pages/groupDialogComponents/failedToJoinOnLoginAlert";

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
  padding: 5rem 0;
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
    const [isLoggedIn, setIsLoggedIn] = useState(getUserFromLocalStorage() !== null);
    const [user, setUser] = useState();
    const [group, setGroup] = useState();
    const [openLoginBeforeCreateGroup, setOpenLoginBeforeCreateGroup] = useState(false);
    const createGroupPath = isLoggedIn ? "/createGroup" : "/";
    const onClickCreateGroup = () => {
        console.log('isLoggedIn? ', isLoggedIn);
        if (!isLoggedIn) {
            setOpenLoginBeforeCreateGroup(true);
        }
    };

    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router>
                    <div>
                        <Header
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}>
                            <Link to="/profile">Profile</Link>
                        </Header>
                        <Switch>
                            <Route exact path="/">
                                <PageContainer>
                                    <MainContent>
                                        <MainTitle textLine1={'הצטרפו לקבוצת לימוד'} textLine2={' או התחילו קבוצת לימוד חדשה עכשיו'} />
                                        <Description text={'קבוצות משותפות ללמידה למבחנים, חזרה על החומר או סתם כדי לעזור לך להתרכז'} />
                                        <SecondaryTitle text={'הקבוצה תעזור לך ללמוד!'} />
                                        <CardsGrid>
                                            <JoinGroupCard />
                                            <CreateGroupCard path={createGroupPath} onClick={onClickCreateGroup}/>
                                            <FailedToJoinOnLoginAlert
                                                open={openLoginBeforeCreateGroup}
                                                setOpen={setOpenLoginBeforeCreateGroup}
                                                message={"עליך להתחבר כדי ליצור לקבוצה!"}
                                            />
                                        </CardsGrid>
                                    </MainContent>
                                </PageContainer>
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path = "/profileSettings">
                                <ProfileSettings/>
                            </Route>
                            <Route path="/createGroup">
                                <CreateGroup isEdit={false} group={null} />
                            </Route>
                            <Route path="/editGroup/:_id">
                                {(props) => {
                                    const _id = props.match.params._id;
                                    fetch("http://localhost:5000/group/" + _id)
                                        .then((response) => response.json())
                                        .then((result) => group === undefined ? setGroup(result) : null)
                                        .catch((error) => console.log(error));
                                    if (group) {
                                        return (<CreateGroup isEdit={true} group={group} />)
                                    }
                                    return null;
                                }}
                            </Route>
                            <Route path="/search">
                                <Search />
                            </Route>
                            <Route exact path="/signIn">
                                <SignIn isLoggedIn={isLoggedIn}
                                        setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </ThemeProvider>
        </StylesProvider>
    );
}

export default App;
