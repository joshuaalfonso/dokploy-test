import { Button, Input, Menu, Portal, Stack, Tabs } from '@chakra-ui/react';
import { useProjectParams, type SortOrder, type ViewMode } from '../../hooks/useProjectParams';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/debounce';
import { LuFilter, LuGrid2X2, LuList } from 'react-icons/lu';
import { projectStatus } from '@/shared/data/projectStatus';
import { HiSortAscending } from "react-icons/hi";
import { sortOption } from '@/shared/data/sortOption';

const ProjectToolbar = () => {

    const { filters, setFilters } = useProjectParams();

    const [search, setSearch] = useState(filters.search || undefined);
    const debouncedSearch = useDebounce(search, 500) || undefined;

    useEffect(() => {
        if (debouncedSearch !== filters.search) {
            setFilters({
                search: debouncedSearch,
                page: 1,
            });
        }
    }, [debouncedSearch, filters.search, setFilters]);

    

    return (
        <div 
            className="flex items-center justify-between gap-3! mb-6!"
        >

            <Stack direction={'row'} gap={3}>

                <Input
                    w={250}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    size={'sm'}
                />

                <Menu.Root lazyMount>
                    <Menu.Trigger asChild>
                        <Button 
                            color={filters.status ? '' : 'fg.muted'} 
                            variant={filters.status ? 'solid' : 'outline'} 
                            size="sm"
                        >
                        <LuFilter />
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.RadioItemGroup
                                    value={filters.status || ''} 
                                    onValueChange={(e) => setFilters({ status: e.value, page: 1 })}
                                >


                                    {projectStatus.map((item) => (
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

                <Menu.Root lazyMount>
                    <Menu.Trigger asChild>
                        <Button 
                            color={filters.order === 'desc' ? 'fg.muted' : ''} 
                            variant={filters.order === 'asc' ? 'solid' : 'outline'} 
                            size="sm"
                        >
                            <HiSortAscending/> 
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content minW="10rem">
                            <Menu.RadioItemGroup
                                value={filters.order}
                                onValueChange={(e) => setFilters({order: e.value as SortOrder})}
                            >
                                {sortOption.map((item) => (
                                    <Menu.RadioItem key={item.value} value={item.value}>
                                        {item.label}
                                        <Menu.ItemIndicator />
                                    </Menu.RadioItem>
                                ))}
                            </Menu.RadioItemGroup>
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

            </Stack>

            <Tabs.Root 
                defaultValue={filters.view}
                variant="plain" 
                size={'sm'}
                onValueChange={(e) => setFilters({view: e.value as ViewMode})}
            >

                <Tabs.List bg="bg" rounded="l3">

                    <Tabs.Trigger 
                        value="card"
                        _selected={{
                            bg: "bg.inverted",
                            color: "fg.inverted",
                        }}
                    >
                        <LuGrid2X2 />
                    </Tabs.Trigger>

                    <Tabs.Trigger 
                        value="table"
                        _selected={{
                            bg: "bg.inverted",
                            color: "fg.inverted",
                        }}
                    >
                        <LuList />
                    </Tabs.Trigger>

                    <Tabs.Indicator rounded="l2" />

                </Tabs.List>
                {/* <Tabs.Content value="members">Manage your team members</Tabs.Content>
                <Tabs.Content value="projects">Manage your projects</Tabs.Content>
                <Tabs.Content value="tasks">
                    Manage your tasks for freelancers
                </Tabs.Content> */}
            </Tabs.Root>


        </div>
    );
};

export default ProjectToolbar;