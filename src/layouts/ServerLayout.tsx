import {FC} from 'react';
import {Outlet} from "react-router-dom";
import {ServerSidebar} from "../components/navigation/ServerSidebar.tsx";

interface IServerLayoutProps {
}

export const ServerLayout: FC<IServerLayoutProps> = () => {
  return (
    <div>
      <ServerSidebar />
      <Outlet />
    </div>
  );
};