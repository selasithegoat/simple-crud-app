import './Button.css';

const Button = ({ children, className = '', variant = 'primary', size = 'md', ...props }) => {
  const classNames = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
