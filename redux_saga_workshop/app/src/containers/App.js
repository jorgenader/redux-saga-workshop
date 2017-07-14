import React from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router-dom';

import NavigationBar from 'components/NavigationBar';

import Home from 'containers/Home';
import Todos from 'containers/Todos';
import Counter from 'containers/Counter';
import PageNotFound from 'containers/PageNotFound';


const App = () => (
    <div>
        <Helmet titleTemplate="%s - Redux-Saga Workshop" defaultTitle="Redux-Saga Workshop" />
        <NavigationBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/todos" component={Todos} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

export default App;
