import CreatedMemes from "@/components/user/details/CreatedMemes";
import UserBaseInfo from "@/components/user/details/UserBaseInfo";
// import UserTabs from "@/components/user/details/UserTabs";

export default function UserDetails({
  params,
}: {
  params: {
    addr: string;
  };
}) {
  const addr = params.addr;
  return (
    <div className="flex flex-row justify-center items-start gap-6 max-sm:flex-col max-sm:gap-3">
      <div className="w-[30%] max-sm:w-full">
        <UserBaseInfo address={addr} />
      </div>
      <div className="flex-1 max-sm:w-full">
        <h2 className="font-bold text-4xl text-primary">Created Memes</h2>
        <CreatedMemes address={addr} />
        {/* <UserTabs address={addr} /> */}
      </div>
    </div>
  );
}
