import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const addEditFormValidation = (add: boolean) => {
    return yup.object().shape({
        title: yup.string().required().max(255),
        description: yup.string().required().max(1000),
        startNow: add ? yup.string().required() : yup.string(),
        scheduleStart: add
            ? yup.string().when('startNow', {
                  is: 'No',
                  then: () => yup.string().required(),
                  otherwise: () => yup.string(),
              })
            : yup.string(),
        frequencyTime: yup.number().required(),
        frequencyUnit: yup.string().required(),
    });
};

export const yupResolverAddEditLogTemplate = (add: boolean) => yupResolver(addEditFormValidation(add));
