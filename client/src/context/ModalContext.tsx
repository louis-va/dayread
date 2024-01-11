import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
