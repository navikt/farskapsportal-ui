import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

import { useStore } from 'store/Context';
import { Breadcrumb } from 'types/breadcrumbs';
import { getMessage } from 'utils/intl';

export const useDekoratorBreadcrumbs = (breadcrumbs?: Breadcrumb[]) => {
    const intl = useIntl();
    const history = useHistory();
    const [{ language }] = useStore();

    onBreadcrumbClick((breadcrumb) => {
        history.push(breadcrumb.url);
    });

    useEffect(() => {
        const appBreadcrumbs =
            breadcrumbs?.map((breadcrumb) => ({
                url: `/${language}${breadcrumb.path || ''}`,
                title: getMessage(intl, breadcrumb.titleId),
                handleInApp: !!breadcrumb.path,
            })) || [];

        setBreadcrumbs(appBreadcrumbs);
    }, [intl, breadcrumbs, language]);
};
