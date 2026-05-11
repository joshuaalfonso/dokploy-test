import { useQuery } from "@tanstack/react-query";
import { getWorkspaceMemberApi } from "../workspaceMember.api"
import { useParams } from "react-router-dom";








export const useWorkspaceMember = () => {

    const { workspace_id } = useParams();

    const { data: workspaceMembers, isPending, error } = useQuery({
        queryKey: ['workspaceMembers', workspace_id],
        queryFn: () => getWorkspaceMemberApi(Number(workspace_id)),
        enabled: !!workspace_id
    })

    return { workspaceMembers, isPending, error }

}

