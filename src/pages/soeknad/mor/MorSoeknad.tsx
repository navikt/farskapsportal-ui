import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { getMessage } from 'utils/intl';
import BarnForm, { BarnFormInput } from './forms/BarnForm';
import BekreftForm from './forms/BekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SoeknadStep from './SoeknadStep';

import './MorSoeknad.less';

type MorSoeknadData = BarnFormInput & FarFormInput;

function MorSoeknad() {
    const intl = useIntl();
    const history = useHistory();
    const [stepStatus, setStepStatus] = useState<{ step1: StepStatus; step2: StepStatus }>({
        step1: StepStatus.Active,
        step2: StepStatus.NotStarted,
    });
    const [soeknadData, setSoeknadData] = useState<MorSoeknadData>({
        termindato: '',
        foedselsnummer: '',
        navn: '',
    });
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const [apiError, setApiError] = useState<AlertError>();

    const onCancel = () => history.push('/');

    const onSubmit = () => {
        setIsSubmitPending(true);

        opprettFarskapserklaering({
            barn: {
                termindato: soeknadData.termindato,
                foedselsnummer: null,
            },
            opplysningerOmFar: {
                foedselsnummer: soeknadData.foedselsnummer,
                navn: soeknadData.navn,
            },
        })
            .then((response) => {
                alert(JSON.stringify(response));
                // Hent redirect til e-signering fra response og utfør redirect
            })
            .catch((error: AlertError) => {
                setApiError(error);
            })
            .finally(() => {
                setIsSubmitPending(false);
            });
    };

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
        <div className="MorSoeknad">
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
                isDisabled={isSubmitPending}
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
                isDisabled={isSubmitPending}
            />
            <SoeknadStep
                stepNumber={3}
                formComponent={
                    <BekreftForm
                        isPending={isSubmitPending}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                }
                title={getMessage(intl, 'mor.soeknad.confirm.title')}
                status={
                    stepStatus.step1 === StepStatus.Done && stepStatus.step2 === StepStatus.Done
                        ? StepStatus.Active
                        : StepStatus.NotStarted
                }
            />
            {apiError && <Error error={apiError} />}
        </div>
    );
}

export default MorSoeknad;
