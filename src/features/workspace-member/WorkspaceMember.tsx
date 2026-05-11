import { useWorkspaceMember } from "./hooks/useWorkspaceMember"




const WorkspaceMember = () => {


    const { workspaceMembers, isPending, error } = useWorkspaceMember();

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Failed to load workspace member</p>;

    console.log(workspaceMembers)

    return (
        <div>WorkspaceMember</div>
    )
}

export default WorkspaceMember