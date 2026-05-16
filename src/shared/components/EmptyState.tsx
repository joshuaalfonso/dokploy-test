import {
  ButtonGroup,
  EmptyState,
  VStack,
} from "@chakra-ui/react"
import type React from "react"
import { LuFolderArchive } from "react-icons/lu"


type EmptyProps = {
  title?: string
  description?: string
  buttons?: React.ReactNode
}

const Empty = ({
  title = "List is empty",
  description = "Add item to get started",
  buttons,
}: EmptyProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuFolderArchive />
        </EmptyState.Indicator>

        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>

          <EmptyState.Description>
            {description}
          </EmptyState.Description>

          {buttons && (
            <ButtonGroup>
              {buttons}
            </ButtonGroup>
          )}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default Empty