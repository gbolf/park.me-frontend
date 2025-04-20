import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IconButton, Box, BoxProps, Button } from '@mui/material';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import { StyledGalleryContainer } from './style';
import { Lightbox, LightboxRef } from '@components/Lightbox';

export function Gallery({ images, ref, onChange, ...props }: Omit<BoxProps, 'onChange'> & { images: string[]; onChange?: (pos: number) => void }) {
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightBoxRef = useRef<LightboxRef>(null);

  const scrollToImage = (index: number) => {
    galleryRef.current.scrollTo({ left: galleryRef.current.offsetWidth * index, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const nextImage = () => scrollToImage(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  const previousImage = () => scrollToImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);

  useImperativeHandle(ref, () => ({ scrollToImage, active: currentIndex }), [currentIndex]);

  const slides = images?.map((src) => ({ src })) || [];

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(currentIndex);
    }
  }, [currentIndex]);

  return (
    <>
      <Lightbox ref={lightBoxRef} slides={slides} />
      <StyledGalleryContainer {...props}>
        <IconButton className="left" onClick={previousImage}>
          <RiArrowLeftLine />
        </IconButton>
        <Box className="gallery" ref={galleryRef}>
          {images.map((src, idx) => (
            <Button onClick={() => lightBoxRef.current.open(idx)} className="gallery-item" key={idx}>
              <img src={src} />
            </Button>
          ))}
        </Box>
        <IconButton className="right" onClick={nextImage}>
          <RiArrowRightLine />
        </IconButton>
      </StyledGalleryContainer>
    </>
  );
}
