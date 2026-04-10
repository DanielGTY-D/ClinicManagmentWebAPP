import styles from "./RoleModal.module.css";
import Container from "~/shared/components/container/Container";
import CustomButton, {
  type CustomButtonProps,
} from "~/shared/components/customButton/CustomButton";
import { useAppStore } from "~/shared/stores/useAppStore";
import type { RoleRequest } from "~/features/roles/types/role";

interface ModalFieldsProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  inputValue: string;
}

interface ModalBodyProps {
  title: string;
  subTitle: string;
  fields: ModalFieldsProps[];
}

interface ModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  modalBody: ModalBodyProps;
  onClose: () => void;
  onSave?: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Modal({
  isOpen,
  onClose,
  onSave,
  isLoading = false,
  modalBody,
  onChange
}: ModalProps) {
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const setToggleModal = useAppStore((state) => state.setToggleModal);

  const { title, subTitle, fields } = modalBody;

  return (
    <div className={`${isOpen && styles.backdrop}`}>
      <form
        onSubmit={onSave}
        className={`${styles.modal} ${isOpen ? styles.fadeIn : styles.fadeOut}`}
      >
        <Container>
          <header className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <span className={styles.modalSubTitle}>{subTitle}</span>
          </header>

          <div className={styles.modalContent}>
            {fields.map((field) => (
              <div className={styles.field} key={field.id}>
                <label className={styles.label} htmlFor={field.id}>
                  {field.labelText}
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.inputValue}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>

          <div className={styles.modalActions}>
            <CustomButton
              bg="white"
              icon=""
              textContent="Cancel"
              type="reset"
              onModalOpen={onClose}
            />
            <CustomButton
              bg="blue"
              icon="AddIcon"
              textContent="Add rol"
              type="submit"
            />
          </div>
        </Container>
      </form>
    </div>
  );
}
