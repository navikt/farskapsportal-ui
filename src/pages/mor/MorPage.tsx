import React from 'react';

import WithAuth from 'store/providers/WithAuth';

function MorPage() {
    return (
        <WithAuth>
            <div>Her er siden for mor</div>
        </WithAuth>
    );
}

export default MorPage;
