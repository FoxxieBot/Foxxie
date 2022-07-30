import { useState, useEffect } from 'react';

export function useDoubleClick(onClick: () => void, onDoubleClick: () => void, delay = 250) {
    const [click, setClick] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            // simple click
            if (click === 1) onClick();
            setClick(0);
        }, delay);

        // the duration between this click and the previous one
        // is less than the value of delay = double-click
        if (click === 2) onDoubleClick();

        return () => {
            clearTimeout(timer);
        };
    }, [click, onDoubleClick, onClick, delay]);

    return () => {
        setClick(prev => prev + 1);
    };
}
