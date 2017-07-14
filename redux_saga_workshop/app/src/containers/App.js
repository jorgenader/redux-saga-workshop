import React from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router-dom';

import NavigationBar from 'components/NavigationBar';
import PageNotFound from 'containers/PageNotFound';

const Home = () => (
    <div>Home</div>
);

const App = () => (
    <div>
        <Helmet titleTemplate="%s - Scrum Poker" defaultTitle="Scrum Poker" />
        <NavigationBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

export default App;
