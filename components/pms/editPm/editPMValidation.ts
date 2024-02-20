import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    status: yup.string().required(),
    notes: yup.string().max(1000),
    continueSchedule: yup.string(),
});

export const yupResolverEditPM = yupResolver(formValidation);
