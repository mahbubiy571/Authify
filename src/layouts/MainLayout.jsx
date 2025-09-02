import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header />
      <main>
        <Outlet />
      </main>
      <footer />
    </div>
  );
}

export default MainLayout;
