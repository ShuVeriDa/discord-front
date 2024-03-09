import {FC} from 'react';
import {Divider, Flex, Menu, rem, Text} from "@mantine/core";

import {IconArrowAutofitDown, IconPlus, IconSettings, IconTrash, IconX} from "@tabler/icons-react";
import {useModal} from "../../hooks/useModal.ts";
import {MemberRole, Server} from "../../gql/graphql.ts";

interface IServerHeaderProps {
  server: Server,
  memberRole: MemberRole
}

export const ServerHeader: FC<IServerHeaderProps> = ({server, memberRole}) => {
  const isAdmin = memberRole === MemberRole.Admin
  const isModerator = memberRole === MemberRole.Moderator || isAdmin

  const inviteModal = useModal("InvitePeople")
  const updateServerModal = useModal("UpdateServer")
  const createChannelModal = useModal("CreateChannel")

  return (
    <Menu shadow={"md"} width={rem(320)}>
      <Menu.Target>
        <Flex p={"md"}
              justify={"space-between"}
              align={"center"}
              w={"100%"}
              style={{cursor: "pointer"}}
        >
          {server?.name} <IconArrowAutofitDown/>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={inviteModal.openModal} rightSection={<IconPlus/>}>Invite People</Menu.Item>
        {isAdmin &&
          <Menu.Item onClick={updateServerModal.openModal} rightSection={<IconSettings/>}>Update Server</Menu.Item>}
        {isModerator &&
          <Menu.Item onClick={createChannelModal.openModal} rightSection={<IconPlus/>}>Create Channel</Menu.Item>}
        {isModerator && <Divider/>}
        {isAdmin && <Menu.Item color={"red"} rightSection={<IconTrash/>}>
          <Text>Delete Server</Text>
        </Menu.Item>}
        {!isAdmin && <Menu.Item rightSection={<IconX/>} color={"red"}>
          <Text>Leave Server</Text>
        </Menu.Item>}
      </Menu.Dropdown>

    </Menu>
  );
};