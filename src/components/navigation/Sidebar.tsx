import {FC} from 'react';
import styles from './Sidebar.module.css';
import {Button, Center, Stack, useMantineColorScheme} from "@mantine/core";
import {IconArrowsJoin, IconMoon, IconPlus, IconSun} from "@tabler/icons-react";
import {useModal} from "../../hooks/useModal.ts";
import {UserButton} from "@clerk/clerk-react";

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()

  const {openModal} = useModal("CreateServer")
  return (
    <nav className={styles.navbar}>
      <Center>
        <Button className={styles.link}
                onClick={openModal}
                radius={100}
                variant={"subtle"}
        >
          <IconPlus/>
        </Button>
      </Center>

      <Center>
        <Button className={styles.link}
                radius={100}
                variant={"subtle"}
                onClick={() => {
                }}
        >
          <IconArrowsJoin radius={100}/>
        </Button>
      </Center>

      <Stack justify={'center'}
             align={"center"}
      >
        <Button className={styles.link}
                variant='subtle'
                onClick={toggleColorScheme}
                radius={100}
                p={0}
        >
          {colorScheme === 'dark'
            ? <IconMoon radius={100}/>
          : <IconSun radius={100} />
          }
        </Button>
        <UserButton />
      </Stack>
    </nav>
  );
};