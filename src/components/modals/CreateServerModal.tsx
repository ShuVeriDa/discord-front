import {FC, useState} from 'react';
import {Button, Flex, Group, Image, Modal, rem, Stack, Text, TextInput} from "@mantine/core";
import {useModal} from "../../hooks/useModal.ts";
import {useForm} from "@mantine/form";
import {Dropzone, DropzoneProps, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import styles from './CreateServerModal.module.css';
import {IconUpload, IconX} from "@tabler/icons-react";

interface ICreateServerModalProps {
}

export const CreateServerModal: FC<ICreateServerModalProps> = () => {
  const {isOpen, closeModal} = useModal("CreateServer")
  const [file, setFile] = useState<File | null>(null)

  const form = useForm({
    initialValues: {
      name: ""
    },
    validate: {
      name: (value) => !value.trim() && "Please enter a name.",
    }
  })

  const handleDropzoneChange:DropzoneProps['onDrop'] = (files) => {
    if(files.length === 0) {
      return setImagePreview(null)
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      setFile(files[0])
      reader.readAsDataURL(files[0])
    }
  }

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  return (
    <Modal title={'Create a server'}
           opened={isOpen}
           onClose={closeModal}
    >
      <Text>
        Give your a server personality with a name and an image. You can always change it later.
      </Text>
      <form onSubmit={form.onSubmit(() => {
      })}>
        <Stack>
          <Flex justify={"center"} align={"center"} direction={"column"}>
            {
              !imagePreview &&
              <Dropzone onDrop={(files) => handleDropzoneChange(files)}
                        accept={IMAGE_MIME_TYPE}
                        mt={"md"}
                        className={styles.dropZone}
              >
                <Group style={{minHeight: rem(100), pointerEvents: "none"}}>
                  <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5}/>
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5}/>
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size="3.2rem" stroke={1.5}/>
                  </Dropzone.Idle>
                  <>
                    <Text size={"xl"} inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size={"sm"} c="dimmed" inline mt={7}>
                      Upload a server icon
                    </Text>
                  </>
                </Group>
              </Dropzone>
            }

            {
              imagePreview && <Flex pos={"relative"} w={rem(150)} h={rem(150)} mt={"md"}>
                <>
                  <Button onClick={() => setImagePreview(null)}
                          color={"red"}
                          pos={"absolute"}
                          style={{
                            zIndex: 1,
                            borderRadius: "50%",
                            padding: 0,
                            width: rem(30),
                            height: rem(30),
                            top: 0,
                            right: 18
                          }}
                  >
                    <IconX color={"white"}/>
                  </Button>
                  <Image src={imagePreview}
                         w={rem(150)}
                         height={rem(150)}
                         radius={"50%"}

                  />
                </>
              </Flex>
            }
          </Flex>
          <TextInput label={"Server name"}
                     placeholder="Enter server name"
                     {...form.getInputProps("name")}
            error={form.errors.name}
          />
          <Button w="30%"
                  type="submit"
                  variant="gradient"
                  mt="md"
                  disabled={!!form.errors.name}
          >
            Create Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};