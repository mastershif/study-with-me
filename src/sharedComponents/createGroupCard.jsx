import {useState} from "react";
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import FailedOnLoginDialog from "./failedOnLoginDialog";

const CardContainer = styled.a`
  margin: 1rem;
  background-color: white;
  height: 380px;
  flex-basis: 40%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  :hover, :focus, :active {
    color: #0070f3;
    border-color: #0070f3;
  }
  @media (max-width: 835px) {
    min-width: 80%;
  }
`;

const CherryHighlight = styled.span`
  color: #ff0053;
`;

const Description = styled.p`
  margin: 0;
  font-size: 2.25rem;
  line-height: 1.5;
`;

const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const CardIcon = styled.h2`
  font-size: 2.5rem;
`;

const CreateGroupCard = ({isLoggedIn}) => {

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <CardContainer style={{cursor: "pointer"}}
                           onClick={() => {
                               isLoggedIn ?
                                   window.location.href="/createGroup" : setOpenDialog(true)
                           }}>
                <CardIcon>
                    <CherryHighlight>
                        <CreateIcon fontSize={'large'}/>
                    </CherryHighlight>
                </CardIcon>
                <CardTitle>להתחיל קבוצת לימוד &larr;</CardTitle>
                <Description><CherryHighlight>תחליטו מתי</CherryHighlight> ללמוד ומה יהיה גודל הקבוצה!</Description>
            </CardContainer>
            <FailedOnLoginDialog open={openDialog} setOpen={setOpenDialog}
                                 message={"התחבר/י כדי להצטרף לקבוצה או ליצור אחת חדשה"}
            />
        </>
    )
}

export default CreateGroupCard;
