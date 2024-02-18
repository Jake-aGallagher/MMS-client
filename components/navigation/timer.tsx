import { useEffect, useState } from 'react';

interface Props {
    expiryTime: number;
}

const Timer = (props: Props) => {
    const [time, setTime] = useState({ minutes: 60, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(() => {
                const timeLeft = Math.floor((props.expiryTime - new Date().getTime()) / 1000);
                if (timeLeft < 0) {
                    clearInterval(timer);
                    return { minutes: 0, seconds: 0 };
                }
                let minutes = Math.floor(timeLeft / 60);
                let seconds = Math.floor(timeLeft % 60);
                return { minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedMinutes = String(time.minutes).padStart(2, '0');
    const formattedSeconds = String(time.seconds).padStart(2, '0');

    return <div className="h-8 mb-2 flex flex-row justify-center items-center select-none">{`${formattedMinutes}:${formattedSeconds}`}</div>;
};

export default Timer;
