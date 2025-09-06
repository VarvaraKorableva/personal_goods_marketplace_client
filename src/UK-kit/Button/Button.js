import { Link } from "react-router-dom";
import './Button.css';

function Button({ as: Component = 'button', children, className = '', ...props }) {

  const classes = `button ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Button;
