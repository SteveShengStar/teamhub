import styled from 'styled-components';
import { composition } from './SystemComponents';

const CustomLogo = ({ className }) => (
    <img className={className} src='/static/logo.png' alt='logo' />
);

const Logo = styled(CustomLogo)(composition);

export default Logo;
