import Loading from "@/components/Loading";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-start mt-[20%]">
      <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
    </div>
  );
}
