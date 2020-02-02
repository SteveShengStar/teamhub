import Button from './Button';
import Header4 from './Header4';

const LargeButton = ({children, variant, onClickHandler = () => {}}) => {
    return (<Button height={30}
                    variant={variant}
                    onClick={() => onClickHandler()} 
            >
                <Header4 color="#ffffff">{children}</Header4>
            </Button>)
};
export default LargeButton;