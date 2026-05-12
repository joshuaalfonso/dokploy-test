import { Button, Input, Menu, Portal } from '@chakra-ui/react';
import { useProjectParams, type SortOrder } from '../../hooks/useProjectParams';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/debounce';
import { LuFilter } from 'react-icons/lu';
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
        <div className="flex items-center justify-start gap-3! mb-6!">

            <Input
                w={250}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                size={'sm'}
            />

            <Menu.Root lazyMount>
                <Menu.Trigger asChild>
                    <Button variant={filters.status ? 'solid' : 'outline'} size="sm">
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

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant={filters.order === 'asc' ? 'solid' : 'outline'} size="sm">
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


        </div>
    );
};

export default ProjectToolbar;