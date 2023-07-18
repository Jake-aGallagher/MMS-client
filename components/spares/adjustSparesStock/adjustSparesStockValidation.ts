import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({ diff: yup.number().required() });

export const yupResolverAdjustSparesStock = yupResolver(formValidation);
