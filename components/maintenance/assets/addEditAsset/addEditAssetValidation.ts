import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    name: yup.string().required().max(45),
    note: yup.string().max(1000),
});

export const yupResolverAddEditAsset = yupResolver(formValidation);
