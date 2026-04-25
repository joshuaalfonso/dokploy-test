import { Box, Heading } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"




const AuthLayout = () => {
  return (
    <div className="grid md:grid-cols-2">

      <Box 
        bg={'bg.muted'} 
        borderWidth="1px"
        borderColor="border.disabled"
        p={10}
        display={'none'} 
        md={{display: 'block'}}
      >
        <Heading>
          Strive
        </Heading>
      </Box>

      <Box
        px={6}
      >
        <Outlet />
      </Box>

    </div>
  )
}

export default AuthLayout