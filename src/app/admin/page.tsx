import RevokeFreezeAuth from "@/components/RevokeFreezeAuth";
import ChangePoolStatus from "@/components/admin/ChangePoolStatus";
import CreatePools from "@/components/admin/CreatePools";

export default function AdminPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center py-24 px-2 xs:px-8 md:px-24 gap-6">
      <h1>Admin Page</h1>
      <RevokeFreezeAuth />
      <CreatePools />
      <ChangePoolStatus />
    </main>
  );
}
