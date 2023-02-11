import React from "react";
import styled, { css } from "styled-components";
import { Languages } from "../../utils/Languages";
import { shadow } from "../../../styles/styleUtil";

interface DropDownProps {
  width: string;
  top: string;
}
const Ul = styled.ul<DropDownProps>`
  ${(props) => {
    const WIDTH = props.width;
    const TOP = props.top;
    return css`
      list-style: none;
      position: absolute;
      width: ${WIDTH};
      margin-top: ${TOP};
      text-align: center;
    `;
  }}
`;
const Li = styled.li`
  position: relative;
  background-color: white;
  padding: 0.5rem 0;
  &:hover {
    background-color: #e2e2e2;
  }
  ${shadow(1)}
`;

interface Props {
  width: string;
  top: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

function DropDownList({ setLanguage, ...dropDownProps }: Props) {
  const changeLanguage = (language: string) => {
    setLanguage(language);
  };

  const LanguageList: JSX.Element[] = Languages.map((language) => {
    return (
      <Li key={language} onClick={() => changeLanguage(language)}>
        {language}
      </Li>
    );
  });

  return <Ul {...dropDownProps}>{LanguageList}</Ul>;
}

export default DropDownList;
