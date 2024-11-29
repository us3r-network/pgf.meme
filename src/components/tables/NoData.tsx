export default function NoData() {
  return (
    <div className="w-full py-14 flex flex-col gap-4 items-center justify-center bg-white border-4 rounded-md border-primary">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-3xl font-bold">No Data Found 😟</p>
      <img
        src="/images/no-data.png"
        alt="no data"
        className="h-[250px] aspect-auto"
      />
    </div>
  );
}
