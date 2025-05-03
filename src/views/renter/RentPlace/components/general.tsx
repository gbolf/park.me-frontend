import React, { useRef, useState } from 'react';
import { StyledAddImage, StyledDeleteImage, StyledDropZone, StyledImage, StyledSideContainer } from '../style';
import { Box, FormHelperText, Grid, Typography, Button } from '@mui/material';
import { Gallery } from '../../../client/ParkingDetailsView/components/Galery';
import { FormikProps } from 'formik';
import { INITIAL_VALUES } from '../validations';
import { createGetProps } from '@common/utils';
import { useDropzone } from 'react-dropzone';
import { RiAddCircleLine, RiDeleteBinLine, RiUploadCloud2Line } from '@remixicon/react';
import { GeneralInfo } from './generalInfo';

export function GeneralTab({
  formik,
  getProps,
  ActionButton,
}: {
  ActionButton: React.ReactNode;
  getProps: ReturnType<typeof createGetProps>;
  formik: FormikProps<typeof INITIAL_VALUES>;
}) {
  const galeryRef = useRef<{ scrollToImage: (pos: number) => void; active: number }>(null);
  const [activeImage, setActiveImage] = useState(0);

  const imagesURL = formik.values.images.map((image) => image.URL);

  const onDrop = (files: File[]) => {
    const newImages = files.map((file) => ({ file, URL: URL.createObjectURL(file) }));
    formik.setFieldValue('images', [formik.values.images, newImages].flat());
  };

  const deleteImage = (idx: number) => {
    URL.revokeObjectURL(formik.values.images[idx].URL);
    const updatedImages = formik.values.images.filter((_, i) => i !== idx);
    formik.setFieldValue('images', updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: !!imagesURL.length,
    noKeyboard: !!imagesURL.length,
    accept: { 'image/*': [] },
  });

  const imagesProps = getProps('images');

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Osnovni podatci
      </Typography>
      <Grid container spacing={4} sx={{ height: { md: 'calc(100% - 82px)' } }} mt={2}>
        <Grid size={{ xs: 12, md: 5 }} {...getRootProps()}>
          <input {...getInputProps()} />
          {!imagesURL.length ? (
            <StyledDropZone error={imagesProps.error}>
              <RiUploadCloud2Line size={50} />
              <Typography> {isDragActive ? 'Pusti sliku ovdje...' : 'Klikni ili povuci sliku parkirnog mjesta ovdje'}</Typography>
            </StyledDropZone>
          ) : (
            <Gallery onChange={(idx) => setActiveImage(idx)} images={imagesURL} ref={galeryRef} />
          )}
          {imagesProps.error && <FormHelperText error>{imagesProps.helperText}</FormHelperText>}
          <Box sx={{ display: 'flex', pt: 2, pb: 1, gap: 1, alignItems: 'center', width: '100%', overflow: 'auto' }}>
            {imagesURL.map((src, idx) => (
              <Box position="relative">
                <Button disableRipple onClick={() => galeryRef.current.scrollToImage(idx)}>
                  <StyledImage src={src} active={activeImage === idx} />
                </Button>
                <StyledDeleteImage color="error" onClick={() => deleteImage(idx)}>
                  <RiDeleteBinLine />
                </StyledDeleteImage>
              </Box>
            ))}
            {!!imagesURL.length && (
              <StyledAddImage onClick={open}>
                <RiAddCircleLine />
              </StyledAddImage>
            )}
          </Box>
        </Grid>
        <Grid container size={{ xs: 12, md: 7 }}>
          <GeneralInfo formik={formik} getProps={getProps} />
          <Grid size={12}>{ActionButton}</Grid>
        </Grid>
      </Grid>
    </>
  );
}
