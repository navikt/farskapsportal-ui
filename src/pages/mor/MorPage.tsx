import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

import MorForm, { FormInput } from './MorForm';

import './MorPage.less';

function MorPage() {
    const history = useHistory();

    const onSubmit = (data: FormInput) => console.log(data);
    const onCancel = () => history.push('/');

    return (
        <Panel className="MorPage">
            <Innholdstittel tag="h2">
                <FormattedMessage id="mor.title" />
            </Innholdstittel>
            <MorForm onSubmit={onSubmit} onCancel={onCancel} />
        </Panel>
    );
}

export default MorPage;
