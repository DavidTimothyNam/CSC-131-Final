import React from "react";
import { Link } from "react-router-dom";
//import Layout from "../../components/Layout";

const PageNotFound = () => {
    return (
        //<Layout>
            <div className="m-5 p-5 text-center">
                <h2><b>404 Error</b></h2>
                <p>Oops! The page you're looking for does not exist. Press the back button to continue browsing.</p>
            </div>
        //</Layout>
    );
};

export default PageNotFound;