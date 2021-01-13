import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';

function Kvittering() {
    return (
        <Page titleId="header.kvittering">
            <WithUserInfo>
                {(userInfo) => {
                    return <div>{JSON.stringify(userInfo)}</div>;
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
