import React from 'react';
import styled from 'styled-components';

import { RequestStatus } from '@@components/BodyContainer';
import Spinner from '@@components/Spinner';

const defaultText =
`The little town of Verrières can pass for one of the prettiest in Franche-Comté. Its white houses with their pointed red-tiled roofs stretch along the slope of a hill, whose slightest undulations are marked by groups of vigorous chestnuts. The Doubs flows to within some hundred feet above its fortifications, which were built long ago by the Spaniards, and are now in ruins.
Verrières is sheltered on the north by a high mountain which is one of the branches of the Jura. The jagged peaks of the Verra are covered with snow from the beginning of the October frosts. A torrent which rushes down from the mountains traverses Verrières before throwing itself into the Doubs, and supplies the motive power for a great number of saw mills. The industry is very simple, and secures a certain prosperity to the majority of the inhabitants who are more peasant than bourgeois. It is not, however, the wood saws which have enriched this little town. It is the manufacture of painted tiles, called Mulhouse tiles, that is responsible for that general affluence which has caused the façades of nearly all the houses in Verrières to be rebuilt since the fall of Napoleon.`;

const StyledInputPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTextarea = styled.div`
  border-radius: 3px;
  height: 100%;
  overflow: hidden;
  position: relative;

  textarea {
    background-color: #f4f4f4;
    border: none;
    color: #161616;
    font-size: 13px;
    height: 100%;
    line-height: 1.2;
    padding: 6px 7px;
    resize: none;
    width: 100%;
  }
`;

const Textarea = ({
  requestStatus,
}) => {
  return (
    <StyledTextarea>
      <Spinner show={requestStatus === RequestStatus.IN_PROGRESS}/>
      <textarea
        defaultValue={defaultText}
      />
    </StyledTextarea>
  );
};

const ButtonArea = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  height: 35px;
  justify-content: center;

  span {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
    font-weight: bold;
  }
  }
`;

const InputPage: React.FC = ({
  handleClickConvert,
  requestStatus,
  show,
}) => {
  return !!show && (
    <StyledInputPage>
      <Textarea requestStatus={requestStatus}/>
      <ButtonArea>
        <span onClick={handleClickConvert}>
          Play
        </span>
      </ButtonArea>
    </StyledInputPage>
  );
};

export default InputPage;
