import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(45),
    type: yup.number().required(),
    order: yup.number().required(),
    effectOne: yup.number(),
    effectTwo: yup.string(),
});

export const yupResolverEnums = yupResolver(formValidation)