import React, { useState } from 'react';

function Help() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Handle feedback form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here, you can send the feedback data to your server
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-3">Help & Support</h2>
      <hr />

      {/* FAQ Section */}
      <div className="mb-4">
        <h4 className='fw-bold'>Frequently Asked Questions (FAQ)</h4>
        <div>
          <p className='fw-bold'><strong>Q:</strong> How do I book an appointment?</p>
          <p><strong className='fw-bold'>A:</strong> Go to the "Facilities" section, select a recycling facility, and complete the booking form.</p>
        </div>
        <div>
          <p className='fw-bold'><strong>Q:</strong> Can I edit my appointment?</p>
          <p><strong className='fw-bold'>A:</strong> Yes, go to "Your Appointments" and click on the "Edit" button next to the appointment.</p>
        </div>
        <div>
          <p className='fw-bold'><strong>Q:</strong> What should I do if I face issues?</p>
          <p><strong className='fw-bold'>A:</strong> You can contact our support team through the contact options provided below.</p>
        </div>
      </div>
      <hr />

      {/* Contact Support Section */}
      <div className="mb-4">
        <h4 className='fw-bold'>Contact Support</h4>
        <p>If you're facing any issues, feel free to reach out to our support team:</p>
        <ul>
          <li className='fw-bold'>Email: <a href="mailto:support@eseva.com">support@eseva.com</a></li>
          <li className='fw-bold'>Phone: +1 234-567-890</li>
          <li className='fw-bold'>Live Chat: <a href="#">Start Live Chat</a></li> {/* Replace with your live chat integration */}
        </ul>
      </div>
      <hr />

      {/* Troubleshooting Section */}
      <div className="mb-4">
        <h4 className='fw-bold'>Troubleshooting Tips</h4>
        <ul>
          <li>Make sure you're using the latest version of the browser for the best experience.</li>
          <li>If you can't see your appointments, try refreshing the page or logging out and back in.</li>
          <li>Clear your browser's cache if you experience unexpected behavior.</li>
        </ul>
      </div>
      <hr />

      {/* Feedback Form */}
      <div className="mb-4">
        <h4 className='fw-bold'>Submit Feedback</h4>
        {submitted ? (
          <p className="text-success">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              className="form-control mb-2"
              rows="4"
              placeholder="Let us know how we can improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button className="btn btn-success w-100">Submit Feedback</button>
          </form>
        )}
      </div>
      <hr />

      {/* Policies and Guidelines */}
      <div className="mb-4">
        <h4 className='fw-bold'>Policies & Guidelines</h4>
        <ul>
          <li className='fw-bold'><a href="/privacy-policy">Privacy Policy</a></li>
          <li className='fw-bold'><a href="/terms-of-service">Terms of Service</a></li>
          <li className='fw-bold'><a href="/usage-guidelines">Platform Usage Guidelines</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
