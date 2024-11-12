import React, { useState } from 'react';
import "../styles/prescription.css";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [consultationMessage, setConsultationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('prescriptionFile', file);
    formData.append('userId', '123'); // Replace with actual user ID

    try {
      const response = await fetch('/api/prescription', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload prescription');
      }

      const data = await response.json();
      alert(data.message);
      setFile(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
};


  const handleConsultationRequest = (e) => {
    e.preventDefault();
    setConsultationMessage("Request for consultation has been sent!");
    setErrorMessage("");
  };

  return (
    <div className="prescription-upload-container">
      <h2>Upload Your Prescription</h2>
      <form onSubmit={handleFileUpload}>
        <div>
          <label htmlFor="prescriptionFile">Select Prescription File:</label>
          <input
            type="file"
            id="prescriptionFile"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Upload Prescription</button>
      </form>
      
      <h3>Or</h3>
      
      <form onSubmit={handleConsultationRequest}>
        <button type="submit">Request Consultation</button>
        {consultationMessage && <p className="success">{consultationMessage}</p>}
      </form>
    </div>
  );
};

export default PrescriptionUpload;
