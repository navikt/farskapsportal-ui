import { Innholdstittel } from 'nav-frontend-typografi';

import WithUserInfo from 'store/providers/WithUserInfo';

function Kvittering() {
    return (
        <WithUserInfo>
            {(userInfo) => {
                return (
                    <div>
                        <Innholdstittel>Kvittering</Innholdstittel>
                        <div>{JSON.stringify(userInfo)}</div>
                    </div>
                );
            }}
        </WithUserInfo>
    );
}

export default Kvittering;
