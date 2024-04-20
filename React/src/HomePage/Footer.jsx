const Footer = () => {
    return (
        <div className="flex justify-between bg-gray-800 text-white text-center py-28 ">
            <div className="grow ml-14 text-left">
                <p className="font-bold text-4xl ">The Best <br /> Restaurants <br /> in Your Home</p>
                <br />
                <p>Vitae congue mauris rhoncus aenean. Enim nulla
                    <br /> aliquet porttitor lacus luctus accumsan <br /> tortor posuere.
                    <br />Tempus egestas sed sed risus pretium quam.</p>
            </div>
            <div className="grow text-left">
                <p className="text-4xl font-bold text-gray-500">Menu</p>
                <br />
                <ul>

                    <li><a href="">Home</a></li>
                    <br />
                    <li><a href="">About</a></li>
                    <br />
                    <li><a href="">Restaurant</a></li>
                    <br />
                    <li><a href="">Contacts</a></li>
                </ul>
            </div>
            <div className="grow mr-14 text-left">
                <p className="text-4xl text-gray-500 font-bold">CONTACTS</p>
                <br />
                <p>1717 Harrison St, San Francisco, CA 94103, United States</p>
                <br />
                <hr />
                <br />
                <p>Email: vuongducluong0369@gmail.com</p>
                <br />
                <p>PhoneNumber: 011112232323</p>
            </div>
        </div>
    )
}
export default Footer;