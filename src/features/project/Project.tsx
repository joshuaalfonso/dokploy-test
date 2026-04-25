import { Heading } from "@chakra-ui/react"







const Project = () => {
  return (
    <>
    
        <Heading size={'md'} mb={10}>
            Project
        </Heading>



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
    
    </>
  )
}

export default Project