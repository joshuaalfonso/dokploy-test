
// RHFSelect.tsx
import {
  Select,
  Portal,
  Field,
  createListCollection,
  Stack,
  Span
} from "@chakra-ui/react"
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form"

type Option = {
  label: string
  value: string
  description?: string
}

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  options: Option[]
  placeholder?: string
  error?: string
  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
}

export function RHFSelect<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select",
  error,
  rules,
  required
}: RHFSelectProps<T>) {

    const collection = createListCollection({
        items: options,
    })

  return (
    <Field.Root invalid={!!error} required={required}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select.Root
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={(details) => {
              field.onChange(details.value[0])
            }}
          >
            <Select.HiddenSelect />
            
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>

              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {options.map((option) => (
                    <Select.Item item={option} key={option.value}>
                       <Stack gap="0">
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Span color="fg.muted" textStyle="xs">
                          {option?.description}
                        </Span>
                      </Stack>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />

      {error && (
        <Field.ErrorText>
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
}