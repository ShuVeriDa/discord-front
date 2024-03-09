import {FC} from 'react';
import {useModal} from "../../../hooks/useModal.ts";
import {Button, Flex, Group, Modal, rem, Select, Stack, TextInput} from "@mantine/core";
import {useGeneralStore} from "../../../stores/generalStore.ts";
import {useForm} from "@mantine/form";
import {ChannelType, CreateChannelMutation, CreateChannelMutationVariables} from "../../../gql/graphql.ts";
import {useServer} from "../../../hooks/graphql/server/useServer.ts";
import {useMutation} from "@apollo/client";
import {CREATE_CHANNEL} from "../../../graphql/mutations/server/CreateChannel.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface ICreateChannelModalProps {
}

export const CreateChannelModal: FC<ICreateChannelModalProps> = () => {
  const {isOpen, closeModal} = useModal("CreateChannel")

  const channelType = useGeneralStore((state) => state.channelTypeForCreateChannelType)

  const form = useForm({
    initialValues: {
      name: "",
      type: channelType ? channelType : ChannelType.Text
    },

    validate: {
      name: (value) => !value.trim()
        ? "Please enter a name"
        : value === "general"
          ? "Channel name cannot be general"
          : null,

      type: (value) => !value.trim() && "Please select a type"
    },
    validateInputOnChange: true
  })

  const {server} = useServer()

  const [createChannel, {
    loading,
    error
  }] = useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CREATE_CHANNEL, {
    variables: {
      input: {
        serverId: server?.id,
        name: form.values.name,
        type: form.values.type
      }
    },
    refetchQueries: ['GetServer'],
    onCompleted: () => {
      closeModal()
      form.reset
    }
  })

  return (
    <Modal title={"Create channel"}
           opened={isOpen}
           onClose={closeModal}
    >
      <Stack>
        <Flex direction={"column"} h={rem(250)}>
          <TextInput mb={'md'} label={'Channel Name'} {...form.getInputProps("name")}
                     error={form.errors.name || error?.message}/>
          <Select label={"Channel Type"}
                  {...form.getInputProps("type")}
                  data={Object.values(ChannelType).map(type => type)}
          />
        </Flex>
        <Group>
          <Button color={"red"} onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={() => createChannel()}
                  loading={loading}
                  variant={"gradient"}
                  disabled={!form.values.name || !form.values.type || loading || !!error?.message}
          >
            Create Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};