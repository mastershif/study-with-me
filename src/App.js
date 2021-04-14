import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import CreateGroupCard from "./sharedComponents/createGroupCard";
import JoinGroupCard from "./sharedComponents/joinGroupCard";
import MainTitle from "./sharedComponents/mainTitle";
import styled from "styled-components";
import Description from "./sharedComponents/description";
import Profile from "./pages/profile";
import CreateGroup from "./pages/createGroup";
import Header from "./sharedComponents/header";
import Search from "./pages/search";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";
import {ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

import SignIn from "./pages/signIn"
import SecondaryTitle from "./sharedComponents/secondaryTitle";
import SignUp from "./pages/signUp";

//In order that the material-ui components will work perfect in hebrew.
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const PageContainer = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainContent = styled.div`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 980px;
  min-height: 250px;
  margin-top: 1.15rem;
`;

function App() {
  return (
      <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Router>
                  <div>
                      <Header>
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
                                          <CreateGroupCard />
                                      </CardsGrid>
                                  </MainContent>
                              </PageContainer>
                          </Route>
                          <Route path="/profile">
                              <Profile />
                          </Route>
                          <Route path="/createGroup">
                              <CreateGroup />
                          </Route>
                          <Route path="/search">
                              <Search />
                          </Route>

                        <Route exact path="/signIn">
                            <SignIn />
                        </Route>

                        <Route exact path="/signUp">
                            <SignUp />
                        </Route>
                      </Switch>
                  </div>
              </Router>
          </ThemeProvider>
      </StylesProvider>
  );
}

export default App;
