import {Profile} from "../gql/graphql.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface ProfileStore {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => {
        set(() => ({
          profile
        }))
      }
    }),
    {
      name: 'profile-store'
    }
  )
)