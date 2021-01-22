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
    const query = useQuery();
    const id = query.get('id');

    if (!id) {
        // TODO: handle missing id
        return null;
    }

    // TODO: use ID when available from API
    const farskapserklaering = userInfo.farsVentendeFarskapserklaeringer?.[parseInt(id)];

    if (!farskapserklaering) {
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
        <div className="FarSkjema">
            <FarskapserklaeringPresentation farskapserklaering={farskapserklaering} />
            <FarBekreftForm onSubmit={onSubmit} onCancel={onCancel} />
        </div>
    );
}

export default FarSkjema;
