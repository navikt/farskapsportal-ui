import WithForeldrerolle from 'store/providers/WithForeldrerolle';
import { Foreldrerolle } from 'types/foreldrerolle';

function FarPage() {
    return <WithForeldrerolle foreldrerolle={Foreldrerolle.Far}>Far sin side</WithForeldrerolle>;
}

export default FarPage;
