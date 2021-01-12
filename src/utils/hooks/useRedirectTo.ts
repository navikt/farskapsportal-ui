import { useHistory } from 'react-router-dom';

import { useStore } from 'store/Context';

export const useRedirectTo = () => {
    const [{ language }] = useStore();
    const history = useHistory();

    return (path: string) => {
        history.push(`/${language}${path}`);
    };
};
