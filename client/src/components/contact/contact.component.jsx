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

const Contact = ({ listing }) => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // const handleCloseForm = () => {
  //   setLandlord(null);
  //   show(false);
  // };

  /**
   // TODO - Add email functionality
   */

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${URL}/api/user/${listing.userRef}`, {
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
            alert("Please login to contact landlord");
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
            
            <div id='buttons' className="space-x-2">
              <FormButton type='button' onClick={() => {}}>
                Send Message
              </FormButton>
              
              <FormButton
                type='button'
                className='bg-red-700'
                onClick={() => {}}
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
