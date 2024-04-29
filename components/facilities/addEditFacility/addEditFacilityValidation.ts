import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    facilityName: yup.string().required().max(45),
    address: yup.string().required().max(45),
    city: yup.string().required().max(45),
    county: yup.string().required().max(45),
    postcode: yup.string().required().max(45),
});

export const yupResolverAddEditFacility = yupResolver(formValidation)