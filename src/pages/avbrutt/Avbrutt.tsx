import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { setSigneringStatusToken } from 'api/api';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { useQuery } from 'utils/hooks/useQuery';
import { AlertError } from '../../types/error';

function Avbrutt() {
    const navigate = useNavigate();
    const [{ language }, dispatch] = useStore();
    const statusQueryToken = useQuery().get('status_query_token');
    const { erklaeringId } = useParams<{ erklaeringId?: string }>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (statusQueryToken) {
            setSigneringStatusToken(statusQueryToken, erklaeringId).catch((error: AlertError) => {
                if (error.code === 410) {
                    navigate(`/${language}${Path.AvbruttOversikt}`, { replace: true });
                } else {
                    setIsError(true);
                }
            });
        } else {
            setIsError(true);
        }
    }, [erklaeringId, statusQueryToken, navigate, language, dispatch]);

    // TODO: show error instead of redirecting?
    return isError ? (
        <Navigate to={Path.Feilet.replace(':erklaeringId', erklaeringId ?? '')} replace />
    ) : (
        <Spinner />
    );
}

export default Avbrutt;
