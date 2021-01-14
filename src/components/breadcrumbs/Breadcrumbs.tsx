import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

import { useStore } from 'store/Context';
import { Breadcrumb } from 'types/breadcrumbs';
import { getMessage } from 'utils/intl';

interface BreadcrumbsProps {
    breadcrumbs?: Breadcrumb[];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
    const intl = useIntl();
    const history = useHistory();
    const [{ language }] = useStore();

    onBreadcrumbClick((breadcrumb) => {
        history.push(breadcrumb.url);
    });

    useEffect(() => {
        const baseBreadcrumbs = [
            {
                url: `/${language}/`,
                title: getMessage(intl, 'breadcrumbs.forside'),
                handleInApp: true,
            },
        ];

        const appBreadcrumbs =
            breadcrumbs?.map((breadcrumb) => ({
                url: `/${language}${breadcrumb.path || ''}`,
                title: getMessage(intl, breadcrumb.titleId),
                handleInApp: !!breadcrumb.path,
            })) || [];

        setBreadcrumbs(baseBreadcrumbs.concat(appBreadcrumbs));
    }, [intl, breadcrumbs, language]);

    return null;
}

export default Breadcrumbs;
