// import { LuMessageCircleQuestion } from "react-icons/lu"


const ChatEmpty = () => {
    return (
        <div className="grid place-items-center h-full w-full">


            <div className="flex flex-col justify-center items-center gap-4">
                {/* <LuMessageCircleQuestion size={40} /> */}
                <h1 className="text-(--chakra-colors-fg-muted) text-center">
                    Yo haven't open any message yet, <br /> please select a message
                </h1>
            </div>

        </div>
    )
}

export default ChatEmpty