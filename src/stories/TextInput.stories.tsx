import { TextInput } from "@carbon/react"
import type { Meta, StoryObj } from "@storybook/react"
import "./globals.scss"

const meta: Meta<typeof TextInput> = {
  title: "component/TextInput",
  component: TextInput,
  render: ({ ...args }) => <TextInput {...args}></TextInput>,
}
export default meta

type Story = StoryObj<typeof TextInput>

export const PrimaryTextInput: Story = {
  args: { placeholder: "Enter some text here", type: "text" },
}

export const Password: Story = {
  args: { placeholder: "Enter some text here", type: "password" },
}
