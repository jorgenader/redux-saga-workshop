import React from 'react';

import Page from 'containers/Page';
import PageError from 'components/PageError';

const PageNotFound = () => (
    <Page>
        <PageError statusCode={404} title="Page not Found" message="Page not Found" />
    </Page>
);

export default PageNotFound;
