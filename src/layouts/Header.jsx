import '../assets/styles/cn__header.css'
import Logout from "../pages/Logout";
function Header() {
  const jsonName = sessionStorage.getItem("sc_user_info");
  const jsonObject = JSON.parse(jsonName);
  return (
    <nav className='navbar navbar-expand navbar-white navbar-light d-flex justify-content-between pt-0 pb-0'>
      <div className='cn__logoBread'>
        <section>
          <img src='/src/assets/images/logo_time.png' alt='logo_header' className='cn__logo_header' />
        </section>
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
      </div>
      <section className='cn__userCircle'>
        <div className='cn__profileName'>{jsonObject.name}</div>
        <div className='cn__line'></div>
        <div className='cn__logout'>
          <Logout />
        </div>
      </section>
    </nav>
  );
}

export default Header;
