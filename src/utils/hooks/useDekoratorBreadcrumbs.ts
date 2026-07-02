import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

import { useStore } from 'store/Context';
import { Breadcrumb } from 'types/breadcrumbs';
import { getMessage } from 'utils/intl';

export const useDekoratorBreadcrumbs = (breadcrumbs?: Breadcrumb[]) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [{ language }] = useStore();

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
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
