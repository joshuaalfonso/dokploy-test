// import { useProjectParams } from "../hooks/useProjectParams"









// const ProjectPagination = () => {

//     const {  } = useProjectParams


//     return (
//         <div className="flex items-center justify-end gap-4! mt-6!">

//             <Text fontSize={'sm'} color={'fg.muted'}>
//                 page { data.page } of { data.totalPages }
//             </Text>

//             <Button
//                 variant={'ghost'}
//                 size={'sm'}
//                 onClick={() => {
//                     setFilters({
//                         page: data?.page - 1
//                     })
//                 }}
//                 disabled={data.page == 1}
//             >
//                 <LuChevronLeft />
//             </Button>
//             <Button
//                 variant={'ghost'}
//                 size={'sm'}
//                 onClick={() => {
//                     setFilters({
//                         page: data?.page + 1
//                     })
//                 }}
//                 disabled={data.page == data.totalPages}
//             >
//                 <LuChevronRight />
//             </Button>
//         </div>
//     )
// }

// export default ProjectPagination