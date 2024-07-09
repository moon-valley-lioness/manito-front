import useManitoGroupListQuery from "@/manito_group/hooks/query/useManitoGroupListQuery";
import { GroupStatus } from "@/manito_group/model";
import EndedGroupCard from "../Card/EndedGroupCard";

const EndedGroupList = ({ active }: { active: boolean }) => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery(
    GroupStatus.ENDED
  );
  return (
    <section className="px-4" style={{ display: active ? "block" : "none" }}>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <EndedGroupCard key={g.id} group={g} />
        ))}
      </ul>
    </section>
  );
};

export default EndedGroupList;
