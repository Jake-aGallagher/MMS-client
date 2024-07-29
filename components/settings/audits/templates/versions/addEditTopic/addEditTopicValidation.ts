import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    title: yup.string().required().max(255),
    sortOrder: yup.number().required().min(0),
});

export const yupResolverAddEditTopic = yupResolver(formValidation)