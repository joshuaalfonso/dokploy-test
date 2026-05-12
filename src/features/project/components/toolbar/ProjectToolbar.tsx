import { Button, Input, Menu, Portal } from '@chakra-ui/react';
import { useProjectParams } from '../../hooks/useProjectParams';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/debounce';
import { LuFilter } from 'react-icons/lu';
import { projectStatus } from '@/shared/data/projectStatus';

const ProjectToolbar = () => {

    const { setFilters } = useProjectParams();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setFilters({ search: debouncedSearch, page: 1 });
    }, [debouncedSearch]);

    return (
        <div className="flex items-center justify-start gap-3! mb-6!">
            <Input
                w={250}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
            />
            <Menu.Root lazyMount>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="md">
                    <LuFilter />
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item 
                            value="all" 
                            onClick={() => setFilters({ status: '' })}
                        >
                            All
                        </Menu.Item>
                        {projectStatus.map(item => (
                            <Menu.Item 
                                value={item.value} 
                                onClick={() => setFilters({ status: item.value, page: 1 })}
                                key={item.value}
                            >
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </div>
    );
};

export default ProjectToolbar;