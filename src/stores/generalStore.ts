import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ChannelType} from "../gql/graphql.ts";

export type Modal =
  "CreateServer"
  | "InvitePeople"
  | "UpdateServer"
  | "CreateChannel"
  | "ManageMembers"
  | "DeleteChannel"
  | "UpdateChannel"

interface GeneralStore {
  activeModal: Modal | null
  drawerOpen: boolean
  channelTypeForCreateChannelType: ChannelType
  channelToBeDeletedOrUpdatedId: number | null,
  setActiveModal: (modal: Modal | null) => void
  toggleDrawer: () => void
  setChannelTypeForCreateChannelModal: (type: ChannelType) => void
  setChannelToBeDeletedOrUpdatedId: (id: number | null) => void
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      drawerOpen: true,
      channelTypeForCreateChannelType: ChannelType.Text,
      channelToBeDeletedOrUpdatedId: null,

      setActiveModal: (modal: Modal | null) => set({activeModal: modal}),
      toggleDrawer: () => set((state) => ({drawerOpen: !state.drawerOpen})),
      setChannelTypeForCreateChannelModal: (channelType) => set(() => ({channelTypeForCreateChannelType: channelType})),
      setChannelToBeDeletedOrUpdatedId: (id: number | null) => set(() => ({channelToBeDeletedOrUpdatedId: id}))
    }),
    {
      name: "general-store"
    }
  )
)
