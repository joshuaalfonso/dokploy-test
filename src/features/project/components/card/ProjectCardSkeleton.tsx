import { Separator, Skeleton, SkeletonCircle } from "@chakra-ui/react"




const ProjectCardSkeleton = () => {

    return (

        <ul className="grid! grid-cols-[repeat(auto-fill,minmax(300px,1fr))]! gap-4">

            {Array.from({ length: 10 }).map((_, i) => (

                <li 
                    className="
                        border! rounded-md px-6! py-4! space-y-2! 
                        hover:shadow-(--chakra-shadows-sm) 
                        transition-all duration-200 ease-out
                    " 
                    key={i}
                >

                    <div className="flex justify-between items-center">
                        <Skeleton width={30} height="20px" />
                        <Skeleton width={70} height="20px" />
                    </div>

                    <div>
                        <Skeleton width={100} height="24px" mb={1} />
                        <Skeleton width={200} height="20px" />
                    </div>

                    <div className="py-2!">
                        <Separator  />
                    </div>

                    <div className="flex items-center gap-4">

                        <Skeleton width={50} height="20px" />

                        <div className="flex-1!">
                            <Skeleton width={100} height="20px" />
                        </div>

                        <SkeletonCircle size="32px" />

                    </div>

                </li>

            ))}

        </ul>
        
    )
}

export default ProjectCardSkeleton