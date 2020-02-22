import Button from './Button';
import Header4 from './Header4';

const LargeButton = ({children, variant, handleClick = () => {}}) => {
    return (<Button height={30}
                    variant={variant}
                    onClick={() => handleClick()} 
            >
                <Header4 color="#ffffff">{children}</Header4>
            </Button>)
};
export default LargeButton;