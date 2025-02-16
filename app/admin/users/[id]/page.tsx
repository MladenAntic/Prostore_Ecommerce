import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateUserForm } from "./UpdateUserForm";

export const metadata: Metadata = {
  title: "Update User",
};

export default async function AdminUserUpdatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
}
