import { useEffect, useState } from 'react';

const Timer = () => {
    const [time, setTime] = useState({ minutes: 60, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                let minutes = prevTime.minutes;
                let seconds = prevTime.seconds - 1;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    clearInterval(timer);
                    return { minutes: 0, seconds: 0 };
                }
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
