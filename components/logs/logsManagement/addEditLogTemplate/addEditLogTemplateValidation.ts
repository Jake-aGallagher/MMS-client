import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    title: yup.string().required().max(255),
    description: yup.string().required().max(1000),
    startNow: yup.string().required(),
    scheduleStart: yup.string().when('startNow', {
        is: 'No',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    frequencyTime: yup.number().required(),
    frequencyUnit: yup.string().required(),
});

export const yupResolverAddEditLogTemplate = yupResolver(formValidation);
