import {FC} from 'react';
import {Outlet} from "react-router-dom";
import {ServerSidebar} from "../components/navigation/ServerSidebar.tsx";

interface IServerLayoutProps {}

export const ChannelLayout: FC<IServerLayoutProps> = () => {
  return (
    <div>
      <ServerSidebar />
      dasdasd
      <Outlet />
    </div>
  );
};