import styled from "styled-components";
import { grid, color, space, layout, typography, flexbox, compose, shadow, border, position } from "styled-system";
export const composition = compose(grid, color, space, flexbox, layout, typography, shadow, border, position);
export const themeDefaultProps = {
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
export const SystemImage = styled.img(composition);
export const SystemLabel = styled.label(composition);
export const SystemInput = styled.input(composition);


SystemComponent.defaultProps = themeDefaultProps
SystemHeader.H1.defaultProps = { ...themeDefaultProps, fontWeight: "black" }
SystemHeader.H2.defaultProps = { ...themeDefaultProps, fontWeight: "black" }
SystemHeader.H3.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H4.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H5.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H6.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemBody.defaultProps = themeDefaultProps;

SystemButton.defaultProps = themeDefaultProps;
SystemLabel.defaultProps = themeDefaultProps;
SystemInput.defaultProps = themeDefaultProps