import React, { RefObject, useImperativeHandle, useState } from 'react';
import LightboxComponent from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';

type Slide = {
  src: string;
  title?: string;
  description?: string;
};

interface LightboxProps {
  slides: Slide[];
  ref: RefObject<LightboxRef>;
}

export type LightboxRef = { open: (index?: number) => void };

export function Lightbox({ slides, ref }: LightboxProps) {
  const [openSlide, setOpenSlide] = useState(null);
  useImperativeHandle(ref, () => ({
    open: (index: number = 0) => setOpenSlide(index),
  }));

  return (
    <LightboxComponent
      open={openSlide !== null}
      index={openSlide}
      close={() => setOpenSlide(null)}
      slides={slides}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 3, // makes the zoom deeper
        zoomInMultiplier: 2, // how much zoom increases per step
      }}
    />
  );
}
