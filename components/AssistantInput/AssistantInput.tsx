import React, { MouseEventHandler, useState } from 'react';
import cls from 'classnames';

import styles from './AssistantInput.module.scss';
import ColoredIcon, { ICON_COLOR } from '@components/ColoredIcon/ColoredIcon';
import SendIcon from '@icons/send_icon.svg';

type AssistantInputProps = {
  loading: boolean;
  onSubmit: (input: string) => void;
};

const AssistantInput = ({ loading, onSubmit }: AssistantInputProps) => {
  const [userInput, setUserInput] = useState('');

  const handleUserInputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLDivElement> = async () => {
    if (loading || !userInput.length) return;
    onSubmit(userInput);
    setUserInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (loading || e.key !== 'Enter') return;
    handleSubmit(e as any);
  };

  return (
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
      <div onClick={handleSubmit} className={cls(styles.buttonContainer, userInput?.length ? '' : styles.disabled)}>
        {loading ? (
          <div className={styles.loader} />
        ) : (
          <ColoredIcon
            icon={SendIcon}
            size={24}
            color={userInput?.length ? ICON_COLOR.primary : ICON_COLOR.lightGrey}
          />
        )}
      </div>
    </div>
  );
};

export default AssistantInput;
