import React, { useContext, useEffect, useRef, useState } from 'react';
// TODO:M: uncomment below to use assistant-sdk
// import Assistant from '@ixo/assistant-sdk';
// TODO:M: and comment below to use assistant above
import Assistant from 'assistant/assistant';
import styles from './AssistantScreen.module.scss';
import { WalletContext } from '@contexts/wallet';
import { ChainContext } from '@contexts/chain';
import { broadCastMessages } from '@utils/wallets';
import useEffectOnce from '@hooks/useEffectOnce';
import Messages from '@components/Messages/Messages';
import { ChatMessage } from 'assistant/types';
import { decodeTransactionBody } from '@utils/encoding';
import AssistantInput from '@components/AssistantInput/AssistantInput';

const AssistantScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { wallet } = useContext(WalletContext);
  const { chainInfo, chain } = useContext(ChainContext);

  const assistantRef: any = useRef();
  const containerRef = useRef(null);

  useEffectOnce(() => {
    if (!assistantRef.current) {
      assistantRef.current = new Assistant({
        assistantUrl: 'http://localhost:3003',
        apiKey: 'Bearer xvz1evFS4wEEPTGEFPHBogjmb1evFS4wEEPTGEFPHBogwEEPTGEFPHBogjmb1evFS4',
        address: wallet.user!?.address ?? '',
        did: wallet.user!?.did ?? 'did:x:123456789abcdefghi',
        network: chain.chainNetwork,
      });
      const observer: any = {
        update: (updatedMessages: ChatMessage[]) => {
          setMessages([...updatedMessages]);
        },
      };
      assistantRef.current.subscribe(observer);
      assistantRef.current.newChat(true);
      return () => {
        assistantRef.current.unsubscribe(observer);
      };
    }
  });

  useEffect(() => {
    if (wallet && chain && assistantRef.current) {
      assistantRef.current.onTransaction((txBody: Uint8Array) => {
        const tx = decodeTransactionBody(txBody);
        return broadCastMessages(wallet, tx.messages, tx.memo, 'average', 'uixo', chainInfo);
      });
    }
  }, [wallet, chain, assistantRef.current]);

  const onSubmit = async (input: string) => {
    setLoading(true);
    await assistantRef.current?.chat(true, input);
    setLoading(false);
  };

  return (
    <div className={styles.assistantContainer} ref={containerRef}>
      {!!assistantRef.current && <Messages messages={messages ?? []} />}
      <AssistantInput loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default AssistantScreen;
