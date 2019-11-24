import styled, {ThemeProvider} from 'styled-components';

import { SystemComponent } from '../atoms/SystemComponents';
import Input from "../atoms/Input";
import Radio from "../atoms/Radio";
import theme from '../theme';


const FormWrapper = styled(SystemComponent)`
    display: flex;
    flex-direction: column;
    margin: ${props => props.theme.space[2]}px 0 ${props => props.theme.space[5]}px;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        flex-direction: row;
    }
`;


const TeamHierSearchBar = styled(Input)`
    box-sizing: border-box;
    width: 100%;
    
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: 465px;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        width: 375px;
    }
`

const RadioFormParentContainer = styled(SystemComponent)`
    width: 100%;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        width: 33.33%;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: 195px;
    }
`;

const SearchFormContainer = styled(SystemComponent)`
    width: 100%;
    margin-top: ${props => props.theme.space[4]}px;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        width: 66.66%;
        margin-top: 0;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: auto;
    }
`;

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px", "1200px"]
};

const TeamHierFormWrapper = () => {
    return (
        <ThemeProvider theme={teamHierCustomTheme}>
            <FormWrapper>
                <RadioFormParentContainer>
                    <form>
                        <Radio name="filter-by" value="name"></Radio>
                        <Radio name="filter-by" value="role"></Radio>
                    </form>
                </RadioFormParentContainer>
                <SearchFormContainer>
                    <form>
                        <TeamHierSearchBar variant="text" placeholder="Search"/>
                    </form>
                </SearchFormContainer>
            </FormWrapper>
        </ThemeProvider>
    );
}
export default TeamHierFormWrapper;