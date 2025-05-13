import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import Layout from "../components/Layout";

const PageNotFound = () => {
    return (
        <Layout>
            <Row className="align-items-center">
                <Col className="text-center p-5">
                    <h2 className="py-4"><b>404 Error</b></h2>
                    <p>Oops! The page you're looking for does not exist. Press the back button to continue browsing.</p>
                </Col>

            </Row>
        </Layout >
    );
};

export default PageNotFound;