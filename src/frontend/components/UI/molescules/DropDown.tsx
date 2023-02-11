import React, { useState } from "react";
import styled from "styled-components";
import { border } from "../../../styles/styleUtil";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import DropDownList from "../atoms/DropDownList";

const ChoiceBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%;
  height: 100%;
  margin-left: 5%;
  margin-right: 0.5rem;
  cursor: pointer;
  ${border(1)}
  ${border(3)}
`;

const ChoiceButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
`;

interface Props {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

function DropDown({ language, setLanguage }: Props) {
  const [choosing, setChoosing] = useState<boolean>(false);

  const choosingToggle = () => {
    setChoosing(!choosing);
  };

  return (
    <ChoiceBox onClick={choosingToggle}>
      <ChoiceButton>
        {language}
        {choosing ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ChoiceButton>
      {choosing ? (
        <DropDownList width="100%" top="4rem" setLanguage={setLanguage} />
      ) : null}
    </ChoiceBox>
  );
}

export default DropDown;
