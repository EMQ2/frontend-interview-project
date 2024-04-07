interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string
  handleClick?: (event: any) => void
  text?: string
  width?: string
  color?: string
}

function Button({
  text = "Button",
  backgroundColor = "grey",
  handleClick,
  width = "100%",
  color = "black",
  ...rest
}: ButtonProps) {
  const style = {
    backgroundColor,
    border: "none",
    width,
    padding: "0.5rem",
    color,
  }
  return (
    <button onClick={handleClick} style={style} className="button" {...rest}>
      {text}
    </button>
  )
}

export default Button
