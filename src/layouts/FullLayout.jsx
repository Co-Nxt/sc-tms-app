import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const FullLayout = () => {
  return (
    <>
      <div className='m__content'>
        <header className='g__header'>
          <Header />
        </header>
        {/********Sidebar**********/}
        <aside className='g__sidebar'>
          <Sidebar />
        </aside>
        {/********Main Content**********/}
        <main className='g__main'>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default FullLayout;
