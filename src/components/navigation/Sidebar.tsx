import {FC} from 'react';
import styles from './Sidebar.module.css';
import {Button, Center, Stack, useMantineColorScheme} from "@mantine/core";
import {IconArrowsJoin, IconMoon, IconPlus, IconSun} from "@tabler/icons-react";

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()
  return (
    <nav className={styles.navbar}>
      <Center>
        <Button className={styles.link}
                onClick={() => {
                }}
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
      </Stack>
    </nav>
  );
};