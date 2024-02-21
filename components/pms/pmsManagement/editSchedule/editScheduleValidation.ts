import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    type: yup.string().required(),
    title: yup.string().required().max(255),
    description: yup.string().required().max(1000),
    editStart: yup.string().required(),
    scheduleStart: yup.string().when('editStart', {
        is: 'Yes',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    frequencyTime: yup.number().required(),
    frequencyUnit: yup.string().required(),
});

export const yupResolverEditSchedule = yupResolver(formValidation);
