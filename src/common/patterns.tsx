import { InputBaseProps } from '@mui/material';
import React from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface PatternProps extends PatternFormatProps {
  ref: React.RefObject<any>;
  onChange: (event: { target: { name: string; value: string | number } }) => void;
}

const generatePattern = ({ ref, onChange, ...props }: PatternProps, format: string) => {
  return (
    <PatternFormat
      {...props}
      getInputRef={ref}
      format={format}
      onValueChange={(values) => {
        const value = isNaN(Number(values.value)) ? values.value : Number(values.value);
        onChange({
          target: {
            name: props.name ?? '',
            value,
          },
        });
      }}
    />
  );
};

export const CardNumberPattern = (props: PatternProps & InputBaseProps) => generatePattern(props, '#### #### #### ####');
export const MonthYearPattern = (props: PatternProps & InputBaseProps) => generatePattern(props, '##/##');
export const CCVPattern = (props: PatternProps & InputBaseProps) => generatePattern(props, '####');
