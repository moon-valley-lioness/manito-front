import { useEffect } from 'react';
import useChatHistoryQuery from './query/useChatHistoryQuery';
import useChatOpponentQuery from './query/useChatOpponentQuery';
import { useAtom } from 'jotai';
import { currentChatId } from '../state';

export default function useGetChatOpponents(groupId: number) {
  const { data: chatOpponents } = useChatOpponentQuery(groupId);
  // prefetch
  useChatHistoryQuery(chatOpponents?.manitoChatId);
  useChatHistoryQuery(chatOpponents?.maniteeChatId);

  const [chatId, setChatId] = useAtom(currentChatId);

  useEffect(() => {
    if (!chatOpponents) return;

    setChatId(chatOpponents.manitoChatId);
  }, [groupId, chatOpponents, setChatId]);

  return chatOpponents;
}
