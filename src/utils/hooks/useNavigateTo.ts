import { useNavigate } from 'react-router-dom';

import { useStore } from 'store/Context';
import { Path } from 'types/path';

export const useNavigateTo = () => {
    const [{ language }] = useStore();
    const navigate = useNavigate();

    return (path: Path) => {
        navigate(`/${language}${path}`);
    };
};
