import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

type DeleteModal = {
  deleteFn: () => void;
  isLoading: boolean;
  isDisabled: boolean
}

const DeleteModal = ({ deleteFn, isLoading, isDisabled }: DeleteModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        colorScheme="red"
        type="button"
        size={"sm"}
        isDisabled={isDisabled}
        onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this note?
          </ModalBody>

          <ModalFooter>
            <Button 
              disabled={isLoading} 
              colorScheme='teal' 
              mr={3} 
              onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              onClick={() => deleteFn()}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;