import { IntlShape } from 'react-intl';

export const getMessage = (intl: IntlShape, id: string): string => intl.formatMessage({ id });
