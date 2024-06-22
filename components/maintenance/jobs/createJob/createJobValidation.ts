import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    selectedType: yup.string().required(),
    title: yup.string().required().max(255),
    description: yup.string().required().max(1000),
    compNow: yup.string().required(),
});

export const yupResolverCreateJob = yupResolver(formValidation);
