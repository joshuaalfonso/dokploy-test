import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import { useWorkspaceByUser } from "@/features/workspace/hooks/useWorkspace"
import { Button, createListCollection, Listbox, Popover, Portal, Separator, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const SwitchWorkspace = () => {

    const [open, setOpen] = useState(false)

    const user = useAuthStore((store) => store.user);

    const navigate = useNavigate();

    const defaultStore = user ? user.default_workspace : null;

    const { user_workspaces, isPending, error } = useWorkspaceByUser();

    const collections = createListCollection({
        items: user_workspaces ?? [],
        itemToValue: (item) => String(item.workspace_id)
    })

    const [selectedWorkspace, setSelectedWorkspace] = useState<string[]>([String(defaultStore)]);

    const activeWorkspace = user_workspaces?.find(
        (ws) => String(ws.workspace_id) === selectedWorkspace[0]
    );


    if (isPending) return <>Loading...</>;
    if (error) return <>Failed to load</>

    return (
        <Popover.Root  
            lazyMount 
            unmountOnExit 
            positioning={{ placement: "bottom-start" }}
            open={open} onOpenChange={(e) => setOpen(e.open)}
        >
            <Popover.Trigger asChild>
                <Button size={'xs'} variant={'plain'} px={0}>
                    <h1 className='text-sm! text-(--chakra-colors-fg-muted)!'>
                        {activeWorkspace?.workspace_name ?? "Select workspace"}
                    </h1>
                    <LuChevronDown />
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                <Popover.Content >
                    <Popover.Body spaceY={4}>

                        <Text color={'fg.muted'}>Workspaces</Text>

                        <Listbox.Root 
                            collection={collections} 
                            value={selectedWorkspace}
                            width="full" 
                            variant={'plain'}
                            onValueChange={(details) => {
                                const newWorkspaceId = details.value[0];
                                setSelectedWorkspace(details.value);

                                navigate(`/workspace/${newWorkspaceId}/dashboard`);
                                setOpen(false)
                            }}
                            p={0}
                        >
                            <Listbox.Content p={0} maxH="200px" scrollbar={'hidden'}>
                                {collections.items.map((space) => (
                                <Listbox.Item item={space} key={space.workspace_id} px={0}>
                                    <Listbox.ItemText>{space.workspace_name}</Listbox.ItemText>
                                    <Listbox.ItemIndicator />
                                </Listbox.Item>
                                ))}
                            </Listbox.Content>
                        </Listbox.Root>

                        <Separator />

                        <Button 
                            size={'xs'}
                            variant={'ghost'}
                            color={'fg.muted'}
                        >
                            <LuPlus />
                            Add workspace
                        </Button>

                    </Popover.Body>
                </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )

}

export default SwitchWorkspace














// const mockWorkspaces: Workspace[] = [
//   {
//     "workspace_id": 1,
//     "workspace_name": "Lebron James's Workspace",
//     "description": null,
//     "owner_id": 1,
//     "created_at": "2026-04-25T13:48:33.000Z",
//     "role": "owner"
//   },
//   {
//     "workspace_id": 2,
//     "workspace_name": "Marketing Team Hub",
//     "description": "Workspace for marketing campaigns and strategies",
//     "owner_id": 2,
//     "created_at": "2026-04-20T09:15:12.000Z",
//     "role": "admin"
//   },
//   {
//     "workspace_id": 3,
//     "workspace_name": "Development Squad",
//     "description": "All dev-related tasks and sprint planning",
//     "owner_id": 3,
//     "created_at": "2026-04-18T11:22:45.000Z",
//     "role": "member"
//   },
//   {
//     "workspace_id": 4,
//     "workspace_name": "Design Studio",
//     "description": "UI/UX design collaboration space",
//     "owner_id": 4,
//     "created_at": "2026-04-15T14:05:30.000Z",
//     "role": "owner"
//   },
//   {
//     "workspace_id": 5,
//     "workspace_name": "HR Operations",
//     "description": "Employee management and HR tasks",
//     "owner_id": 5,
//     "created_at": "2026-04-10T08:30:00.000Z",
//     "role": "admin"
//   },
//   {
//     "workspace_id": 6,
//     "workspace_name": "Finance Tracker",
//     "description": "Budgeting and financial reports",
//     "owner_id": 6,
//     "created_at": "2026-04-08T16:45:10.000Z",
//     "role": "member"
//   },
//   {
//     "workspace_id": 7,
//     "workspace_name": "Startup Project Alpha",
//     "description": "Initial phase of startup development",
//     "owner_id": 7,
//     "created_at": "2026-04-05T12:00:00.000Z",
//     "role": "owner"
//   },
//   {
//     "workspace_id": 8,
//     "workspace_name": "Customer Support Desk",
//     "description": "Handling customer queries and tickets",
//     "owner_id": 8,
//     "created_at": "2026-04-03T10:10:10.000Z",
//     "role": "member"
//   },
//   {
//     "workspace_id": 9,
//     "workspace_name": "Content Creators",
//     "description": "Blogging, video, and social content creation",
//     "owner_id": 9,
//     "created_at": "2026-04-01T09:00:00.000Z",
//     "role": "admin"
//   },
//   {
//     "workspace_id": 10,
//     "workspace_name": "QA Testing Lab",
//     "description": "Quality assurance and bug tracking",
//     "owner_id": 10,
//     "created_at": "2026-03-28T15:20:25.000Z",
//     "role": "member"
//   }
// ]