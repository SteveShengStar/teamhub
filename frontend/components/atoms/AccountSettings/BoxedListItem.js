import {SystemComponent} from '../SystemComponents';


const BoxedListItem = ({className, variant, text}) => {
    return (
        <SystemComponent pt={1}
            pb={1}
            bg={variant}
            borderRadius={2}
            pl={4}
            pr={4}
            className={className}
        >
            {text}
        </SystemComponent>
    )
}
export default BoxedListItem;

