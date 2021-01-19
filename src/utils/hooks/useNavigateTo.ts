import { useHistory } from 'react-router-dom';

import { useStore } from 'store/Context';
import { Path } from 'types/path';

export const useNavigateTo = () => {
    const [{ language }] = useStore();
    const history = useHistory();

    return (path: Path) => {
        history.push(`/${language}${path}`);
    };
};
