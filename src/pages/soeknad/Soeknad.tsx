import { Redirect } from 'react-router-dom';

import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import FarSoeknad from './far/FarSoeknad';
import MorSoeknad from './mor/MorSoeknad';

function Soeknad() {
    return (
        <WithUserInfo>
            {(userInfo) => {
                // TODO: gjelder dette kun når det er Mor?
                if (!userInfo.kanOppretteFarskapserklaering) {
                    return <Redirect to={Path.Oversikt} />;
                }

                if (userInfo.forelderrolle === Foreldrerolle.Far) {
                    return <FarSoeknad />;
                } else if (userInfo.forelderrolle === Foreldrerolle.Mor) {
                    return <MorSoeknad barn={userInfo.fnrNyligFoedteBarnUtenRegistrertFar} />;
                }

                // TODO: handle foreldrerolle not Far or Mor
                return null;
            }}
        </WithUserInfo>
    );
}

export default Soeknad;