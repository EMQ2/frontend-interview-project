import { NumberInput } from "@carbon/react"
import type { Meta, StoryObj } from "@storybook/react"
import "./globals.scss"

const meta: Meta<typeof NumberInput> = {
  title: "component/NumberInput",
  component: NumberInput,
  render: ({ ...args }) => <NumberInput {...args}></NumberInput>,
}
export default meta

type Story = StoryObj<typeof NumberInput>

export const PrimaryNumberInput: Story = {
  args: { placeholder: "Enter a Number here" },
}
