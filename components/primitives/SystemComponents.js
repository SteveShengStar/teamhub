import styled from "styled-components";
import { system, grid, color, space, layout, typography, flexbox, compose, shadow, border, position } from "styled-system";
const composition = compose(grid, color, space, flexbox, layout, typography, shadow, border, position);
const defaultProps = {
    fontFamily: "body",
    fontSize: "body",
    fontWeight: "regular",
    color: "foreground"
};

export const SystemComponent = styled.div(composition);
export const SystemHeader = {
    H1: styled.h1(composition),
    H2: styled.h2(composition),
    H3: styled.h3(composition),
    H4: styled.h4(composition),
    H5: styled.h5(composition),
    H6: styled.h6(composition)
}
export const SystemBody = styled.p(composition);
export const SystemButton = styled.button(composition);
export const SystemLabel = styled.label(composition);

SystemComponent.defaultProps = defaultProps
SystemHeader.H1.defaultProps = { ...defaultProps, fontWeight: "black" }
SystemHeader.H2.defaultProps = { ...defaultProps, fontWeight: "black" }
SystemHeader.H3.defaultProps = { ...defaultProps, fontWeight: "bold" }
SystemHeader.H4.defaultProps = { ...defaultProps, fontWeight: "bold" }
SystemHeader.H5.defaultProps = { ...defaultProps, fontWeight: "bold" }
SystemHeader.H6.defaultProps = { ...defaultProps, fontWeight: "bold" }

SystemBody.defaultProps = defaultProps

SystemButton.defaultProps = defaultProps
SystemLabel.defaultProps = defaultProps