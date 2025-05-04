import React from 'react';
import {
  StyledSmallBottomImage,
  StyledSmallTopImage,
  StyledTallImage,
  StyledContainer,
  StyledCentralContainer,
  StyledMainTitle,
  StyledButton,
  StyledImagesContainer,
  StyledIconButton,
  StyledSubTitle,
  StyledHelperText,
} from './style';
import { RiArrowDownLine } from '@remixicon/react';

export function HeroSection() {
  return (
    <StyledContainer>
      <StyledTallImage />
      <StyledCentralContainer>
        <StyledMainTitle>
          Privatno parkiranje
          <span>bez stresa!</span>
        </StyledMainTitle>
        <StyledSubTitle>Jednostavni, brzo, sigurno</StyledSubTitle>
        <StyledButton>Iznajmi parkirno mjesto</StyledButton>
        <StyledButton>Pronađi parkirno mjesto</StyledButton>
        <StyledHelperText>Dodatan popust za električna vozila</StyledHelperText>
        <StyledIconButton href="#zasto-mi">
          <RiArrowDownLine size={40} />
        </StyledIconButton>
      </StyledCentralContainer>
      <StyledImagesContainer>
        <StyledSmallTopImage />
        <StyledSmallBottomImage />
      </StyledImagesContainer>
    </StyledContainer>
  );
}
