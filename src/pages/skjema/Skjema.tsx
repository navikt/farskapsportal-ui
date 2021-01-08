import { Redirect } from 'react-router-dom';

import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import FarSkjema from './far/FarSkjema';
import MorSkjema from './mor/MorSkjema';

function Skjema() {
    return (
        <WithUserInfo>
            {(userInfo) => {
                if (userInfo.forelderrolle === Foreldrerolle.Far) {
                    return <FarSkjema />;
                } else if (userInfo.forelderrolle === Foreldrerolle.Mor) {
                    if (!userInfo.kanOppretteFarskapserklaering) {
                        return <Redirect to={Path.Oversikt} />;
                    }

                    return <MorSkjema barn={userInfo.fnrNyligFoedteBarnUtenRegistrertFar} />;
                }

                // TODO: handle foreldrerolle not Far or Mor
                return null;
            }}
        </WithUserInfo>
    );
}

export default Skjema;
