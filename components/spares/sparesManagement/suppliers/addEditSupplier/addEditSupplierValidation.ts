import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(255),
    website: yup.string().url(),
    phone: yup.string().max(25),
    primContact: yup.string().max(255),
    primContactPhone: yup.string().max(25),
    address: yup.string().max(255),
    city: yup.string().max(255),
    county: yup.string().max(255),
    postcode: yup.string().max(255),
    supplies: yup.string().max(255),
});

export const yupResolverAddEditSupplier = yupResolver(formValidation);
