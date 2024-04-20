export default function SearchCate({ children, className, ...rest }) {
    let str = className;
    return (
        <div className="search ">
            <input {...rest} type="text" placeholder={children} className={` ${className} p-3 min-w-96 mb-2 border border-orange-400 `} />
        </div>
    )
}