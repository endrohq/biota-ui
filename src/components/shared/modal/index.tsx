import { CloseOutlined } from '@shared/components/icons/CloseOutlined';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  close?(): void;
  title?: string;
  open: boolean;
  position?: 'top' | 'center' | 'bottom' | 'left' | 'right';
};

const modalVariants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: 0.15 } },
  exit: { y: '100%', transition: { duration: 0.15 } },
};

export function Modal({ children, close, title, open }: ModalProps) {
  if (!open) return <></>;
  return (
    <div
      onClick={() => close?.()}
      className="absolute inset-0 z-10 h-full bg-black/25"
    >
      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          className="flex h-full w-full items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="mx-auto flex max-h-full w-full max-w-lg flex-col items-center overflow-scroll rounded bg-white p-6"
          >
            {title && (
              <div className="mb-2.5 flex w-full items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="text-lg font-bold">{title}</div>

                <div>
                  <CloseOutlined
                    className="text-sm text-gray-400"
                    onClick={() => close()}
                  />
                </div>
              </div>
            )}
            <div className="flex h-full w-full flex-col">{children}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
