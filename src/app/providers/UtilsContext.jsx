'use client';

import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

const context = createContext();

export const useUtils = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(context);
  if (!ctx) throw new Error('contect not found');
  return ctx;
};

export function UtilsProvider({ children }) {
  const socket = io('ws://localhost:5000');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <context.Provider value={{
      toast,
      socket,
    }}
    >
      {children}
      <ToastContainer />
    </context.Provider>
  );
}
