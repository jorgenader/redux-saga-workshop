import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import withPage from 'decorators/withPage';


const Home = ({}) => (
    <div className="page-container">
        <Helmet title="Home" />
        <Row>
            <Col md={12}>This is landing page.</Col>
            <Col md={12}>
                <ul>
                    <li><Link to="/counter">Counter example</Link></li>
                </ul>
            </Col>
        </Row>
    </div>
);

const HomeAsPage = withPage(Home);

export default HomeAsPage;
