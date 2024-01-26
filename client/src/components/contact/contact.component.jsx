import React, { useEffect, useState } from "react";

import {
  ContactAvatar,
  ContactContainer,
  ContactForm,
  ContactHeader,
  FormButton,
  FormInput,
  FormTextarea,
} from "./contact.styles";

import { toast } from "react-toastify";

const Contact = ({ listing }) => {
  const defaultFormFields = {
    name: "",
    email: "",
    message: "",
  };

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;
  const [landlord, setLandlord] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [validFields, setValidFields] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  /**
   // TODO - Add email functionality
   */

  const sendMessage = async () => {
    setFormFields(defaultFormFields);

    toast("Message sent!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (
      formFields.name.length &&
      formFields.email.length &&
      formFields.message.length
    ) {
      setValidFields(true);
    } else {
      setValidFields(false);
    }
  }, [formFields]);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        console.log("LISTING", listing);
        const res = await fetch(`${URL}/api/user/agent/${listing.userRef}`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.success === false) {
          if (data.statusCode === 401) {
            toast("To save to favorites, please sign in", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
              theme: "dark",
            });
          }
          return;
        }
        setLandlord(data);
      } catch (error) {
        console.log(error);
        handleCloseForm();
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <ContactContainer id='overlay'>
          <ContactForm>
            <ContactHeader>
              <section className='overflow-hidden w-[125px] h-[125px]'>
                <img
                  src={landlord.avatar}
                  className='object-cover w-full h-full rounded-lg'
                />
              </section>
              <p className='w-2/3'>
                Contact{" "}
                <span className='font-semibold'>{landlord.username}</span> about{" "}
                <span className='font-semibold'>"{listing.title}"</span>
              </p>
            </ContactHeader>

            <FormInput
              type='text'
              name='name'
              id='name'
              value={formFields.name}
              onChange={handleChange}
              placeholder='Enter your name...'
              required
            />

            <FormInput
              type='email'
              name='email'
              id='email'
              value={formFields.email}
              onChange={handleChange}
              placeholder='Enter your email address...'
            />
            <FormTextarea
              name='message'
              id='message'
              rows='5'
              cols='50'
              value={formFields.message}
              onChange={handleChange}
              placeholder='Enter your message here...'
            ></FormTextarea>

            <div id='buttons' className='space-x-2'>
              <FormButton
                type='button'
                onClick={() => sendMessage()}
                disabled={!validFields}
              >
                Send Message
              </FormButton>

              <FormButton
                type='button'
                className='bg-red-700'
                onClick={() => setFormFields(defaultFormFields)}
              >
                Cancel
              </FormButton>
            </div>
          </ContactForm>
        </ContactContainer>
      )}
    </>
  );
};

export default Contact;
