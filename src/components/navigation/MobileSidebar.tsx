import {FC} from 'react';
import {useGeneralStore} from "../../stores/generalStore.ts";
import {Sidebar} from "./Sidebar.tsx";
import {Drawer, rem} from "@mantine/core";
import {ServerSidebar} from "./ServerSidebar.tsx";

interface IModuleSidebarProps {
}

export const MobileSidebar: FC<IModuleSidebarProps> = () => {
  const {drawerOpen, toggleDrawer} = useGeneralStore((state) => state)

  return (
    <>
      <Sidebar/>
      <Drawer padding={"0"}
              mb={"0"}
              zIndex={10}
              opened={drawerOpen}
              size={rem(320)}
              position={"left"}
              withOverlay={false}
              style={{root:{position: "fixed", width: 0, height: 0} }}
              withCloseButton={false}
              ml={rem(80)}
              onClose={toggleDrawer}
        >
        <ServerSidebar />
      </Drawer>
    </>
  );
};