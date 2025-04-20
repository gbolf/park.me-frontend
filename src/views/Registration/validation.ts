import * as Yup from 'yup';

export const INITIAL_VALUES = {
  step: 0,
  profileImage: { file: null as File, URL: '' },
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  username: '',
  passwordConfirm: '',
  address: {
    fullAddress: '',
    street: '',
    houseNumber: '',
    place: '',
    postCode: '',
    country: '',
    coordinates: [0, 0],
  } as MapboxAddress,
};

export const getFieldsForStep = (step: number): string[] => {
  switch (step) {
    case 0:
      return ['firstName', 'lastName', 'email', 'phone'];
    case 1:
      return ['password', 'passwordConfirm', 'username'];
    case 2:
      return ['address'];
    case 3:
      return ['profileImage.file', 'profileImage.URL'];
    default:
      return [];
  }
};

export const validationSchema = Yup.object({
  firstName: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Ime je obavezno').min(2, 'Ime mora imati najmanje 2 znaka'),
    otherwise: (schema) => schema.strip(), // izbacuje iz validacije
  }),
  lastName: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Prezime je obavezno').min(2, 'Prezime mora imati najmanje 2 znaka'),
    otherwise: (schema) => schema.strip(),
  }),
  email: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Email je obavezan').email('Email adresa nije validna'),
    otherwise: (schema) => schema.strip(),
  }),
  phone: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Telefon je obavezan').matches(/^\+?[0-9\s\-]{7,15}$/, 'Telefon nije validan'),
    otherwise: (schema) => schema.strip(),
  }),

  username: Yup.string().when('step', {
    is: 1,
    then: (schema) => schema.required('Korisničko ime je obavezno').min(2, 'Korisničko ime mora imati najmanje 2 znaka'),
    otherwise: (schema) => schema.strip(), // izbacuje iz validacije
  }),
  password: Yup.string().when('step', {
    is: 1,
    then: (schema) => schema.required('Lozinka je obavezna').min(8, 'Lozinka mora imati najmanje 8 znakova'),
    otherwise: (schema) => schema.strip(),
  }),
  passwordConfirm: Yup.string().when('step', {
    is: 1,
    then: (schema) => schema.required('Potvrda lozinke je obavezna').oneOf([Yup.ref('password')], 'Lozinke se ne poklapaju'),
    otherwise: (schema) => schema.strip(),
  }),

  address: Yup.object().when('step', {
    is: 2,
    then: () =>
      Yup.object({
        street: Yup.string().required('Ulica je obavezna'),
        houseNumber: Yup.string().required('Broj kuće je obavezan'),
        place: Yup.string().required('Mesto je obavezno'),
        postCode: Yup.string().required('Poštanski broj je obavezan'),
      }),
    otherwise: () => Yup.object().strip(),
  }),

  profileImage: Yup.object().when('step', {
    is: 3,
    then: () =>
      Yup.object({
        file: Yup.mixed().nullable(),
        URL: Yup.string().url('URL mora biti validan'),
      }),
    otherwise: () => Yup.object().strip(),
  }),
});
