import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Path } from 'types/path';

function Kvittering() {
    return (
        <Page
            titleId="header.kvittering"
            breadcrumbs={[
                { titleId: 'breadcrumbs.oversikt', path: Path.Oversikt },
                { titleId: 'breadcrumbs.kvittering' },
            ]}
        >
            <WithUserInfo>
                {(userInfo) => {
                    return <div>{JSON.stringify(userInfo)}</div>;
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
