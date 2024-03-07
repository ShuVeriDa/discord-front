import {FC, useEffect} from 'react';
import {ServerHeader} from "./ServerHeader.tsx";
import styles from './ServerSidebar.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useServer} from "../../hooks/graphql/server/useServer.ts";

interface IServerSidebarProps {
}

export const ServerSidebar: FC<IServerSidebarProps> = () => {
  const navigate = useNavigate()

  const {serverId, memberId, channelId} = useParams()
  const {textChannels} = useServer()

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length > 0) {
      navigate(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`)
    }
  }, [channelId, memberId, navigate, serverId, textChannels]);

  return (
    <nav className={styles.nav}>
      <ServerHeader/>
    </nav>
  );
};