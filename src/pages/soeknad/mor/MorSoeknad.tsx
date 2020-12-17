import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { OutboundOpprettFarskapserklaering } from 'types/api';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { getMessage } from 'utils/intl';
import BekreftForm from './forms/BekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import SelectBarnForm, { SelectBarnFormInput } from './forms/SelectBarnForm';
import TermindatoForm, { TermindatoFormInput } from './forms/TermindatoForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SoeknadStep from './SoeknadStep';

import './MorSoeknad.less';

type MorSoeknadData = OutboundOpprettFarskapserklaering;

interface MorSoeknadProps {
    barn: string[] | null;
}

function MorSoeknad(props: MorSoeknadProps) {
    const singleChildFoedselsnummer = props.barn?.length === 1 ? props.barn[0] : undefined;

    const intl = useIntl();
    const history = useHistory();
    const [stepStatus, setStepStatus] = useState<{ step1: StepStatus; step2: StepStatus }>({
        step1: singleChildFoedselsnummer ? StepStatus.Done : StepStatus.Active,
        step2: singleChildFoedselsnummer ? StepStatus.Active : StepStatus.NotStarted,
    });
    const [soeknadData, setSoeknadData] = useState<MorSoeknadData>({
        barn: {
            termindato: null,
            foedselsnummer: singleChildFoedselsnummer ?? null,
        },
        opplysningerOmFar: {
            foedselsnummer: '',
            navn: '',
        },
    });
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const [apiError, setApiError] = useState<AlertError>();

    const onCancel = () => history.push(Path.Forside);

    const onSubmit = () => {
        setIsSubmitPending(true);

        opprettFarskapserklaering(soeknadData)
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

    const onSubmitSelectBarnForm = (data: SelectBarnFormInput) => {
        setSoeknadData((prevState) => ({
            ...prevState,
            barn: { foedselsnummer: data.foedselsnummer, termindato: null },
        }));
        setStepStatus((prevState) => ({
            ...prevState,
            step1: StepStatus.Done,
            step2: prevState.step2 === StepStatus.Done ? StepStatus.Done : StepStatus.Active,
        }));
    };
    const onSubmitTermindatoForm = (data: TermindatoFormInput) => {
        setSoeknadData((prevState) => ({
            ...prevState,
            barn: { foedselsnummer: null, termindato: data.termindato },
        }));
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
            opplysningerOmFar: {
                foedselsnummer: data.foedselsnummer,
                navn: data.navn,
            },
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
                    props.barn?.length ? (
                        <SelectBarnForm
                            defaultFoedselsnummer={soeknadData.barn.foedselsnummer}
                            barn={props.barn}
                            onSubmit={onSubmitSelectBarnForm}
                            onCancel={onCancel}
                        />
                    ) : (
                        <TermindatoForm
                            defaultTermindato={soeknadData.barn.termindato}
                            onSubmit={onSubmitTermindatoForm}
                            onCancel={onCancel}
                        />
                    )
                }
                presentationComponent={
                    <BarnPresentation
                        isSingleChild={!!singleChildFoedselsnummer}
                        foedselsnummer={soeknadData.barn.foedselsnummer}
                        termindato={soeknadData.barn.termindato}
                    />
                }
                status={stepStatus.step1}
                onChange={singleChildFoedselsnummer ? undefined : onEndreBarnForm}
                isDisabled={isSubmitPending}
            />
            <SoeknadStep
                stepNumber={2}
                formComponent={
                    <FarForm
                        defaultNavn={soeknadData.opplysningerOmFar.navn}
                        defaultFoedselsnummer={soeknadData.opplysningerOmFar.foedselsnummer}
                        onSubmit={onSubmitFarForm}
                        onCancel={onCancel}
                    />
                }
                presentationComponent={
                    <FarPresentation
                        navn={soeknadData.opplysningerOmFar.navn}
                        foedselsnummer={soeknadData.opplysningerOmFar.foedselsnummer}
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
