import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(255),
});

export const yupResolverEnumGroups = yupResolver(formValidation)