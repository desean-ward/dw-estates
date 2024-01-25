import React, { useEffect, useState } from "react";

import {
  ContactAvatar,
  ContactContainer,
  ContactForm,
  FormButton,
  FormInput,
  FormTextarea,
} from "./contact.styles";

const ContactUs = ({ show }) => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;
  // const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseForm = () => {
    show(false);
  };

  /**
   // TODO - Add email functionality
   */

  // useEffect(() => {
  //   const fetchLandlord = async () => {
  //     try {
  //       const res = await fetch(`${URL}/api/user/${listing.userRef}`, {
  //         method: "GET",
  //         credentials: "include",
  //         sameSite: "none",
  //         secure: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const data = await res.json();

  //       if (data.success === false) {
  //         if (data.statusCode === 401) {
  //           alert("Please login to contact landlord");
  //         }
  //         return;
  //       }
  //       setLandlord(data);
  //     } catch (error) {
  //       console.log(error);
  //       handleCloseForm();
  //     }
  //   };

  //   fetchLandlord();
  // }, [listing.userRef]);

  return (
    <>
      <ContactContainer id='overlay'>
        <ContactForm>
          <p className='text-2xl text-black'>We'd love to hear from you!</p>

          <FormInput
            type='text'
            name='name'
            id='name'
            placeholder='Enter your name...'
          />

          <FormInput
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email address...'
          />
          <FormTextarea
            name='message'
            id='message'
            rows='5'
            cols='50'
            value={message}
            placeholder='Enter your message here...'
            onChange={handleChange}
          ></FormTextarea>
          <FormButton type='button' onClick={() => handleCloseForm()}>
            Send Message
          </FormButton>
          <FormButton
            type='button'
            className='bg-red-700'
            onClick={() => handleCloseForm()}
          >
            Cancel
          </FormButton>
        </ContactForm>
      </ContactContainer>
    </>
  );
};

export default ContactUs;
