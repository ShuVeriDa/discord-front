import {FC, useState} from 'react';
import styles from './Sidebar.module.css';
import {Button, Center, Image, rem, Stack, Tooltip, UnstyledButton, useMantineColorScheme} from "@mantine/core";
import {IconArrowsJoin, IconMoon, IconPlus, IconSun} from "@tabler/icons-react";
import {useModal} from "../../hooks/useModal.ts";
import {UserButton} from "@clerk/clerk-react";
import {useServers} from "../../hooks/graphql/server/useServers.ts";
import {useNavigate} from "react-router-dom";

interface NavbarLinkProps {
  label: string
  active?: boolean
  imageUrl: string
  onClick?: () => void
}

const NavbarLink = ({imageUrl, label, active, onClick}: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        data-active={active || undefined}
        style={{borderRadius: rem(100)}}
      >
        <Image src={imageUrl} w={rem(50)} h={rem(50)} radius={100}/>
      </UnstyledButton>
    </Tooltip>
  )
}

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()
  const {openModal} = useModal("CreateServer")
  const {servers, loading} = useServers()
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  const links = servers?.map((server, index) => (
    <NavbarLink
      label={server?.name}
      imageUrl={server.imageUrl}
      key={server.id}
      active={active === index}
      onClick={() => {
        setActive(index)
        navigate(`/servers/${server.id}`)
      }}
    />
  ))

  return (
    <nav className={styles.navbar}>
      <Stack>
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
        <Stack justify="center" gap="md" mt="xl">
          {links}
        </Stack>
      </Stack>


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
            : <IconSun radius={100}/>
          }
        </Button>
        <UserButton/>
      </Stack>
    </nav>
  );
};