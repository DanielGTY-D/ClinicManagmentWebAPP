export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
}

export interface ModalCreateState {
  isModalOpen: boolean;
  setActivateModal: (isOpen: boolean) => void;
}
