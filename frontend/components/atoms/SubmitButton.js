import Button from './Button';
import Header4 from './Header4';

const SubmitButton = ({children, variant, handleClick = () => {}, disabled = false}) => {
    return (<Button height="40px"
                    width={["100%", "100%", "140px"]}
                    variant={variant}
                    onClick={handleClick}
                    disabled={disabled}
            >
                <Header4 color="#ffffff">{children}</Header4>
            </Button>)
};
export default SubmitButton;