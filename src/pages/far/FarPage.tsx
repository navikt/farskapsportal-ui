import WithKjoenn from 'store/providers/WithKjoenn';
import { Kjoenn } from 'types/kjoenn';

function FarPage() {
    return <WithKjoenn kjoenn={Kjoenn.Mann}>Far sin side</WithKjoenn>;
}

export default FarPage;
