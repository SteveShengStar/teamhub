import React from "react"
import styled from "styled-components"
import Button from "../atoms/Button";

export default ({options, selected, updateSelected}) => {
    return (
        <Container>
            {
                options.map((subteam, i) => {
                    return (
                        <SubteamButton 
                            key={i}
                            variant={(selected && selected.find(index => index == i) != undefined) ? subteam.name.toLowerCase() : 'white'}
                            onClick={() => {
                                updateSelected && updateSelected(i)
                            }}
                        >
                            {subteam.name}
                        </SubteamButton>
                    )
                })
            }
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

    grid-gap: 5px;
    ${props => props.theme.mediaQueries.tablet} {
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`

const SubteamButton = styled(Button)`
    padding: 10px 20px;
`