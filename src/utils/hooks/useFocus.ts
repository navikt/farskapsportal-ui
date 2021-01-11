import { RefObject, useEffect, useRef, useState } from 'react';

export const useFocus = (): [RefObject<HTMLDivElement>, () => void] => {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFocused) {
            ref.current?.focus();
        }
        setIsFocused(false);
    }, [isFocused]);

    const setFocus = () => {
        setIsFocused(true);
    };

    return [ref, setFocus];
};
