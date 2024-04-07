import Button from "../components/Button"
import type { Meta, StoryObj } from "@storybook/react"
import "./globals.scss"

const meta: Meta<typeof Button> = {
  title: "component/Button",
  component: Button,
  render: ({ text, ...args }) => <Button {...args} text="Button" />,
}
export default meta

type Story = StoryObj<typeof Button>

export const PrimaryButton: Story = {
  args: { backgroundColor: "#5E9AFE", color: "white" },
}

export const CancelButton: Story = {
  args: {
    backgroundColor: "#B3B3B3",
  },
}
