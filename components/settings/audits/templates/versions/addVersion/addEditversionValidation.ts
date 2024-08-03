import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    title: yup.string().required().max(255),
});

export const yupResolverAddEditVersion = yupResolver(formValidation)