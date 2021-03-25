import { IntlShape } from 'react-intl';

type MessageValue = string | number | boolean | Date | null | undefined;

export const getMessage = (
    intl: IntlShape,
    id: string,
    value?: { [key: string]: MessageValue }
): string => intl.formatMessage({ id }, value);

export const formatDate = (intl: IntlShape, date: string): string =>
    intl.formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
