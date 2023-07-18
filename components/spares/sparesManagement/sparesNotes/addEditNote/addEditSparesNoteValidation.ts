import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    title: yup.string().required().max(45),
    note: yup.string().required().max(1000),
});

export const yupResolverAddEditSparesNote = yupResolver(formValidation);
