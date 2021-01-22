import { FormattedDate } from 'react-intl';

interface DatePresentationProps {
    date: string;
}

function DatePresentation({ date }: DatePresentationProps) {
    return <FormattedDate value={date} year="numeric" month="long" day="numeric" />;
}

export default DatePresentation;
