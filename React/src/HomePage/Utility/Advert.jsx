export default function Advert({ children, ...rest }) {
    return (
        <div {...rest}>
            {children}
        </div>
    )
}