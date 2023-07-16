import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    partNo: yup.string().required().max(45),
    manPartNo: yup.string().max(45),
    name: yup.string().required().max(45),
    manName: yup.string().max(45),
    description: yup.string().max(1000),
    notes: yup.string().max(1000),
    location: yup.string().max(45),
    quantRemaining: yup.number().min(0),
    supplier: yup.string().max(45),
    cost: yup.number().min(0),
});

export const yupResolverAddEditSparesItem = yupResolver(formValidation);
