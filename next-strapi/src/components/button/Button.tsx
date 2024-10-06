import React, { MouseEventHandler } from "react";

interface IButton {
    onClick?: MouseEventHandler;
    children?: React.ReactNode;
    className?: string;
}

const Button = ({children, ...props}: IButton) => {
    return <button {...props}>{children}</button>;
}
 
export default Button;