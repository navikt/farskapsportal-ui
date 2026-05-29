import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { setSigneringStatusToken } from 'api/api';
import { fetchUser } from 'api/fetchUser';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { ERKLAERING_ID } from 'utils/constants';
import { useQuery } from 'utils/hooks/useQuery';

function Suksess() {
    const navigate = useNavigate();
    const [{ language }, dispatch] = useStore();
    const statusQueryToken = useQuery().get('status_query_token');
    const { erklaeringId } = useParams<{ erklaeringId?: string }>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (statusQueryToken) {
            setSigneringStatusToken(statusQueryToken, erklaeringId)
                .then((res) => {
                    // TODO: er denne nødvendig? Ved redirect til kvittering vil brukerinfo hentes?
                    fetchUser(dispatch);
                    navigate(
                        `/${language}${Path.Kvittering}?${ERKLAERING_ID}=${res.idFarskapserklaering}`,
                        { replace: true }
                    );
                })
                .catch(() => {
                    setIsError(true);
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

export default Suksess;
