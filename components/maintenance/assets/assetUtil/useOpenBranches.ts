import { useState } from 'react';

export const useOpenBranches = () => {
    const [openBranches, setOpenBranches] = useState<number[]>([]);

    const toggle = (id: number) => {
        if (openBranches.includes(id)) {
            const newArray = openBranches.filter((item: number) => item != id);
            setOpenBranches(newArray);
        } else {
            setOpenBranches((prev) => [...prev, id]);
        }
    };
    return { openBranches, toggle };
};
