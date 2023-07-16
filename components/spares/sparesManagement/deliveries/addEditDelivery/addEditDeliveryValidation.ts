import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(45),
    supplier: yup.number().required().min(0),
    courier: yup.string().required().max(45),
    placed: yup.string().required().max(45),
    due: yup.string().required().max(45),
    arrived: yup.boolean().required(),
});

export const yupResolverAddEditDelivery = yupResolver(formValidation);
