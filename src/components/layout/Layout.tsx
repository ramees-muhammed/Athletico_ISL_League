import React from 'react';

import './Layout.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout">
      {/* <Navbar /> */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;