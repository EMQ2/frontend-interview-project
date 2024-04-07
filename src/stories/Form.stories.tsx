import { Form, InlineNotification, Link, Stack, TextInput } from "@carbon/react"
import Button from "../components/Button"
import { PrimaryButton, CancelButton } from "./Button.stories"
import { PrimaryTextInput } from "./TextInput.stories"
import "./form.scss"
import { FormEvent, useState } from "react"

const EmailInputProps = {
  className: "email",
  id: "email",
  labelText: "Email",
  placeholder: "Enter your email address",
  invalidText: "Invalid email format",
}
const PasswordProps = {
  className: "password",
  id: "password",
  labelText: "Password",
  placeholder: "Enter your password",
  type: "password",
  invalidText:
    "Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.",
}
const MatchPasswordProps = {
  className: "password",
  id: "match-password",
  labelText: "Confirm Password",
  type: "password",
  autocomplete: "false",
  placeholder: "Enter your password",
  invalidText: "Passwords didn't match",
}

const NameInputProps = {
  className: "name",
  id: "name-input",
  labelText: "Name",
  placeholder: "Enter your name",
  invalidText: "Only alphabets are allowed",
}

const MobileInputProps = {
  className: "mobile",
  id: "mobile-input",
  labelText: "Mobile Number",
  placeholder: "Enter your mobile number",
  invalidText: "Only numbers are allowed",
}

const NotificationProps = {
  className: "notification",
  id: "notification",
  hideCloseButton: true,
  title: "Sign Up Successful!",
}

export default {
  title: "form/SignUp",
  component: Form,
}

interface FormState {
  email: string
  password: string
  confirmPassword: string
  name: string
  mobile: string
}

const InitialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  mobile: "",
}

interface ErrorState {
  email: boolean
  password: boolean
  confirmPassword: boolean
  name: boolean
  mobile: boolean
}

const InitialErrorState = {
  email: false,
  password: false,
  confirmPassword: false,
  name: false,
  mobile: false,
}

// matches at least 6 characters with at least 1 upper case, 1 lower case and 1 number
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
// matches email addresses with @ and .
const emailPattern = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/
// matches only numbers, for mobile
const numberPattern = /^[0-9]*$/
//matches only alphabets, for name
const alphabetPattern = /^[A-Za-z]+$/

export const Default = () => {
  const [formState, setFormState] = useState<FormState>(InitialFormState)
  const [errorState, setErrorState] = useState<ErrorState>(InitialErrorState)
  const [success, setSuccess] = useState(false)

  // set state for respective input fields. If the field already has an error, check if the error still exists, if not, remove it
  const onChange = (event: any, type: string) => {
    setFormState((prev) => {
      return { ...prev, [type]: event.target.value }
    })
    if (errorState[type as keyof ErrorState]) {
      if (!checkError(type)) {
        setErrorState((prev) => {
          return {
            ...prev,
            [type]: false,
          }
        })
      }
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // check all fields
    checkError("email")
    checkError("password")
    checkError("confirmPassword")
    checkError("name")
    checkError("mobile")

    // if any field has an error, state remains false, if no errors set succes to true
    if (
      checkError("email") ||
      checkError("password") ||
      checkError("confirmPassword") ||
      checkError("name") ||
      checkError("mobile")
    ) {
      setSuccess(false)
    } else {
      setSuccess(true)
    }
  }

  const handleCancel = () => {
    setFormState(InitialFormState)
    setErrorState(InitialErrorState)
  }

  const checkError = (type: string) => {
    // for the field defined, check against validations for errors
    if (type === "password") {
      if (!passwordPattern.test(formState.password) || !formState.password) {
        setErrorState((prev) => {
          return {
            ...prev,
            password: true,
          }
        })
        return true
      }
      return false
    }
    if (type === "confirmPassword") {
      if (
        formState.password !== formState.confirmPassword ||
        !formState.confirmPassword
      ) {
        setErrorState((prev) => {
          return {
            ...prev,
            confirmPassword: true,
          }
        })
        return true
      }
      return false
    }
    if (type === "email") {
      if (!emailPattern.test(formState.email) || !formState.email) {
        setErrorState((prev) => {
          return {
            ...prev,
            email: true,
          }
        })
        return true
      }
      return false
    }
    if (type === "name") {
      if (!alphabetPattern.test(formState.name) || !formState.name) {
        setErrorState((prev) => {
          return {
            ...prev,
            name: true,
          }
        })
        return true
      }
      return false
    }
    if (type === "mobile") {
      if (!numberPattern.test(formState.mobile) || !formState.mobile) {
        setErrorState((prev) => {
          return {
            ...prev,
            mobile: true,
          }
        })
        return true
      }
      return false
    }
  }

  return (
    <main>
      <div className="form">
        <h3 className="title">Sign Up</h3>
        <p className="login-cta">
          Already have an account? <Link className="link">Login</Link>
        </p>
        <Form
          aria-label="sign up form"
          onSubmit={handleSubmit}
          onReset={handleCancel}
        >
          <Stack gap={6}>
            {success && (
              <InlineNotification {...NotificationProps} kind="success" />
            )}
            <TextInput
              {...EmailInputProps}
              value={formState.email}
              onChange={(e) => onChange(e, "email")}
              invalid={errorState.email}
            />
            <TextInput
              {...PasswordProps}
              value={formState.password}
              onChange={(e) => onChange(e, "password")}
              invalid={errorState.password}
            />
            <TextInput
              {...MatchPasswordProps}
              value={formState.confirmPassword}
              onChange={(e) => onChange(e, "confirmPassword")}
              invalid={errorState.confirmPassword}
            />

            <TextInput
              {...PrimaryTextInput.args}
              {...NameInputProps}
              onChange={(e) => onChange(e, "name")}
              invalid={errorState.name}
            />

            <TextInput
              {...PrimaryTextInput.args}
              {...MobileInputProps}
              onChange={(e) => onChange(e, "mobile")}
              invalid={errorState.mobile}
            />

            <div className="action">
              <Button
                {...CancelButton.args}
                text="Cancel"
                type="reset"
                width="12rem"
              />
              <Button
                {...PrimaryButton.args}
                text="Sign Up"
                type="submit"
                width="12rem"
              />
            </div>
          </Stack>
        </Form>
      </div>
    </main>
  )
}
