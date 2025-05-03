import dayjs from 'dayjs';
import * as Yup from 'yup';

// Opis koraka
// 0 - Unos datuma
// 1 - Plaćanje
// 2 - Obrada Plaćanja
// 3 - Plaćanje je uspjelo
// 4 - Plaćanje nije uspjelo

export const INITIAL_VALUES = {
  step: 0,
  startDate: dayjs().add(1, 'hour'),
  endDate: dayjs().add(2, 'hour'),
  card: {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  },
};

export const getFieldsForStep = (step: number): string[] => {
  switch (step) {
    case 0:
      return ['startDate', 'endDate'];
    case 1:
      return ['card.number', 'card.name', 'card.expiry', 'card.cvv'];
    default:
      return [];
  }
};

export const validationSchema = Yup.object({
  startDate: Yup.date().when('step', {
    is: 0,
    then: (schema) =>
      schema.required('Datum početka je obavezan').test('is-future', 'Datum početka mora biti u budućnosti', (value) => value && dayjs(value).isAfter(dayjs())),
    otherwise: (schema) => schema.strip(),
  }),
  endDate: Yup.date().when('step', {
    is: 0,
    then: (schema) =>
      schema
        .required('Datum završetka je obavezan')
        .test('is-future', 'Datum završetka mora biti u budućnosti', (value) => value && dayjs(value).isAfter(dayjs()))
        .test('min-diff', 'Razlika između početka i završetka mora biti barem 1 sat', function (value) {
          const { startDate } = this.parent;
          if (startDate && value) {
            return dayjs(value).diff(dayjs(startDate), 'hour') >= 1;
          }
          return false;
        }),
    otherwise: (schema) => schema.strip(),
  }),
  card: Yup.object().when('step', {
    is: 1,
    then: () =>
      Yup.object({
        number: Yup.string()
          .required('Broj kartice je obavezan')
          .matches(/^\d{16}$/, 'Broj kartice mora imati format 4111 1111 1111 1111'),
        name: Yup.string().required('Ime i prezime vlasnika je obavezno').min(2, 'Ime i prezime mora imati najmanje 2 znaka'),
        expiry: Yup.string()
          .required('Datum isteka kartice je obavezan')
          .matches(/^(0[1-9]|1[0-2])([0-9]{2})$/, 'Datum isteka mora biti u formatu MM/YY'),
        cvv: Yup.string()
          .required('CVV je obavezan')
          .matches(/^[0-9]{3,4}$/, 'CVV mora imati 3 ili 4 cifre'),
      }),
    otherwise: () => Yup.object().strip(),
  }),
});
