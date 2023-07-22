import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    user_group_id: yup.number().required(),
    username: yup.string().required().max(45),
    first: yup.string().required().max(45),
    last: yup.string().required().max(45),
    password: yup.string().required().min(8).max(45),
    retyped: yup
        .string()
        .required()
        .oneOf([yup.ref('password')]),
});

export const yupResolverUsers = yupResolver(formValidation);
