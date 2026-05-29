import { useNavigate } from 'react-router';

import { useStore } from 'store/Context';
import { Path } from 'types/path';

export const useNavigateTo = () => {
    const [{ language }] = useStore();
    const navigate = useNavigate();

    return (path: Path) => {
        navigate(`/${language}${path}`);
    };
};
