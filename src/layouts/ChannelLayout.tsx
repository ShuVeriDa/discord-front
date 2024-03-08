import {FC} from 'react';
import {Outlet} from "react-router-dom";
import {MobileSidebar} from "../components/navigation/MobileSidebar.tsx";

interface IServerLayoutProps {}

export const ChannelLayout: FC<IServerLayoutProps> = () => {
  return (
    <>
      <MobileSidebar />
      <Outlet />
    </>
  );
};