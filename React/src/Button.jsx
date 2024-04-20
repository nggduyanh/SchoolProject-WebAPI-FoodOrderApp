export default function Button({ children, ...rest }) {
    return (
        <div {...rest}>
            {children}
        </div>
    )
}