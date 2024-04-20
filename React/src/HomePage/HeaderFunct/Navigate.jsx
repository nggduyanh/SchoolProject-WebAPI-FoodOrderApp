export default function Navigate({ children, ...rest }) {
    return (
        <div {...rest}>
            {children}
        </div>
    )
}