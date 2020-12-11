import WithKjoenn from 'store/providers/WithKjoenn';
import { Foreldrerolle } from 'types/foreldrerolle';

function FarPage() {
    return <WithKjoenn foreldrerolle={Foreldrerolle.Far}>Far sin side</WithKjoenn>;
}

export default FarPage;
