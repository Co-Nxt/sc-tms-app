import '../assets/styles/cn__header.css'
function Header() {
  return (
    <nav className='navbar navbar-expand navbar-white navbar-light d-flex justify-content-between'>
      <section className='cn__breadcrumbs'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <ol
              className='breadcrumb float-sm-right'
              style={{ backgroundColor: "#fff", marginBottom: "0" }}
            >
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Layout</a>
              </li>
              <li className='breadcrumb-item active'>Fixed Navbar Layout</li>
            </ol>
          </li>
        </ul>
      </section>
      <section className='cn__userCircle'>
        <ul className="cn__ul">
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </section>
    </nav>
  );
}

export default Header;
