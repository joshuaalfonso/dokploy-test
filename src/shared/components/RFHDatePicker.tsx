import { Controller, type Control, type Path, type FieldValues  } from "react-hook-form"
import { DatePicker, Field, Portal, parseDate } from "@chakra-ui/react" // or your portal import

import { LuCalendar } from "react-icons/lu"

type RHFDatePickerProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  error?: string
  placeholder?: string
  maxWidth?: string
}

export function RHFDatePicker<T extends FieldValues>({
  name,
  control,
//   label = "Date",
  error,
  placeholder,
//   maxWidth = "20rem",
}: RHFDatePickerProps<T>) {



    return (
        <Field.Root invalid={!!error} >
            {/* {label && <Field.Label>{label}</Field.Label>} */}

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <DatePicker.Root
                            openOnClick 
                            value={field.value ? [parseDate(field.value)] : []}
                            onValueChange={(e) =>
                                field.onChange(e.value[0]?.toString() ?? "")
                            }
                        >
                            <DatePicker.Control>
                                <DatePicker.Input placeholder={placeholder} />
                                <DatePicker.IndicatorGroup>
                                <DatePicker.Trigger>
                                    <LuCalendar />
                                </DatePicker.Trigger>
                                </DatePicker.IndicatorGroup>
                            </DatePicker.Control>

                            <Portal>
                                <DatePicker.Positioner>
                                <DatePicker.Content>
                                    <DatePicker.View view="day">
                                    <DatePicker.Header />
                                    <DatePicker.DayTable />
                                    </DatePicker.View>

                                    <DatePicker.View view="month">
                                    <DatePicker.Header />
                                    <DatePicker.MonthTable />
                                    </DatePicker.View>

                                    <DatePicker.View view="year">
                                    <DatePicker.Header />
                                    <DatePicker.YearTable />
                                    </DatePicker.View>
                                </DatePicker.Content>
                                </DatePicker.Positioner>
                            </Portal>
                        </DatePicker.Root>
                    )
                }}
            />

            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    )
}