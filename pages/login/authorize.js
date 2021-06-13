import React, { useState, useEffect } from "react";
import PageTemplate from "../../frontend/components/templates/PageTemplate";

const Authorize = ({redirectUrl}) => {
    return (
        <>
            <PageTemplate title="Onboarding">
                <div>
                    <a href={decodeURIComponent(redirectUrl)}>Authorize Team Hub to access your Google Calendar Data.</a>
                </div>
            </PageTemplate>
        </>
    );
}
Authorize.getInitialProps = ({query}) => {
    return query;
}
export default Authorize;