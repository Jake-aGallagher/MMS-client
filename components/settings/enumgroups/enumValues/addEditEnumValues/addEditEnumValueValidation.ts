import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(255),
    order: yup.number().required(),
});

export const yupResolverEnumValues = yupResolver(formValidation)