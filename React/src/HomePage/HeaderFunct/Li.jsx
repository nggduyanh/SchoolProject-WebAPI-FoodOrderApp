export default function LiFunction({ children, ...rest }) {
    return (
        <div {...rest}>
            {children}
        </div>
    )
}