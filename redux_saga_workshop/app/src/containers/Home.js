import React from 'react';
import Helmet from 'react-helmet';
import {Row, Col} from 'react-bootstrap';

import withPage from 'decorators/withPage';


const Home = () => (
    <div className="page-container">
        <Helmet title="Home" />
        <Row>
            <Col md={12}>
                This is some extra info or list of references.
                TODOS:
                <ul>
                    <li>Convert Todo's to use only sagas.</li>
                    <li>Mk2</li>
                    <li>Mk3</li>
                </ul>
            </Col>
        </Row>
    </div>
);

const HomeAsPage = withPage(Home);

export default HomeAsPage;
