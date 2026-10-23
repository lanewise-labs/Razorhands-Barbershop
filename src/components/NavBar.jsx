import '../css/navbar.css'

function NavBar(){
    return (
        <header className='nav-bar'>
            <a href='#home'><h3>Razorhands</h3></a>
            <nav className='link-bar'>
                <a href='#about'>About</a>
                <a href='#services'>Services</a>
                <a href='#contact'>Contact</a>
            </nav>
        </header>
    )
}

export default NavBar