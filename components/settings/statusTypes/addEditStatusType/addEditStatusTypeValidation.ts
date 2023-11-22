import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    value: yup.string().required().max(255),
    canComplete: yup.number().required(),
    listPriority: yup.number().required(),
    initialStatus: yup.boolean().required(),
});

export const yupResolverAddEditStatusType = yupResolver(formValidation)