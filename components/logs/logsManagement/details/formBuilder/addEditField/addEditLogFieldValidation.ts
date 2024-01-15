import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    type: yup.string().required(),
    name: yup.string().required().max(255),
    required: yup.string().when('type', {
        is: 'Info/Guidance/Notes',
        then: () => yup.string(),
        otherwise: () => yup.string().required(),
    }),
    guidance: yup.string().max(1000),
    order: yup.number().required(),
});

export const yupResolverAddEditLogField = yupResolver(formValidation);
