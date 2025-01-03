import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Col, Form, Row } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "axios";
import AtcoderLogo from "../../images/codingWebsiteLogos/Atcoder.png";
import CodechefLogo from "../../images/codingWebsiteLogos/Codechef.png";
import CodeforcesLogo from "../../images/codingWebsiteLogos/Codeforces.png";
import GeeksForGeeksLogo from "../../images/codingWebsiteLogos/GeeksForGeeks.png";
import HackerearthLogo from "../../images/codingWebsiteLogos/Hackerearth.png";
import LeetcodeLogo from "../../images/codingWebsiteLogos/Leetcode.png";
import TopcoderLogo from "../../images/codingWebsiteLogos/Topcoder.png";
import "./RegisterPage.css";

const SelectableCard = ({ platform, isSelected, onClick }) => (
  <div
    className={`selectable-card ${isSelected ? "selected" : ""}`}
    onClick={onClick}
  >
    <img src={platform.icon} alt={platform.name} className="card-icon" />
    <div className="card-title">{platform.name}</div>
  </div>
);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const platforms = [
    { id: 1, name: "Atcoder", icon: AtcoderLogo },
    { id: 2, name: "Codechef", icon: CodechefLogo },
    { id: 3, name: "Codeforces", icon: CodeforcesLogo },
    { id: 4, name: "Gfg", icon: GeeksForGeeksLogo },
    { id: 5, name: "Hackerearth", icon: HackerearthLogo },
    { id: 6, name: "Leetcode", icon: LeetcodeLogo },
    { id: 7, name: "Topcoder", icon: TopcoderLogo },
  ];

  const handlePlatformClick = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id)
        ? prev.filter((platformId) => platformId !== id)
        : [...prev, id]
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFileName(file.name);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    // Submission logic here
  };

  return (
    <div className="registerContainer">
      <div className="title_Register">Register</div>
      <hr />
      <div className="formContainer">
        {/* Left Section */}
        <div className="leftSection">
          <div className="inputFieldContainer">
            <p className="inputTitle">Name:</p>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputFieldContainer">
            <p className="inputTitle">Email:</p>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputFieldContainer">
            <p className="inputTitle">Password:</p>
            <FormControl variant="outlined" size="small">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setValues({
                          ...values,
                          showPassword: !values.showPassword,
                        })
                      }
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="inputFieldContainer">
            <p className="inputTitle">Confirm Password:</p>
            <FormControl variant="outlined" size="small">
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setValues({
                          ...values,
                          showConfirmPassword: !values.showConfirmPassword,
                        })
                      }
                    >
                      {values.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>
          <div className="inputFieldContainer">
            <p className="inputTitle">Upload your profile pic:</p>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Pic
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
            {uploadedFileName && (
              <p className="uploadedFileName">{uploadedFileName}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="rightSection">
          <div className="rightForm_Textfield_Select_Title">
            Select the platforms you code on:
          </div>
          <div className="platform-cards-container">
            {platforms.map((platform) => (
              <SelectableCard
                key={platform.id}
                platform={platform}
                isSelected={selectedPlatforms.includes(platform.id)}
                onClick={() => handlePlatformClick(platform.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="rightForm_Button">
        {error && <ErrorMessage severity="error">{error}</ErrorMessage>}
        {loading && <CircularProgress style={{ width: 25, height: 25 }} />}
        <Button
          variant="contained"
          style={{ backgroundColor: "#1976d2", color: "white" }}
          startIcon={<PersonAddIcon />}
          onClick={submitHandler}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
