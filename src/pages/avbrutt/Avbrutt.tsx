import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { setSigneringStatusToken } from 'api/api';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { useQuery } from 'utils/hooks/useQuery';
import { AlertError } from '../../types/error';

function Avbrutt() {
    const history = useHistory();
    const [{ language }, dispatch] = useStore();
    const statusQueryToken = useQuery().get('status_query_token');
    const { erklaeringId } = useParams<{ erklaeringId: string }>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (statusQueryToken) {
            setSigneringStatusToken(statusQueryToken, erklaeringId).catch((error: AlertError) => {
                if (error.code === 410) {
                    history.replace(`/${language}${Path.AvbruttOversikt}`);
                } else {
                    setIsError(true);
                }
            });
        } else {
            setIsError(true);
        }
    }, [erklaeringId, statusQueryToken, history, language, dispatch]);

    // TODO: show error instead of redirecting?
    return isError ? (
        <Redirect to={Path.Feilet.replace(':erklaeringId', erklaeringId)} />
    ) : (
        <Spinner />
    );
}

export default Avbrutt;
