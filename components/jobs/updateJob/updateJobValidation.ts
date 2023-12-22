import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    status: yup.string().required(),
    description: yup.string().max(1000),
    notes: yup.string().max(1000),
    completed: yup.number().required(),
    continueSchedule: yup.string(),
});

export const yupResolverUpdateJob = yupResolver(formValidation);
