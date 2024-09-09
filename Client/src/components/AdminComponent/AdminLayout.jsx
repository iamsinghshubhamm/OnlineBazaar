import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <AdminSidebar open = {openSidebar} setOpen = {setOpenSidebar}/>

      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />

        <main className="flex-1 p-2 md:p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
