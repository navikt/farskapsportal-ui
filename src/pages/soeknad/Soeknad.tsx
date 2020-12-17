import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import FarSoeknad from './far/FarSoeknad';
import MorSoeknad from './mor/MorSoeknad';

function Soeknad() {
    return (
        <WithUserInfo>
            {({ forelderrolle, fnrNyligFoedteBarnUtenRegistrertFar }) => {
                if (forelderrolle === Foreldrerolle.Far) {
                    return <FarSoeknad />;
                } else if (forelderrolle === Foreldrerolle.Mor) {
                    return <MorSoeknad barn={fnrNyligFoedteBarnUtenRegistrertFar} />;
                }

                // TODO: handle foreldrerolle not Far or Mor
                return null;
            }}
        </WithUserInfo>
    );
}

export default Soeknad;
