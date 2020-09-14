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

    const focus = () => {
        setIsFocused(true);
    };

    return [ref, focus];
};
