import { Modal } from '@shared/components/modal';

interface CreateObjectionProps {
  close: () => void;
}

export function CreateObjection({ close }: CreateObjectionProps) {
  return (
    <Modal open close={close} position="right">
      dssdfsdfsd
    </Modal>
  );
}
