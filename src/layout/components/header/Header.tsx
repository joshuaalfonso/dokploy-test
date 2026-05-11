




import { useAuthStore } from '@/auth-layout/store/useAuthStore'
import { ColorModeButton } from '@/components/ui/color-mode'
import SwitchWorkspace from '@/features/workspace/components/SwitchWorkspace'
import { IconButton } from '@chakra-ui/react'
import { LuLogOut } from 'react-icons/lu'

const Header = () => {

    // const user = useAuthStore(store => store.user);
    const logout = useAuthStore(store => store.logout);

    return (
        <header className="sticky top-0 left-0 w-full px-8! md:px-16! h-13.5 border-b! bg-(--chakra-colors-bg)">
            <div className="flex items-center justify-between gap-3 w-full! h-full">

                <SwitchWorkspace />
                
                <div className='flex items-center gap-3'>
                    {/* <h1 className='text-base! text-(--chakra-colors-fg-muted)!'>{ user?.full_name }</h1> */}
                    <ColorModeButton />
                    <IconButton 
                        size={'sm'} 
                        variant={'ghost'}
                        color={'fg.muted'}
                    >
                        <LuLogOut onClick={logout} />
                    </IconButton>
                </div>

            </div>
        </header>
    )
}

export default Header