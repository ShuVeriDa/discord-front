import {useNavigate, useParams} from "react-router-dom";
import {useProfileStore} from "../../../stores/profileStore.ts";
import {useQuery} from "@apollo/client";
import {GET_SERVER} from "../../../graphql/queries/GetServer.ts";
import {ChannelType, GetServerQuery, GetServerQueryVariables} from "../../../gql/graphql.ts";


export const useServer = () => {
  const { serverId } = useParams<{ serverId: string }>()
  const profileId = useProfileStore((state) => state.profile?.id)

  const navigate = useNavigate()

  const { data: dataServer, loading } = useQuery<
    GetServerQuery,
    GetServerQueryVariables
  >(GET_SERVER, {
    variables: {
      id: Number(serverId),
    },
    onError: () => {
      navigate("/")
    },
  })

  const textChannels = dataServer?.getServer
    .map(server => server.channels
      ?.filter(
        (channel) => channel?.type === ChannelType.Text
      )) || []

  const audioChannels = dataServer?.getServer
    .map((server) => server.channels
      ?.filter(channel => channel?.type === ChannelType.Audio)) || []

  const videoChannels = dataServer?.getServer
    .map((server) => server.channels
      ?.filter(channel => channel?.type === ChannelType.Video)) || []

  const members = dataServer?.getServer
    .map((server) => server.members
      ?.find(member => member?.profileId !== profileId))

  const role = dataServer?.getServer
    .map((server) => server.members
      ?.find(member => member?.profileId !== profileId)?.role)

  return {
    server: dataServer?.getServer,
    loading,
    textChannels,
    audioChannels,
    videoChannels,
    members,
    role,
  }
}