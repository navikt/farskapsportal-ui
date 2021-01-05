import { UserInfo } from 'types/user';

interface FarErklaeringerProps {
    userInfo: UserInfo;
}

function FarErklaeringer({ userInfo }: FarErklaeringerProps) {
    if (!userInfo.farsVentendeFarskapserklaeringer?.length) {
        return null;
    }

    return <div>{JSON.stringify(userInfo.farsVentendeFarskapserklaeringer)}</div>;
}

export default FarErklaeringer;
