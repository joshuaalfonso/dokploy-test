
// RHFSelect.tsx
import {
  Select,
  Portal,
  Field,
  createListCollection
} from "@chakra-ui/react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

type Option = {
  label: string
  value: string
}

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  options: Option[]
  placeholder?: string
  error?: string
}

export function RHFSelect<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select",
  error,
}: RHFSelectProps<T>) {

    const collection = createListCollection({
        items: options,
    })

  return (
    <Field.Root invalid={!!error}>
      <Controller
        name={name}
        control={control}
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
                      {option.label}
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