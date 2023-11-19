import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    value: yup.string().required().max(45),
    canComplete: yup.number().required(),
    listPriority: yup.number().required(),
});

export const yupResolverAddEditStatusType = yupResolver(formValidation)