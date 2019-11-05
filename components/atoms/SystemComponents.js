import styled from "styled-components";
import { grid, color, space, layout, typography, flexbox, compose, shadow, border, position, system } from "styled-system";

const transition = system({
    prop: "transition",
    cssProperty: "transition",
    scale: "transitions"
});

export const composition = compose(grid, color, space, flexbox, layout, typography, shadow, border, position, transition);
export const themeDefaultProps = {
    fontFamily: "body",
    fontSize: "body",
    fontWeight: "regular",
    color: "foreground"
};


export const SystemComponent = styled.div(composition);
export const SystemSpan = styled.span(composition);
export const SystemHeader = {
    H1: styled.h1(composition),
    H2: styled.h2(composition),
    H3: styled.h3(composition),
    H4: styled.h4(composition),
    H5: styled.h5(composition),
    H6: styled.h6(composition)
}
export const SystemBody = styled.p(composition);
export const SystemLink = styled.a(composition);
export const SystemButton = styled.button(composition);

export const SystemImage = styled.img(composition);
export const SystemLabel = styled.label(composition);
export const SystemInput = styled.input(composition);
export const SystemNav = styled.nav(composition);
export const SystemSvg = styled.svg(composition);

SystemComponent.defaultProps = themeDefaultProps
SystemSpan.defaultProps = themeDefaultProps;
SystemHeader.H1.defaultProps = { ...themeDefaultProps, fontWeight: "black" }
SystemHeader.H2.defaultProps = { ...themeDefaultProps, fontWeight: "black" }
SystemHeader.H3.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H4.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H5.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemHeader.H6.defaultProps = { ...themeDefaultProps, fontWeight: "bold" }
SystemBody.defaultProps = themeDefaultProps;

SystemLink.defaultProps = { ...themeDefaultProps, color: "action" };
SystemButton.defaultProps = themeDefaultProps;
SystemLabel.defaultProps = themeDefaultProps;
SystemInput.defaultProps = themeDefaultProps;
SystemNav.defaultProps = themeDefaultProps;