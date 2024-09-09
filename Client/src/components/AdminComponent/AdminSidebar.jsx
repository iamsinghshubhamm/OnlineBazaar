import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { sidebarItems } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

const AdminSidebar = ({ setOpen, open }) => {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle>Admin Panel</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="mt-6">
              <ul className="space-y-4">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => setOpen(false)}
                      to={item.path}
                      className="flex px-[10px] py-[7px] rounded-md hover:bg-slate-100 items-center gap-2 text-sm font-medium"
                    >
                      <item.icon />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex px-[10px] py-[7px] rounded-md hover:bg-slate-100 items-center gap-2 text-sm font-medium"
                >
                  <item.icon />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
