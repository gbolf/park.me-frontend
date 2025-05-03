import * as Yup from 'yup';

export const INITIAL_VALUES: Omit<Parking, 'id' | 'coordinates' | 'images'> & { address: MapboxAddress; step: number; images: { file: File; URL: string }[] } =
  {
    step: 0,
    title: '',
    images: [],
    tags: [],
    price: null,
    description: '',
    address: {
      fullAddress: '',
      street: '',
      houseNumber: '',
      place: '',
      postCode: '',
      country: '',
      coordinates: [0, 0],
    },
  };

export const getFieldsForStep = (step: number): string[] => {
  switch (step) {
    case 0:
      return ['title', 'images', 'tags', 'price', 'description'];
  }
};

const ParkingCategorySchema = Yup.object({
  id: Yup.number().required(),
  label: Yup.string().required(),
  description: Yup.string().required(),
  icon: Yup.string().required(),
  color: Yup.string().required(),
});

export const validationSchema = Yup.object({
  title: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Naslov je obavezan').min(10, 'Naslov mora imati najmanje 10 znakova'),
    otherwise: (schema) => schema.strip(),
  }),
  description: Yup.string().when('step', {
    is: 0,
    then: (schema) => schema.required('Opis je obavezan').min(15, 'Opis mora imati najmanje 15 znakova'),
    otherwise: (schema) => schema.strip(),
  }),
  images: Yup.array().when('step', {
    is: 0,
    then: (schema) => schema.min(1, 'Minimalno je potrebna 1 slika'),
    otherwise: (schema) => schema.strip(),
  }),
  tags: Yup.array().when('step', {
    is: 0,
    then: (schema) => schema.of(ParkingCategorySchema).min(3, 'Odaberite minimalno 3 kategorije'),
    otherwise: (schema) => schema.strip(),
  }),
  price: Yup.number().when('step', {
    is: 0,
    then: (schema) => schema.required('Cijena je obvezna').min(0, 'Cijena mora biti veća od 0'),
    otherwise: (schema) => schema.strip(),
  }),
  address: Yup.object().when('step', {
    is: 1,
    then: () =>
      Yup.object({
        street: Yup.string().required('Ulica je obavezna'),
        houseNumber: Yup.string().required('Broj kuće je obavezan'),
        place: Yup.string().required('Mesto je obavezno'),
        postCode: Yup.string().required('Poštanski broj je obavezan'),
      }),
    otherwise: () => Yup.object().strip(),
  }),
});
