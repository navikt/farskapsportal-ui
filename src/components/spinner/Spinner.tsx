import { Loader } from '@navikt/ds-react';

import './Spinner.css';

function Spinner() {
    return (
        <div className="Spinner">
            <Loader size="xlarge" />
        </div>
    );
}

export default Spinner;
