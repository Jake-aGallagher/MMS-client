import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(45),
});

export const yupResolverUserGroups = yupResolver(formValidation)