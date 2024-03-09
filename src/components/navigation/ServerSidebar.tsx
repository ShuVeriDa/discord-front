import {FC, useEffect, useState} from 'react';
import {ServerHeader} from "./ServerHeader.tsx";
import styles from './ServerSidebar.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useServer} from "../../hooks/graphql/server/useServer.ts";
import {ScrollArea, Stack} from "@mantine/core";
import {ServerSidebarSection} from "./ServerSidebarSection.tsx";
import {ServerChannel} from "./ServerChannel.tsx";
import {ChannelType} from "../../gql/graphql.ts";

interface IServerSidebarProps {
}

export const ServerSidebar: FC<IServerSidebarProps> = () => {
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null)
  const [activeChannelId, setActiveChannelId] = useState<number | null>(null)

  const navigate = useNavigate()

  const {serverId, memberId, channelId} = useParams()
  const {
    textChannels,
    server,
    role,
    audioChannels,
    videoChannels
  } = useServer()

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length > 0) {
      navigate(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`)
    }
  }, [channelId, memberId, navigate, serverId, textChannels]);

  useEffect(() => {
    if (memberId) {
      setActiveMemberId(parseInt(memberId))
      setActiveChannelId(null)
    }

    if(channelId) {
      setActiveChannelId(parseInt(channelId))
      setActiveMemberId(null)
    }
  }, [channelId, memberId, textChannels]);

  if (!server || !role) return null

  return (
    <nav className={styles.nav}>
      <ServerHeader server={server} memberRole={role}/>
      {/*  ServerSearch*/}
      <ScrollArea>
        {!!textChannels.length &&
          <ServerSidebarSection sectionType={"channels"}
                                role={role}
                                label={"Text Channels"}
                                channelType={ChannelType.Text}
          />
        }
        <Stack>
          {textChannels.map((channel) => {
            return <ServerChannel key={channel?.id}
                                  channel={channel}
                                  isActive={activeChannelId === channel?.id}
                                  role={role}
                                  server={server}
            />
          })}
        </Stack>
        {!!audioChannels.length &&
          <ServerSidebarSection sectionType={"channels"}
                                role={role}
                                label={"Audio Channels"}
                                channelType={ChannelType.Text}
          />
        }
        <Stack>
          {audioChannels.map((channel) => {
            return <ServerChannel key={channel?.id}
                                  channel={channel}
                                  isActive={activeChannelId === channel?.id}
                                  role={role}
                                  server={server}
            />
          })}
        </Stack>
      </ScrollArea>
    </nav>
  );
};