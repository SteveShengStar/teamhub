import React, { useState, useEffect } from "react";
import PageTemplate from "../../frontend/components/templates/PageTemplate";

const Authorize = ({redirectUrl}) => {
    console.log("redirectUrl");
    console.log(redirectUrl);
    return (
        <>
            <PageTemplate title="Onboarding">
                <a href={decodeURIComponent(redirectUrl)}>Authorize Team Hub to access your Google Calendar Data.</a>
            </PageTemplate>
        </>
    );
}
Authorize.getInitialProps = ({query}) => {
    console.log("query")
    console.log(query)
    return query;
}
export default Authorize;