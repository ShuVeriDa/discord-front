import {FC} from 'react';
import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/navigation/Sidebar.tsx";

interface IRouteLayoutProps {
}

export const RootLayout: FC<IRouteLayoutProps> = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};