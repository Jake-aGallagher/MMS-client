import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    questionType: yup.string().required().max(255),
    title: yup.string().required().max(255),
    sortOrder: yup.number().required().min(0),
});

export const yupResolverAddEditQuestion = yupResolver(formValidation)