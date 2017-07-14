import React from 'react';
import Helmet from 'react-helmet';

import withPage from 'decorators/withPage';

import CounterDisplay from 'containers/CounterDisplay';


const Counter = () => (
    <div className="page-container counter-page">
        <Helmet title="Counter" />
        <CounterDisplay />
    </div>
);

const CounterAsPage = withPage(Counter);

export default CounterAsPage;
