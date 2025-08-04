import { useState } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  return {
    isOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
};
