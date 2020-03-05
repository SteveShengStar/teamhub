import {SystemComponent} from '../SystemComponents';


const BoxedListItem = ({variant, text}) => {
    return (
        <SystemComponent pt={1}
            pb={1}
            bg={variant}
            borderRadius={2}
            pl={4}
            pr={4}
            display="inline-block"
        >
            {text}
        </SystemComponent>
    )
}
export default BoxedListItem;

