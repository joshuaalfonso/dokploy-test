import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useProjectDialogStore } from "./store/projectDialogStore"
import ProjectDialog from "./components/dialog/ProjectDialog";



const Project = () => {

    const setOpen  = useProjectDialogStore(state => state.setCreateModalOpen);
    const open  = useProjectDialogStore(state => state.isCreateModalOpen);

    console.log(open)

    return (
        <>
            
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={10}>
                <Stack>
                    <Heading>
                        Project
                    </Heading>
                    <Text fontSize={'sm'} color={'fg.muted'}>List of all project for this workspace</Text>
                </Stack>
                <Button onClick={() => setOpen(true)}>Create</Button>
            </Flex>

            <ul className="grid! grid-cols-[repeat(auto-fill,minmax(300px,1fr))]! gap-4">

                <li className="border! rounded-md px-6! py-4!">
                    <h1 className="font-sm! font-medium! mb-1!">Title</h1>
                    <p className="text-sm! text-(--chakra-colors-fg-muted)!">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </li>
                <li className="border! rounded-md px-6! py-4!">
                    <h1 className="font-sm! font-medium! mb-1!">Title</h1>
                    <p className="text-sm! text-(--chakra-colors-fg-muted)!">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </li>
                <li className="border! rounded-md px-6! py-4!">
                    <h1 className="font-sm! font-medium! mb-1!">Title</h1>
                    <p className="text-sm! text-(--chakra-colors-fg-muted)!">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </li>
                <li className="border! rounded-md px-6! py-4!">
                    <h1 className="font-sm! font-medium! mb-1!">Title</h1>
                    <p className="text-sm! text-(--chakra-colors-fg-muted)!">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </li>

            </ul>

            <ProjectDialog />
        
        </>
    )
}

export default Project