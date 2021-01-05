import { FormattedDate } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

import { UserInfo } from 'types/user';

interface MorErklaeringerProps {
    userInfo: UserInfo;
}

function MorErklaeringer({ userInfo }: MorErklaeringerProps) {
    if (!userInfo.morsVentendeFarskapserklaeringer?.length) {
        return null;
    }

    return (
        <>
            {userInfo.morsVentendeFarskapserklaeringer.map((erklaering) => {
                if (!erklaering.barn || !erklaering.dokument) {
                    return null;
                }

                return (
                    <Lenkepanel
                        key={erklaering.dokument.redirectUrlMor}
                        href={erklaering.dokument.redirectUrlMor ?? ''}
                        tittelProps="undertittel"
                        border={true}
                    >
                        {erklaering.barn.termindato ? (
                            <FormattedDate
                                value={erklaering.barn.termindato}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        ) : (
                            erklaering.barn.foedselsnummer
                        )}
                    </Lenkepanel>
                );
            })}
        </>
    );
}

export default MorErklaeringer;
