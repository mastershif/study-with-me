import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CreateGroupCard from "./sharedComponents/createGroupCard";
import JoinGroupCard from "./sharedComponents/joinGroupCard";
import MainTitle from "./sharedComponents/mainTitle";
import styled from "styled-components";
import Description from "./sharedComponents/description";
import Profile from "./pages/profile";
import CreateGroup from "./pages/createGroup";
import Header from "./sharedComponents/header";
import Search from "./pages/search";

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
      <Router>
          <div>
              <Header>
                      <Link to="/profile">Profile</Link>
              </Header>
              <Switch>
                  <Route exact path="/">
                      <PageContainer>
                          <MainContent>
                              <MainTitle textLine1={'Join a study group'} textLine2={' or start a new one today'} />
                              <Description text={'Fellow learners will make sure you study!'} />
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
              </Switch>
          </div>
      </Router>
  );
}

export default App;
