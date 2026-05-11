import { useQuery } from "@tanstack/react-query";
import { getProjectByWorkspaceApi } from "../project.api";
import { useParams } from "react-router-dom";


// export const useProjectByUser = () => {

//     const user_id = useAuthStore((state) => state.user?.user_id);


//     const { data: user_project, isPending, error } = useQuery({
//         queryKey: ['projects', workspace_id, user_id],
//         queryFn: () => getProjectByUserApi(user_id!),
//         enabled: !!user_id
//     })

//     return { user_project, isPending, error }

// }

export const useProjectByWorkspace = () => {

    const { workspace_id } = useParams();

    const { data: user_project, isPending, error } = useQuery({
        queryKey: ['projects', workspace_id],
        queryFn: () => getProjectByWorkspaceApi(Number(workspace_id!)),
        enabled: !!workspace_id
    })

    return { user_project, isPending, error }


}