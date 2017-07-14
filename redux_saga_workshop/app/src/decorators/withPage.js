import React from 'react';

import Page from 'containers/Page';

export default (Component) => {
    const WrappedComponent = props => (
        <Page {...props}>
            <Component {...props} />
        </Page>
    );
    WrappedComponent.displayName = `withPage(${Component.displayName || Component.name})`;
    return WrappedComponent;
};
