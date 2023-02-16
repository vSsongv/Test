import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import DropDownList from '../atoms/DropDownList';
import { border } from '../../styles/styleUtil';

interface ChoiceBoxProps {
  borders: string[];
}

const ChoiceBox = styled.div<ChoiceBoxProps>`
  ${(props) => {
    const BORDER = props.borders.map((item) => {
      return border(parseInt(item));
    });
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 23%;
      height: 100%;
      margin-left: 5%;
      margin-right: 0.5rem;
      cursor: pointer;
      ${BORDER}
    `;
  }}
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
  languageRef: MutableRefObject<string>;
  border: string;
}

const DropDown = ({ languageRef, border }: Props) => {
  const [choosing, setChoosing] = useState<boolean>(false);
  const searchInputRef = useRef<any>(null);
  const borders = border.split(' ');

  /* 외부 영역을 클릭했을 때 검색창이 닫히도록 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setChoosing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  const choosingToggle = () => {
    setChoosing(!choosing);
  };

  return (
    <ChoiceBox onClick={choosingToggle} borders={borders} ref={searchInputRef}>
      <ChoiceButton>
        {languageRef.current}
        {choosing ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ChoiceButton>
      {choosing ? <DropDownList width="100%" top="4rem" languageRef={languageRef} /> : null}
    </ChoiceBox>
  );
};

export default DropDown;
