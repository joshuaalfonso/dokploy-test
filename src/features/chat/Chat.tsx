
import { Flex} from "@chakra-ui/react"
import ChatInbox from "./components/ChatInbox"

// import ChatSidebar from "./components/chat-sidebar/ChatSidebar";
// import { Outlet } from "react-router-dom";


const Chat = () => {

    return (
        
        <>
        
            <Flex 
                gap={8} 
                // borderWidth={'1px'}
                rounded={'md'}
                height={'85vh'}
            >

                {/* <ChatSidebar /> */}

                <ChatInbox />

                {/* <Outlet /> */}

            </Flex>
        
        </>


    )


}

export default Chat