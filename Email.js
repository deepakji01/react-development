import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  const form = useRef();

  const sendFeedback = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID',     // e.g., 'service_123abc'
      'YOUR_TEMPLATE_ID',    // e.g., 'template_abc123'
      form.current,
      'YOUR_PUBLIC_KEY'      // e.g., 'abc123XYZ456'
    )
    .then((result) => {
        console.log(result.text);
        alert('Thank you for your feedback!');
        form.current.reset();
    }, (error) => {
        console.log(error.text);
        alert('Failed to send feedback. Please try again.');
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Feedback Form</h2>
      <form ref={form} onSubmit={sendFeedback}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            name="user_feedback"
            placeholder="Your Feedback"
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
