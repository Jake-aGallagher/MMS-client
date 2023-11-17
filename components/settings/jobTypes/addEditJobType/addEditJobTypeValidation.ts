import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    value: yup.string().required().max(45),
    listPriority: yup.number().required(),
});

export const yupResolverAddEditJobType = yupResolver(formValidation)