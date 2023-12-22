import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    breakdownOrSchedule: yup.string().required(),
    selectedType: yup.string().required(),
    title: yup.string().required().max(255),
    description: yup.string().required().max(1000),
    selectedUrgency: yup.string().when('breakdownOrSchedule', {
        is: 'Breakdown',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    compNow: yup.string().when('breakdownOrSchedule', {
        is: 'Breakdown',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    startNow: yup.string().when('breakdownOrSchedule', {
        is: 'Scheduled',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    scheduleStart: yup.string().when(['breakdownOrSchedule', 'startNow'], {
        is: (breakdownOrSchedule: string, startNow: string) => breakdownOrSchedule == 'Scheduled' && startNow == 'No',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
    intervalFrequency: yup.number().when('breakdownOrSchedule', {
        is: 'Scheduled',
        then: () => yup.number().required(),
        otherwise: () => yup.number(),
    }),
    intervalTimeUnit: yup.string().when('breakdownOrSchedule', {
        is: 'Scheduled',
        then: () => yup.string().required(),
        otherwise: () => yup.string(),
    }),
});

export const yupResolverCreateJob = yupResolver(formValidation);
