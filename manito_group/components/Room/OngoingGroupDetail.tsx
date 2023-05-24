import useChatOpponentQuery from '@/manito_group/hooks/query/useChatOpponentQuery';
import { DeserializedManitoGroup } from '@/manito_group/model';

export default function OngoingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const { data, isLoading, isError } = useChatOpponentQuery(groupData.id);

  const handleOpponentSelect = (opponentId: number) => {};
  return (
    <div className='flex-auto grid grid-cols-4 h-full border-b-2'>
      <section className='col-span-1 border-r-2'>
        {data && (
          <ul>
            <ChatOpponent
              opponentId={data.manitoId}
              type='manito'
              onSelect={handleOpponentSelect}
            />
            <ChatOpponent
              opponentId={data.maniteeId}
              type='manitee'
              onSelect={handleOpponentSelect}
            />
          </ul>
        )}
      </section>
      <section className='col-span-3'></section>
    </div>
  );
}

function ChatOpponent({
  opponentId,
  type,
  onSelect,
}: {
  opponentId: number;
  type: 'manito' | 'manitee';
  onSelect: (opponentId: number) => void;
}) {
  return (
    <li
      onClick={() => onSelect(opponentId)}
      className='h-14 border-b-2 flex justify-center items-center font-bold hover:bg-gray-400 hover:text-white hover:cursor-pointer'
    >
      <div>{type == 'manito' ? '내가 도와주는 사람' : '나를 도와주는 사람'}</div>
    </li>
  );
}
