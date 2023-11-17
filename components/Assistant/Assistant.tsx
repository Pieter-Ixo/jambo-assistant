import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import cls from 'classnames';

import styles from './assistant.module.scss';
import { AssistantMessage } from 'types/assistant';
import { WalletContext } from '@contexts/wallet';
import { ChainContext } from '@contexts/chain';
import Oxi from 'assistant';
import { broadCastMessages } from '@utils/wallets';

const Assistant = () => {
  const { wallet } = useContext(WalletContext);
  const { chainInfo, queryClient } = useContext(ChainContext);
  const initialLoad = useRef(true);

  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const oxiRef: any = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!oxiRef.current)
      oxiRef.current = new Oxi({
        relayerUrl: 'http://localhost:3003',
        apiKey: 'Bearer xvz1evFS4wEEPTGEFPHBogjmb1evFS4wEEPTGEFPHBogwEEPTGEFPHBogjmb1evFS4',
        // whitelist: [MODULES.staking],
        user: {
          address: wallet.user!?.address ?? '',
          did: wallet.user!?.did ?? '',
        },
        signAndBroadcast: async (trx: any) => {
          const hash = await broadCastMessages(
            wallet,
            // [msg as unknown as TRX_MSG],
            trx,
            undefined,
            'average',
            'uixo',
            chainInfo!,
          );
          console.log('signAndBroadcast::hash', hash);
          return hash ? 'success' : 'error';
        },
        queryClient: queryClient,
      });
  }, []);

  useEffect(() => {
    if (oxiRef.current && oxiRef.current?.getUserAddress !== wallet.user?.address)
      oxiRef.current?.setUser({ name: wallet.user!?.name, address: wallet.user!?.address, did: wallet.user!?.did });
  }, [wallet.user]);

  useEffect(() => {
    if (oxiRef.current) oxiRef.current?.setQueryClient(queryClient);
  }, [queryClient]);

  useEffect(() => {
    if (oxiRef.current)
      oxiRef.current?.setSignAndBroadcast(async (trx: any) => {
        const hash = await broadCastMessages(
          wallet,
          // [msg as unknown as TRX_MSG],
          trx,
          undefined,
          'average',
          'uixo',
          chainInfo!,
        );
        console.log('signAndBroadcast::hash', hash);
        return hash ? 'success' : 'error';
      });
  }, [wallet, chainInfo]);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [oxiRef.current?.getMessages]);

  // useEffect(() => {
  //   console.log({
  //     messages: oxiRef.current?.getMessages,
  //     functions: oxiRef.current?.getWhitelistedFunctions,
  //     user: oxiRef.current?.getUser,
  //   });
  // }, [oxiRef.current?.getMessages, oxiRef.current?.getWhitelistedFunctions, oxiRef.current?.getUser]);

  const handleUserInputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    const input = userInput;
    console.log({ input });
    setUserInput('');
    setLoading(true);
    const chat = await oxiRef.current?.chat(input);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    onSubmit(e as any);
  };

  // const chat = async () => {
  //   try {
  //     const response = (await callChatGPTWithFunctions(messages, wallet.user!.address, {
  //       wallet,
  //       chainInfo,
  //     })) as unknown as AssistantMessage;
  //     console.log({ response });
  //     setMessages((prevState) => [...prevState, response]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('chat', error);
  //   }
  // };

  return (
    <div className={styles.assistantContainer} ref={containerRef}>
      <div className={styles.chatContainer}>
        {(oxiRef.current?.getMessages ?? []).map((message: any, index: number) => (
          <div
            key={index}
            className={cls(styles.messageContainer, message.role === 'user' ? styles.messageRight : styles.messageLeft)}
          >
            <span className={styles.message}>{message.content}</span>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={userInput}
          disabled={loading}
          id='user-input'
          placeholder='Ask oxi...'
          className={styles.assistantInput}
          onChange={handleUserInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSubmit} disabled={loading}>
          submit
        </button>
      </div>
    </div>
  );
};

export default Assistant;
