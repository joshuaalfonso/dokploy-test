import { Button, Flex, Input, Menu, Portal } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"
import { useProjectTaskDialogStore } from "../../store/projectTaskStore"
import { taskStatus } from "@/shared/data/taskStatus";
import { useTaskParams } from "../../hooks/useTaskParams";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/debounce";



const ProjectTaskToolbar = () => {

    const { filters, setFilters } = useTaskParams();

    const [search, setSearch] = useState(filters.search || '');
    const debouncedSearch = useDebounce(search, 500) || undefined;

    const setOpen = useProjectTaskDialogStore(state => state.setCreateModalOpen);

    useEffect(() => {
        setSearch(filters.search ?? "");
    }, [filters.search]);

    useEffect(() => {
        if (debouncedSearch !== filters.search) {
            setFilters({
                search: debouncedSearch || undefined,
                page: 1,
            });
        }
    }, [debouncedSearch]);

    const statusOptions = [
        { label: "All", value: "" },
        ...taskStatus,
    ];

    return (
        
        <Flex mb={6} justifyContent={'space-between'}>

            <Flex gap={3}>

                <Input
                    w={250}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="task, description"
                    size={'sm'}
                />

                <Menu.Root lazyMount>
                    <Menu.Trigger asChild>
                        <Button 
                            color={filters.status ? '' : 'fg.muted'} 
                            variant={filters.status ? 'solid' : 'outline'} 
                            size="sm"
                            className="capitalize!"
                        >
                            { filters.status ? filters.status : 'Status' }
                            <LuChevronDown />
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.RadioItemGroup
                                    value={filters.status || ''} 
                                    onValueChange={(e) => setFilters({ status: e.value, page: 1 })}
                                >
                                    {statusOptions.map((item) => (
                                        <Menu.RadioItem 
                                            key={item.value} 
                                            value={item.value}
                                        >
                                            {item.label}
                                            <Menu.ItemIndicator />
                                        </Menu.RadioItem>
                                    ))}

                                </Menu.RadioItemGroup>
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

            </Flex>


            <Button
                size={'sm'}
                onClick={() => setOpen(true)}
            >
                Create Task
            </Button>

        </Flex>


    )
}

export default ProjectTaskToolbar