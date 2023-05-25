import { DeserializedManitoGroup, GroupStatus } from '@/manito_group/model';
import Chatting from './Chatting';
import useGetChatOpponents from '@/manito_group/hooks/useGetChatOpponents';
import ChatOpponent from './ChatOpponent';

export default function EndedGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const chatOpponents = useGetChatOpponents(groupData.id);

  return (
    <div className='grid grid-cols-4 border-b-2 h-full'>
      <section className='col-span-1 border-r-2'>
        {chatOpponents && (
          <ul>
            <ChatOpponent chatId={chatOpponents.manitoChatId} type='manito' />
            <ChatOpponent chatId={chatOpponents.maniteeChatId} type='manitee' />
          </ul>
        )}
      </section>
      <section className='col-span-3 max-h-full overflow-hidden'>
        <Chatting status={GroupStatus.ENDED} />
      </section>
    </div>
  );
}
