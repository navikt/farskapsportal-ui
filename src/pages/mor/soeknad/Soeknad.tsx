import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import { StepStatus } from 'types/form';
import BarnForm, { BarnFormInput } from './forms/BarnForm';
import BekreftForm from './forms/BekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SoeknadStep from './SoeknadStep';

import './Soeknad.less';

type SoeknadData = BarnFormInput & FarFormInput;

function Soeknad() {
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
                title="Far til barn(a)"
                status={stepStatus.step2}
                onChange={onEndreFarForm}
            />
            <SoeknadStep
                stepNumber={3}
                formComponent={<BekreftForm onSubmit={onSubmit} onCancel={onCancel} />}
                title="Bekreft farskap"
                status={
                    stepStatus.step1 === StepStatus.Done && stepStatus.step2 === StepStatus.Done
                        ? StepStatus.Active
                        : StepStatus.NotStarted
                }
            />
        </div>
    );
}

export default Soeknad;
