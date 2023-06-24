import {
  TopicMessageSubmitTransaction,
  TopicMessageQuery,
  TopicMessage,
} from '@hashgraph/sdk';
import { Feature } from '@nebula.gl/edit-modes';
import React, { createContext, useState, useEffect, useCallback } from 'react';

import { useHederaClient } from '../hooks/useHederaClient';

interface HederaContextType {
  messages: Message[];
  submitMessage: (message: string) => Promise<void>;
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

type MessageType = 'PROPOSAL_CREATED';

type Message = {
  type: MessageType;
  location: Feature[];
};

// TODO: Store as .env variable
const PUBLIC_TOPIC_ID = '0.0.14973703';

export function HederaNotificationProvider({ children }: HederaProviderProps) {
  const { client } = useHederaClient();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // createTopic();
  }, []);

  const submitMessage = useCallback(
    async (message: string): Promise<void> => {
      await new TopicMessageSubmitTransaction()
        .setTopicId(PUBLIC_TOPIC_ID)
        .setMessage(message)
        .execute(client);

      listenForMessages();
    },
    [client],
  );

  const listenForMessages = useCallback(() => {
    const listener = new TopicMessageQuery();
    listener.setTopicId(PUBLIC_TOPIC_ID).subscribe(
      client,
      (message: TopicMessage) => {
        const decoder = new TextDecoder();
        const messageAsString = decoder.decode(message.contents);
        if (messageAsString !== '') {
          const message = JSON.parse(messageAsString) as Message;
          setMessages(prevMessages => [...prevMessages, message]);
        }
      },
      error => console.error(error),
    );
  }, [PUBLIC_TOPIC_ID, client]);

  return (
    <HederaContext.Provider
      value={{
        messages,
        submitMessage,
      }}
    >
      {children}
    </HederaContext.Provider>
  );
}
