import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please select a file to upload.");
      setSuccessMessage("");
      return;
    }

    // Simulate file upload
    const newFile = {
      id: uploadedFiles.length + 1,
      resumeFileName: selectedFile.name,
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setSelectedFile(null);
    setSuccessMessage("File uploaded successfully!");
    setErrorMessage("");
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow bg-white" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Upload Your Resume</h2>

      {/* Success or Error Messages */}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Upload
        </button>
      </form>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="file-list mt-4">
          <h3>Uploaded Files:</h3>
          <ul className="list-unstyled">
            {uploadedFiles.map((file) => (
              <li key={file.id}>
                <a
                  href={`/files/download/${file.id}`}
                  className="text-primary"
                >
                  {file.resumeFileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <div className="text-center mt-4">
        <a href="/AdminDashboard" className="btn btn-warning">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default UploadResume;
