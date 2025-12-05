import "./Button.css";

const Button = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const classNames = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
