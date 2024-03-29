import React, { useState } from "react";
import MessageList from "../common/MessageList";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./UserForm.css";

/** Form with customizable prompts and submit.
 *
 * State:
 * - formData: object of form input name: value pairs
 *    -messages: Array of string error messages to display
 *
 * Props:
 * - prompts: an array of objects as prompts for inputs
 *            { label, name }
 * - submit:  function called upon submit
 *
 * { LoginPage, SignupPage } -> UserForm
 */

function UserForm({ prompts, submit }) {
  let initialFormState = { messages: [] };

  for (let prompt of prompts) {
    initialFormState[prompt.name] = '';
  }

  const [formData, setFormData] = useState(initialFormState);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("in handleSubmit");
    const errors = generateInputErrors(); // [errors, ...] []

    // Check for input errors (i.e. empty input)
    if (errors.length > 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        messages: errors
      }));

      return;
    }

    try {
      await submit(formData);
    } catch (err) {
      setFormData(prevFormData => ({
        ...prevFormData,
        messages: err.map(e => ({ text: e, style: 'danger' }))
      }));

      return;
    }

    setFormData(initialFormState);
  }

  /** Check for empty inputs and generate a list of error messages */
  function generateInputErrors() {
    const errors = prompts
      .filter(prompt => formData[prompt.name] === '')
      .map(prompt => ({
        text: `${prompt.label} is a required input.`,
        style: 'danger'
      }));
    return errors;
  }

  return (
      <>
        <Form className="UserForm py-2 mb-2" onSubmit={handleSubmit}>
          {prompts.map((p, i) => (
            <Form.Group className='mb-3' key={i}>
              <Form.Label htmlFor={p.name}>{p.label}</Form.Label>
              <Form.Control
                id={p.name}
                name={p.name}
                onChange={handleChange}
                value={formData[p.name]}
                type={p.name === 'password' ? 'password' : 'text'}
              />
            </Form.Group>
          ))}
          <Button
            className='UserFormButton text-dark'
            variant="light"
            type="submit"
          >
            Submit
          </Button>
        </Form>
        <MessageList messages={formData.messages} />
      </>
  );
}

export default UserForm;
