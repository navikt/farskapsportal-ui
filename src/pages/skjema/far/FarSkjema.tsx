import Panel from 'nav-frontend-paneler';

import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import FarBekreftForm from './FarBekreftForm';

import './FarSkjema.less';

interface FarSkjemaProps {
    userInfo: UserInfo;
}

function FarSkjema({ userInfo }: FarSkjemaProps) {
    const navigateTo = useNavigateTo();
    const id = useQuery().get('id');

    if (!id) {
        // TODO: handle missing id
        return null;
    }

    const farskapserklaering = userInfo.avventerSigneringBruker?.find(
        (erklaering) => erklaering.idFarskapserklaering === parseInt(id)
    );

    if (!farskapserklaering) {
        // TODO: handle missing farskapserklaering
        return null;
    }

    const onSubmit = () => {
        // redirect to e-sign
        alert('Redirect');
    };

    const onCancel = () => {
        navigateTo(Path.Oversikt);
    };

    return (
        <Panel className="FarSkjema">
            <FarskapserklaeringPresentation farskapserklaering={farskapserklaering} />
            <FarBekreftForm onSubmit={onSubmit} onCancel={onCancel} />
        </Panel>
    );
}

export default FarSkjema;
