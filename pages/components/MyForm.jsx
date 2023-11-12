import { useState } from "react";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const MyForm = () => {
  const [formData, setFormData] = useState({
    intention: false,
    basicInfo: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
    },
    contactInfo: {
      email: "",
      phoneNumber: "",
    },
    locationInfo: {
      isOnCampus: false,
      residentialArea: "",
    },
    academicInfo: {
      majors: '',
      minors: '',
      classes: '',
    }
  });

  const [formErrors, setFormErrors] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    contactInfo: {
      email: "",
      phoneNumber: "",
    },
    locationInfo: {
      isOnCampus: "",
      residentialArea: "",
    },
    academicInfo: {
      majors: '',
      minors: '',
      classes: '',
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, subfield] = name.split(".");

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [section]: { ...prevData[section], [subfield]: checked },
      }));
    } else if (subfield) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: { ...prevData[section], [subfield]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.basicInfo.firstName.trim()) {
      validationErrors.basicInfo = {
        ...validationErrors.basicInfo,
        firstName: "Please enter your first name.",
      };
    }

    if (!formData.basicInfo.lastName.trim()) {
      validationErrors.basicInfo = {
        ...validationErrors.basicInfo,
        lastName: "Please enter your last name.",
      };
    }

    if (formData.basicInfo.age <= 0) {
      validationErrors.basicInfo = {
        ...validationErrors.basicInfo,
        age: "Please enter a valid age.",
      };
    }

    if (!formData.basicInfo.gender) {
      validationErrors.basicInfo = {
        ...validationErrors.basicInfo,
        gender: "Please select your gender.",
      };
    }

    if (!formData.contactInfo.email) {
      validationErrors.contactInfo = {
        ...validationErrors.contactInfo,
        email: "Please enter your email address.",
      };
    }

    if (!formData.contactInfo.phoneNumber) {
      validationErrors.contactInfo = {
        ...validationErrors.contactInfo,
        phoneNumber: "Please enter your phone number.",
      };
    }

    if (
      formData.locationInfo.isOnCampus &&
      !formData.locationInfo.residentialArea
    ) {
      validationErrors.locationInfo = {
        ...validationErrors.locationInfo,
        residentialArea: "Please enter your residential area.",
      };
    }

    if (formData.academicInfo.majors.length === 0) {
      validationErrors.academicInfo = {
        ...validationErrors.academicInfo,
        majors: "Please enter at least one major.",
      };
    }

    if (formData.academicInfo.classes.length === 0) {
      validationErrors.academicInfo = {
        ...validationErrors.academicInfo,
        classes: "Please enter at least one class.",
      };
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
    } else {
      try {
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        window.location.href = "http://localhost:3000/home";

        if (data.success) {
          console.log("Form submitted successfully");
          // Handle success (e.g., show a success message)
        } else {
          console.error("Error submitting form:", data.message);
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error("Error submitting form:", error.message);
        // Handle error (e.g., show an error message)
      }
    }
  };

  // const [matches, setMatches] = useState(null);
  // const { user, error, isLoading } = useUser();
  // useEffect(()=>{{
  //   fetch(
  //     "http://localhost:3000/api/getUserInfo", {
  //         method: "POST",
  //         body: JSON.stringify({
  //             "username" : "lmdevine@umass.edu",
  //         }),
  //         headers: {
  //           "Content-type": "application/json"
  //         }
  //     }
  // ).then((response) => 
  //   response.json())
  // .then((data)=>{
  //   console.log(data)
  //   setMatches(data)
  // })
  // }})
  // console.log(matches)
  // if(matches != null){
  //   window.location.href = "http://localhost:3000/home"
  // }

  return (
    <form onSubmit={handleSubmit}>
      {/* Basic Information */}
      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">First Name:</p>
        <input
          type="text"
          name="basicInfo.firstName"
          value={formData.basicInfo.firstName}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.basicInfo.firstName}</div>
      </label>
      <br />

      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Last Name:</p>
        <input
          type="text"
          name="basicInfo.lastName"
          value={formData.basicInfo.lastName}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.basicInfo.lastName}</div>
      </label>
      <br />

      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Age:</p>
        <input
          type="number"
          name="basicInfo.age"
          value={formData.basicInfo.age}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.basicInfo.age}</div>
      </label>
      <br />

      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Gender:</p>
        <input
          type="text"
          name="basicInfo.gender"
          value={formData.basicInfo.gender}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.basicInfo.gender}</div>
      </label>
      <br />

      {/* Contact Information */}
      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Email:</p>
        <input
          type="email"
          name="contactInfo.email"
          value={formData.contactInfo.email}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.contactInfo.email}</div>
      </label>
      <br />

      <label className="inline-flex mb-2">
        <p className="mr-2 text-black">Phone Number:</p>
        <input
          type="tel"
          name="contactInfo.phoneNumber"
          value={formData.contactInfo.phoneNumber}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.contactInfo.phoneNumber}</div>
      </label>
      <br />

      {/* Location Information */}
      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">On Campus:</p>
        <input
          type="checkbox"
          name="locationInfo.isOnCampus"
          checked={formData.locationInfo.isOnCampus}
          onChange={handleChange}
          className="rounded-md"
        />
      </label>
      <br />

      {formData.locationInfo.isOnCampus && (
        <label className="flex inline-flex mb-2">
          <p className="mr-2 text-black">Residential Area:</p>
          <input
            type="text"
            name="locationInfo.residentialArea"
            value={formData.locationInfo.residentialArea}
            onChange={handleChange}
            className="rounded-md"
          />
          <div style={{ color: "red" }}>
            {formErrors.locationInfo.residentialArea}
          </div>
        </label>
      )}
      <br />

      {/* Academic Information */}
      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Majors:</p>
        <input
          type="text"
          name="academicInfo.majors"
          value={formData.academicInfo.majors}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.academicInfo.majors}</div>
      </label>
      <br />

      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Minors:</p>
        <input
          type="text"
          name="academicInfo.minors"
          value={formData.academicInfo.minors}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.academicInfo.minors}</div>
      </label>
      <br />

      <label className="flex inline-flex mb-2">
        <p className="mr-2 text-black">Classes:</p>
        <input
          type="text"
          name="academicInfo.classes"
          value={formData.academicInfo.classes}
          onChange={handleChange}
          className="rounded-md"
        />
        <div style={{ color: "red" }}>{formErrors.academicInfo.classes}</div>
      </label>
      <br />

      {/* Interest Information */}
      {/* Add similar patterns for hobbies, musicGenre, movieGenre, clubs, and favorites */}

      <button
        type="submit"
        className="bg-black text-white text-2xl px-[60px] py-[10px] rounded-md mx-[10px] cursor-pointer
        hover:bg-white hover:text-black hover:border-black border-2 border-black transition-all duration-300">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
