import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { setSigneringStatusToken } from 'api/api';
import { fetchUser } from 'api/fetchUser';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { ERKLAERING_ID } from 'utils/constants';
import { useQuery } from 'utils/hooks/useQuery';

function Suksess() {
    const history = useHistory();
    const [{ language }, dispatch] = useStore();
    const statusQueryToken = useQuery().get('status_query_token');
    const { erklaeringId } = useParams<{ erklaeringId: string }>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (statusQueryToken) {
            setSigneringStatusToken(statusQueryToken, erklaeringId)
                .then((res) => {
                    // TODO: er denne nødvendig? Ved redirect til kvittering vil brukerinfo hentes?
                    fetchUser(dispatch);
                    history.replace(
                        `/${language}${Path.Kvittering}?${ERKLAERING_ID}=${res.idFarskapserklaering}`
                    );
                })
                .catch(() => {
                    setIsError(true);
                });
        } else {
            setIsError(true);
        }
    }, [statusQueryToken, history, language, dispatch]);

    // TODO: show error instead of redirecting?
    return isError ? <Redirect to={Path.Feilet} /> : <Spinner />;
}

export default Suksess;
