import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledContainer, StyledGreenContainer, StyledSubContainer, StyledSubTitle, StyledSubTitle2, StyledTitle } from './style';

export function WhyUsSection() {
  return (
    <Box id="zasto-mi">
      <StyledTitle variant="h1">Zašto odabrati Park.me?</StyledTitle>
      <StyledContainer>
        <StyledSubContainer>
          <StyledSubTitle variant="h3">Pametnije parkiranje, više uštede</StyledSubTitle>
          <StyledSubTitle2>
            Recite zbogom frustrirajućoj potrazi za parkingom i visokim cijenama javnih garaža. S Park.me, pronađite dostupna parkirna mjesta brzo i jednostavno, po povoljnijim cijenama. Naša transparentna politika cijena osigurava da uvijek znate koliko plaćate - bez skrivenih naknada.
          </StyledSubTitle2>
        </StyledSubContainer>
        <StyledGreenContainer>
          <Typography variant="h3">Zeleni popusti za zelenu budućnost</Typography>
          <Typography variant="h4">Posebne pogodnosti za električna vozila</Typography>
          <Typography>
            Vozite električno? Park.me vas nagrađuje! Iskoristite <b>ekskluzivne popuste</b> na odabranim parkirnim lokacijama. Ne samo da štedite novac, već i aktivno doprinosite čišćem okolišu smanjenjem emisija CO<sub>2</sub>. Podržite zajednice koje ulažu u zelenu infrastrukturu. Parkirajte pametno, vozite zeleno i <b>uštedite više s Park.me!</b>
          </Typography>
        </StyledGreenContainer>
      </StyledContainer>
    </Box>
  );
}
