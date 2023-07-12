import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    propertyName: yup.string().required().max(45),
    type: yup.string().required(),
    address: yup.string().required().max(45),
    city: yup.string().required().max(45),
    county: yup.string().required().max(45),
    postcode: yup.string().required().max(45),
});

export const yupResolverAddEditProperty = yupResolver(formValidation)