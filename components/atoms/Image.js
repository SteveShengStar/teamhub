import styled from "styled-components";
import { variant } from "styled-system";
import { SystemImage } from "./SystemComponents";

const Image = styled(SystemImage)(
    variant({
        variants: {
            background: {
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }
        }
    })
);
Image.defaultProps = {
    
};

export default Image;