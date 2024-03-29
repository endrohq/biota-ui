import { HcsMessage } from '@shared/typings';
import React, { createContext, useState, useCallback, useEffect } from 'react';

const notificationsServiceUrl =
  process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVICE || '';

const protocol = process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'ws' : 'wss';

interface HederaContextType {
  messages: HcsMessage[];
  submitMessage: (message: HcsMessage) => Promise<void>;
  setHasViewed: () => void;
}

export const useHederaNotifications = (): HederaContextType => {
  const context = React.useContext(HederaContext);
  if (!context) {
    throw new Error(
      `useHederaNotifications must be used within a HederaNotificationProvider`,
    );
  }
  return context;
};

export const HederaContext = createContext<HederaContextType | undefined>(
  undefined,
);

interface HederaProviderProps {
  children: React.ReactNode;
}

export function HederaNotificationProvider({ children }: HederaProviderProps) {
  const [messages, setMessages] = useState<HcsMessage[]>([]);

  const submitMessage = useCallback(
    async (message: HcsMessage): Promise<void> => {
      const response = await fetch(
        `https://${notificationsServiceUrl}/api/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        },
      );

      if (!response.ok) {
        // Handle error...
      }
    },
    [],
  );

  function setHasViewed() {
    setMessages(prevState =>
      prevState.map(message => ({ ...message, isViewed: true })),
    );
  }

  useEffect(() => {
    const ws = new WebSocket(`${protocol}://${notificationsServiceUrl}`);

    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <HederaContext.Provider
      value={{
        messages,
        submitMessage,
        setHasViewed,
      }}
    >
      {children}
    </HederaContext.Provider>
  );
}
