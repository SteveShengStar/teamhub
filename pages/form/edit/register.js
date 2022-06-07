import React, { useState, useEffect } from "react";
import {useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PageTemplate from "../../../frontend/components/templates/PageTemplate";
import { SystemComponent } from "../../../frontend/components/atoms/SystemComponents";

import { useFormDetails } from '../../../frontend/store/api/forms';

const RegFormEditor = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        useFormDetails('629c13c59d0c0a6b357b4e0f', dispatch, router)
            .then(res => {
                console.log("res.body");
                console.log(res.body);
            })
            .catch(e => console.error(e));
    })

    return (
        <PageTemplate>
            <SystemComponent></SystemComponent>
        </PageTemplate>
    );
}
export default RegFormEditor
