import OpenAI from 'openai';
import MsgSend from './transactions/msgSend';
import MsgDelegate from './transactions/msgDelegate';
import MsgUndelegate from './transactions/msgUndelegate';
import MsgBeginRedelegate from './transactions/msgBeginRedelegate';
import { WALLET } from 'types/wallet';
import { KEPLR_CHAIN_INFO_TYPE } from 'types/chain';
import { ASSISTANT_FUNCTIONS } from '@constants/assistant';

const openai = new OpenAI({
  organization: 'org-4ojr9mehSQnqnvnOmRzjg4JW',
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

export async function callChatGPTWithFunctions(
  assistantMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  userAddress: string,
  { wallet, chainInfo }: { wallet: WALLET; chainInfo: KEPLR_CHAIN_INFO_TYPE },
) {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = JSON.parse(JSON.stringify(assistantMessages));
  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages,
    functions: ASSISTANT_FUNCTIONS,
    function_call: 'auto',
  });

  // let wantsToUseFunction = chat.data.choices[0].finish_reason;
  let wantsToUseFunction = chat.choices[0].finish_reason === 'function_call';
  let content = '';

  if (wantsToUseFunction) {
    let argumentObj = JSON.parse(chat.choices[0].message?.function_call?.arguments ?? '{}');
    switch (chat.choices[0].message?.function_call?.name) {
      case 'msgSend':
        content = await MsgSend(argumentObj.amount, argumentObj.denom, argumentObj.toAddress, { wallet, chainInfo });
        messages.push(chat.choices[0].message);
        messages.push({
          role: 'function',
          name: 'msgSend',
          content,
        });
        break;
      case 'msgDelegate':
        content = await MsgDelegate(argumentObj.amount, argumentObj.denom, argumentObj.validatorAddress, {
          wallet,
          chainInfo,
        });
        messages.push(chat.choices[0].message);
        messages.push({
          role: 'function',
          name: 'msgDelegate',
          content,
        });
        break;
      case 'msgUndelegate':
        content = await MsgUndelegate(argumentObj.amount, argumentObj.denom, argumentObj.validatorAddress, {
          wallet,
          chainInfo,
        });
        messages.push(chat.choices[0].message);
        messages.push({
          role: 'function',
          name: 'msgUndelegate',
          content,
        });
        break;
      case 'msgBeginRedelegate':
        content = await MsgBeginRedelegate(
          argumentObj.amount,
          argumentObj.denom,
          argumentObj.fromValidatorAddress,
          argumentObj.toValidatorAddress,
          {
            wallet,
            chainInfo,
          },
        );
        messages.push(chat.choices[0].message);
        messages.push({
          role: 'function',
          name: 'msgBeginRedelegate',
          content,
        });
        break;
      default:
        content = "Sorry, I don't know how to do that yet.";
        messages.push(chat.choices[0].message);
        messages.push({
          role: 'function',
          name: 'msgUnknown',
          content,
        });
    }
  }

  // console.log(messages);
  let step4Response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages,
  });

  return step4Response.choices[0].message;
}
