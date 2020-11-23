import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import WithKjoenn from 'store/providers/WithKjoenn';
import { StepStatus } from 'types/form';
import { Kjoenn } from 'types/kjoenn';
import { getMessage } from 'utils/intl';
import BarnForm, { BarnFormInput } from './forms/BarnForm';
import BekreftForm from './forms/BekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SoeknadStep from './SoeknadStep';

import './Soeknad.less';

type SoeknadData = BarnFormInput & FarFormInput;

function Soeknad() {
    const intl = useIntl();
    const [stepStatus, setStepStatus] = useState<{ step1: StepStatus; step2: StepStatus }>({
        step1: StepStatus.Active,
        step2: StepStatus.NotStarted,
    });
    const [soeknadData, setSoeknadData] = useState<SoeknadData>({
        termindato: '',
        foedselsnummer: '',
        navn: '',
    });
    const history = useHistory();
    const onCancel = () => history.push('/');
    /* TODO */ const onSubmit = () => alert(JSON.stringify(soeknadData));

    const onSubmitBarnForm = (data: BarnFormInput) => {
        setSoeknadData((prevState) => ({ ...prevState, termindato: data.termindato }));
        setStepStatus((prevState) => ({
            ...prevState,
            step1: StepStatus.Done,
            step2: prevState.step2 === StepStatus.Done ? StepStatus.Done : StepStatus.Active,
        }));
    };
    const onEndreBarnForm = () => {
        setStepStatus((prevState) => ({ ...prevState, step1: StepStatus.Active }));
    };

    const onSubmitFarForm = (data: FarFormInput) => {
        setSoeknadData((prevState) => ({
            ...prevState,
            foedselsnummer: data.foedselsnummer,
            navn: data.navn,
        }));
        setStepStatus((prevState) => ({ ...prevState, step2: StepStatus.Done }));
    };
    const onEndreFarForm = () => {
        setStepStatus((prevState) => ({ ...prevState, step2: StepStatus.Active }));
    };

    return (
        <WithKjoenn kjoenn={Kjoenn.Kvinne}>
            <div className="Soeknad">
                <Innholdstittel tag="h2">
                    <FormattedMessage id="mor.title" />
                </Innholdstittel>
                <SoeknadStep
                    stepNumber={1}
                    formComponent={
                        <BarnForm
                            defaultTermindato={soeknadData.termindato}
                            onSubmit={onSubmitBarnForm}
                            onCancel={onCancel}
                        />
                    }
                    presentationComponent={<BarnPresentation termindato={soeknadData.termindato} />}
                    status={stepStatus.step1}
                    onChange={onEndreBarnForm}
                />
                <SoeknadStep
                    stepNumber={2}
                    formComponent={
                        <FarForm
                            defaultNavn={soeknadData.navn}
                            defaultFoedselsnummer={soeknadData.foedselsnummer}
                            onSubmit={onSubmitFarForm}
                            onCancel={onCancel}
                        />
                    }
                    presentationComponent={
                        <FarPresentation
                            navn={soeknadData.navn}
                            foedselsnummer={soeknadData.foedselsnummer}
                        />
                    }
                    title={getMessage(intl, 'mor.soeknad.far.title')}
                    status={stepStatus.step2}
                    onChange={onEndreFarForm}
                />
                <SoeknadStep
                    stepNumber={3}
                    formComponent={<BekreftForm onSubmit={onSubmit} onCancel={onCancel} />}
                    title={getMessage(intl, 'mor.soeknad.confirm.title')}
                    status={
                        stepStatus.step1 === StepStatus.Done && stepStatus.step2 === StepStatus.Done
                            ? StepStatus.Active
                            : StepStatus.NotStarted
                    }
                />
            </div>
        </WithKjoenn>
    );
}

export default Soeknad;
