
import { EmptyState, VStack } from "@chakra-ui/react"
import { LuFolderArchive } from "react-icons/lu"





const Empty = () => {
    return (
        <>
        
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                    <LuFolderArchive />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>List is empty</EmptyState.Title>
                        <EmptyState.Description>
                            Add item to get started
                    </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        
        </>
    )
}

export default Empty