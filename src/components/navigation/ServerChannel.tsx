import {FC} from 'react';
import {Channel, ChannelType, MemberRole, Server} from "../../gql/graphql.ts";
import {IconCamera, IconHash, IconMessage, IconMicrophone} from "@tabler/icons-react";
import {useModal} from "../../hooks/useModal.ts";
import {useNavigate} from "react-router-dom";
import {NavLink, rem, Stack} from "@mantine/core";

interface IServerChannelProps {
  channel: Channel | null
  server: Server
  role?: MemberRole
  isActive?: boolean
}

const iconMap = {
  [ChannelType.Text]: <IconHash size={15}/>,
  [ChannelType.Audio]: <IconMicrophone size={15}/>,
  [ChannelType.Video]: <IconCamera size={15}/>,
}

export const ServerChannel: FC<IServerChannelProps> = ({server, channel, role, isActive}) => {

  const Icon = iconMap[channel.type]
  const deleteChannelModal = useModal("DeleteChannel")
  const updateChannelModal = useModal("UpdateChannel")

  const navigate = useNavigate()

  if (!channel && !server) return null

  if (channel?.name !== "general") {
    return <NavLink ml={"md"}
                    w={rem(260)}
                    label={channel?.name}
                    rightSection={<Icon />}
                    active={isActive}
    >
      {role !== MemberRole.Guest && <Stack>
        <NavLink label={"Join"}
                 onClick={() => navigate(`/servers/${server.id}/channels/${channel?.type}/${channel.id}`)}
                 rightSection={<IconMessage style={{marginLeft: "rem8px"}} size={20}/>}
        >

        </NavLink>
      </Stack>}
    </NavLink>
  }
};