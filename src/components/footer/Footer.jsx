const Footer = () => {
    return (
        <footer className="footer footer-center h-16 border-t border-t-neutral-700 bg-black shadow z-50">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Cocktail Random</p>
            </aside>
        </footer>
    );
}

export default Footer;