import {Modal, useGeneralStore} from "../stores/generalStore.ts";

export const useModal = (modalType: Modal) => {
  const {activeModal, setActiveModal} = useGeneralStore((state) => state)

  const isOpen = activeModal === modalType

  const openModal = () => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return {isOpen, openModal, closeModal}
}