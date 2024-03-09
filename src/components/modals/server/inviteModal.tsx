import {FC, useEffect} from 'react';
import {useModal} from "../../../hooks/useModal.ts";
import {Button, Flex, Modal, Stack, Text, TextInput} from "@mantine/core";
import {useServer} from "../../../hooks/graphql/server/useServer.ts";
import {useClipboard} from "@mantine/hooks";
import {useMutation} from "@apollo/client";
import {
  UpdateServerWithNewInviteCodeMutation,
  UpdateServerWithNewInviteCodeMutationVariables
} from "../../../gql/graphql.ts";
import {UPDATE_SERVER_WITH_NEW_INVITE_CODE} from "../../../graphql/mutations/server/UpdateServerWithNewCode.ts";
import {useForm} from "@mantine/form";
import {IconCheck, IconCopy} from "@tabler/icons-react";

interface IInviteModalProps {
}

export const InviteModal: FC<IInviteModalProps> = () => {
  const {isOpen, closeModal} = useModal("InvitePeople")
  const {server} = useServer()
  const clipboard = useClipboard({timeout: 500})

  const [updateServerWithNewInviteCode, {loading}] = useMutation<UpdateServerWithNewInviteCodeMutation, UpdateServerWithNewInviteCodeMutationVariables>(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
    variables: {
      serverId: server?.id
    }
  })

  const form = useForm({
    initialValues: {
      inviteCode: ""
    }
  })

  useEffect(() => {
    if (!server?.inviteCode) return

    form.setValues({
      inviteCode: server?.inviteCode
    })
  }, [server?.inviteCode]);

  return (
    <Modal opened={isOpen} onClose={closeModal} title={"Invite People"}>
      <Stack>
        <Flex>
          <TextInput label={"Server Invite Code"}
                     w={"100%"}
                     {...form.getInputProps("inviteCode")}
                     rightSection={<Button variant={"transparent"} onClick={clipboard.copy}>
                       {clipboard.copied
                         ? <IconCopy/>
                         : <IconCheck color={"green"}/>
                       }
                     </Button>}
          />
        </Flex>
        <Button disabled={loading} onClick={() => updateServerWithNewInviteCode()}>
          <Text mr={'md'}>Generate New Invite Code</Text>
        </Button>
      </Stack>
    </Modal>
  );
};