import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { ThemeContext } from 'styled-components';
import PageTemplate from '../../../frontend/components/templates/PageTemplate';
import {
  SystemComponent
} from '../../../frontend/components/atoms/SystemComponents';

const FormsDashboard = () => {


    return (
        <PageTemplate>
            <SystemComponent width="200px" height="200px" backgroundColor="green"></SystemComponent>
        </PageTemplate>
    );
};
export default FormsDashboard;