"use client";
import { Issus, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast,{Toast, Toaster} from 'react-hot-toast'


const AssignementSelect = ({ issue }: { issue: Issus }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
    <Select.Root
    defaultValue={issue.assigneToUserId || 'Unassigned'}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, { assigneToUserId: userId === "Unassigned"? null: userId }).catch(()=>{
          toast.error('Change could not be saved.')
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="Unassigned">Unassigned</Select.Item>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  );
};

export default AssignementSelect;
