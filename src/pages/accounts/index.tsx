import { UsersTable } from "@/components/molecules/UsersTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function index() {
  return (
    <div className="space-y-4">
      <Link href="/accounts/register" className="flex justify-end">
        <Button>Registrar Usuario</Button>
      </Link>
      <UsersTable />
    </div>
  );
}
