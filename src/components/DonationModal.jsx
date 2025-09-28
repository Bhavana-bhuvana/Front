// import { DonationValidation } from './DonationValidation'
// import './Donation.css'
// import React,{ useState,useRef, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useForm} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import config from "../config";
// function DonationModal() {
// const API_BASE = `${config.API_URL}/api`;
// const paymentModeValue = watch("paymentMode");
// const frequencyValue = watch("frequency", frequency);
//   // const [frequency, setFrequency] = useState("monthly");
//   const [amount, setAmount] = useState("");
//   const [customAmount, setCustomAmount] = useState("");
//   const [showDeclaration, setShowDeclaration] = useState(false);

//   // OTP states
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otp, setOtp] = useState("");

// const navigate = useNavigate();
// const [inactive, setInactive] = useState(false);
// const timerRef = useRef(null);
// // Reset inactivity timer
// const resetTimer = () => {
//   if (timerRef.current) clearTimeout(timerRef.current);
//   timerRef.current = setTimeout(() => {
//     setInactive(true);
//     alert("You were inactive for 10 minutes. Redirecting to home...");
//     navigate("/"); // redirect to home
//   }, 10 * 60 * 1000); // 10 min
// };

// // Start/reset timer on activity
// useEffect(() => {
//   if (!inactive) {
//     window.addEventListener("keydown", resetTimer);
//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("click", resetTimer);
//     resetTimer(); // start timer
//   }
//   return () => {
//     window.removeEventListener("keydown", resetTimer);
//     window.removeEventListener("mousemove", resetTimer);
//     window.removeEventListener("click", resetTimer);
//     if (timerRef.current) clearTimeout(timerRef.current);
//   };
// }, [inactive]);

//  const {
//     register, handleSubmit, formState: { errors }, getValues, watch, reset,
// } = useForm({
//     resolver: yupResolver(DonationValidation),
//     mode: "onChange",
// });
// c
//   const sendOtp = async () => {
//     const email = getValues("email");
//     if (!email) return alert("Enter email first");

//     try {
//       await axios.post(`${API_BASE}/otp/request?email=${encodeURIComponent(email)}`);
//       alert("OTP sent to your email ✅");
//       setOtpSent(true);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send OTP ❌");
//     }
//   };
//   const verifyOtp = async () => {
//    const email = getValues("email");
//     if (!email || !otp) return alert("Enter OTP");

//     try {
//       await axios.post(
//         `${API_BASE}/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
//       );
//       setOtpVerified(true);
//       alert("Email verified successfully ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Invalid OTP ❌");
//     }
//   };

//   const onSubmit = async(data) => {
//     if (!otpVerified) {
//       alert("Please verify your email with OTP before proceeding");
//       return;
//     }
//     const donationData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       mobile: data.mobile,
//       dob: data.dob,
//       idType: data.idType,
//       uniqueId: data.uniqueId,
//       address: data.address,
//       frequency: frequency,
//       amount: amount === "other" ? customAmount : amount,
//       paymentMode: data.paymentMode,
//       bankName: data.bankName,
//       ifsc: data.ifsc,
//       accountNumber: data.accountNumber,
//     };
//     try {
//       await axios.post(`${API_BASE}/donors/save`, donationData);
//       alert("Donation details saved successfully ");
//       setFrequency("monthly");
//     setAmount("");
//     setCustomAmount("");
//     setOtpSent(false);
//     setOtpVerified(false);
//     setOtp("");

//   // reset all react-hook-form fields
//   reset();

//   // navigate home
//   navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save donation ");
//     }
    
//   };

//   const amounts = {
//     monthly: ["800", "1200", "1800"],
//     onetime: ["2000", "5000", "10000"],
//   };

//   return (
//     <div className="donate-container flex flex-col lg:flex-row gap-6 p-6 lg:p-10 bg-gray-100">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="donate-form flex-1 bg-white p-6 rounded-xl shadow-md"
//           style={{ pointerEvents: inactive ? "none" : "auto", opacity: inactive ? 0.5 : 1 }}
//       >
//         <h2 className="title">Donate</h2>

//         {/* Frequency */}
//         <div className="form-section">
//           <h4>Choose the frequency of your donation</h4>
//         {["monthly", "onetime"].map((f) => (
//   <label key={f} className="mr-4">
//     <input
//       type="radio"
//       value={f}
//       {...register("frequency")}
//       checked={frequencyValue === f}
//       onChange={(e) => {
//         setAmount("");
//         setCustomAmount("");
//       }}
//     />
//     {f === "monthly" ? " Monthly" : " One Time"}
//   </label>
// ))}

//         </div>
//         {/* amount */}
//         <div className="form-section">
//           <h4>Choose the amount of your donation</h4>
//           <div className="amount-options">
//             {amounts[frequencyValue].map((amt) => (
//   <label key={amt} className={`amount-box ${amount === amt ? "active" : ""}`}>
//     <input
//       type="radio"
//       name="amount"
//       value={amt}
//       checked={amount === amt}
//       onChange={(e) => setAmount(e.target.value)}
//     />
//     ₹{amt}
//   </label>
// ))}


//             {/* Other option */}
//             <label
//               className={`amount-box other-box ${
//                 amount === "other" ? "active" : ""
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="amount"
//                 value="other"
//                 checked={amount === "other"}
//                 onChange={() => setAmount("other")}
//               />
//               {amount === "other" ? (
//                 <input
//                   type="number"
//                   className="other-input"
//                   placeholder="Enter amount"
//                   value={customAmount}
//                   onChange={(e) => setCustomAmount(e.target.value)}
//                   autoFocus
//                 />
//               ) : (
//                 "Other"
//               )}
//             </label>
//           </div>
//           {(!amount || (amount === "other" && !customAmount)) && (
//             <p className="error">Donation amount is required</p>
//           )}
//         </div>
//         {/* Donor Info */}
//         <div className="form-section">
//           <h4>Who is making this donation?</h4>
//           <div className="input-row">
//             <select className="border rounded px-2">
//               <option>Mr.</option>
//               <option>Ms.</option>
//               <option>Mrs.</option>
//             </select>
//             <input
//               type="text"
//               placeholder="First Name *"
//               {...register("firstName")}
//               className="border rounded px-2 flex-1"
//             />
//             <input
//               type="text"
//               placeholder="Last Name *"
//               {...register("lastName")}
//               className="border rounded px-2 flex-1"
//             />
//           </div>
//           {errors.firstName && (
//             <p className="error">{errors.firstName.message}</p>
//           )}
//           {errors.lastName && (
//             <p className="error">{errors.lastName.message}</p>
//           )}

//           {/* Email + OTP */}
//           <div className="input-row mt-3">
//             <input
//               type="email"
//               placeholder="Email ID *"
//               {...register("email")}
//               disabled={otpVerified}
//               className="border rounded px-2 flex-1"
//             />
//             {!otpVerified && !otpSent && (
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 className="otp-btn bg-primary hover:bg-primary/50 text-white px-3 rounded"
//               >
//                 Send OTP
//               </button>
//             )}
//           </div>
//           {errors.email && <p className="error">{errors.email.message}</p>}
//           {otpSent && !otpVerified && (
//             <div className="input-row mt-2">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="border rounded px-2 flex-1"
//               />
//               <button
//                 type="button"
//                 onClick={verifyOtp}
//                 className="verify-btn bg-green-500 text-white px-3 rounded"
//               >
//                 Verify
//               </button>
//             </div>
//           )}
//           {otpVerified && <p className="text-green-600">✅ Email Verified</p>}

//           <input
//             type="tel"
//             placeholder="Mobile Number *"
//             {...register("mobile")}
//             className="border rounded px-2 mt-3 w-full"
//           />
//           {errors.mobile && <p className="error">{errors.mobile.message}</p>}
//            <label className="block mt-3">Date of Birth *</label>
//           <input
//             type="date"
//             {...register("dob")}
//             className="border rounded px-2 mt-3 w-full"
//           />
//           {errors.dob && <p className="error">{errors.dob.message}</p>}
//         </div>

//         {/* Unique ID */}
//         <div className="form-section">
//           <h4>Unique Identification</h4>
//           <div className="input-row">
//             <select {...register("idType")} className="border rounded px-2">
//           <option value="">Select ID Type</option>
//           <option value="PAN Card">PAN Card</option>
//           <option value="Aadhar">Aadhar</option>
//           <option value="Driving license">Driving License</option>
//           <option value="VoterID">Voter ID</option>
//               </select>
//             <input
//               type="text"
//               placeholder="Enter ID *"
//               {...register("uniqueId")}
//               className="border rounded px-2 flex-1"
//             />
//           </div>
      
//           {errors.uniqueId && (
//             <p className="error">{errors.uniqueId.message}</p>
//           )}
//           <textarea
//             placeholder="Address *"
//             {...register("address")}
//             className="border rounded px-2 w-full mt-3"
//           ></textarea>
//           {errors.address && <p className="error">{errors.address.message}</p>}
//         </div>
// <div className="form-section">
//   {/* Payment Mode - only if monthly */}
// {frequencyValue === "monthly" && (
//   <div className="input-row mb-2">
//     <select {...register("paymentMode")} className="border rounded px-2 mb-2 w-full">
//       <option value="">Please Select Donation Mode</option>
//       <option value="E-Mandate">E-Mandate</option>
//       <option value="UPI">UPI</option>
//     </select>
//     {errors.paymentMode && <p className="error">{errors.paymentMode.message}</p>}
//   </div>
// )}

// {/* Bank fields - only if monthly + E-Mandate */}
// {frequencyValue === "monthly" && paymentModeValue === "E-Mandate" && (
//   <div className="input-row mt-2 gap-2 flex flex-col md:flex-row">
//     <input
//       type="text"
//       placeholder="Bank Name"
//       {...register("bankName")}
//       className="border rounded px-2 flex-1"
//     />
//     <input
//       type="text"
//       placeholder="IFSC Code"
//       {...register("ifsc")}
//       className="border rounded px-2 flex-1"
//     />
//     <input
//       type="text"
//       placeholder="Account Number"
//       {...register("accountNumber")}
//       className="border rounded px-2 flex-1"
//     />
//   </div>
// )}

//   {/* Payment Mode */}
//   {/* {frequencyValue === "monthly" && (
//     <div className="input-row mb-2">
//       <select {...register("paymentMode")} className="border rounded px-2 mb-2 w-full">
//         <option value="">Please Select Donation Mode</option>
//         <option value="E-Mandate">E-Mandate</option>
//         <option value="UPI">UPI</option>
//       </select>
//       {errors.paymentMode && <p className="error">{errors.paymentMode.message}</p>}
//     </div>
//   )}
//   {/* Bank fields 
//   {((frequencyValue === "monthly" && paymentModeValue === "E-Mandate") || frequencyValue === "onetime") && (
//     <div className="input-row mt-2 gap-2 flex flex-col md:flex-row">
//       {!(frequencyValue === "onetime" && paymentModeValue === undefined) && (
//         <input
//           type="text"
//           placeholder="Bank Name"
//           {...register("bankName")}
//           className="border rounded px-2 flex-1"
//         />
//       )}
//       <input
//         type="text"
//         placeholder="IFSC Code"
//         {...register("ifsc")}
//         className="border rounded px-2 flex-1"
//       />

//       <select className="border rounded px-2">
//         <option>Savings</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Account Number"
//         {...register("accountNumber")}
//         className="border rounded px-2 flex-1"
//       />
//     </div>
//   )} */}
//   {errors.bankName && <p className="error">{errors.bankName.message}</p>}
//   {errors.ifsc && <p className="error">{errors.ifsc.message}</p>}
//   {errors.accountNumber && <p className="error">{errors.accountNumber.message}</p>}
  

// </div>

//         {/* Payment Mode */}
// {/*       
//         <div className="form-section">
//           {/* <h4>Please Select Donation Mode</h4> 
//           {frequencyValue === "monthly" && paymentModeValue !== "UPI" && (
//   <div className="input-row mb-2">
//     <select {...register("paymentMode")} className="border rounded px-2 mb-2 w-full">
//       <option value="">Please Select Donation Mode</option>
//       <option>E-Mandate</option>
//       <option>UPI</option>
//     </select>
//   </div>
//       )}  
//           {errors.bankName && <p className="error">{errors.bankName.message}</p>}
//           {errors.ifsc && <p className="error">{errors.ifsc.message}</p>}

//           <div className="input-row mt-2">
//             <select className="border rounded px-2">
//               <option>Savings</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Account Number"
//               {...register("accountNumber")}
//               className="border rounded px-2 flex-1"
//             />
//           </div>
//           {errors.accountNumber && (
//             <p className="error">{errors.accountNumber.message}</p>
//           )}
//         </div> */}
//         {/* Declaration */}
//         <div className="form-section flex items-center">
//           <input type="checkbox" {...register("declaration")} className="mr-2" />{" "}
//           I am an Indian Citizen and I have read & understood the{" "}
//           <a
//             onClick={() => setShowDeclaration(true)}
//             className="text-primary cursor-pointer"
//           >
//             declaration
//           </a>
//         </div>
//         {errors.declaration && (
//           <p className="error">{errors.declaration.message}</p>
//         )}

//         <button type="submit" className="donate-btn">
//           Proceed to Verify Details
//         </button>
//       </form>

//       {/* Declaration Popup */}
//       {showDeclaration && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white w-1/2 p-6 rounded-xl shadow-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold">Declaration & Guidelines</h2>
//               <button onClick={() => setShowDeclaration(false)}>✖</button>
//             </div>
//             <div className="mt-4 max-h-60 overflow-y-auto">
//               <p>
//                 Donations are accepted only from Indian citizens. Please ensure
//                 details provided are correct.
//               </p>
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={() => setShowDeclaration(false)}
//                 className="bg-primary text-white px-3 py-1 rounded"
//               >
//                 I Agree
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       <div className="donate-info">
        

//           <div className="info-box bg-white shadow-md rounded-xl p-6 space-y-4 text-gray-800">
//   <div>
//     <h3 className="text-lg font-semibold border-b pb-2 mb-2">Contact Us</h3>
//     <p className="text-sm">
//       If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
//     </p>
//     <p className="text-sm font-medium">📧 Email: <span className="font-normal">feedthehunger.india2025@gmail.com</span></p>
//     <p className="text-sm font-medium">📞 Call: <span className="font-normal">8884260100</span></p>
//   </div>

//   <div>
//     <h3 className="text-lg font-semibold border-b pb-2 mb-2">Terms & Conditions</h3>
//     <ul className="list-disc list-inside space-y-1 text-sm">
//       <li><span className="font-medium">Donations</span> will be accepted only from Indian citizens.</li>
//       <li>No donations are accepted from corporate entities or any Government agencies.</li>
//       <li>
//         All donations are received through <span className="font-medium">Credit Card, NACH, e-Mandates, online transfers, or cheques/drafts</span>, but never in cash.
//       </li>
//       <li>Your donation is critical in running campaigns and enabling victories — we cannot do it without your help.</li>
//     </ul>
//   </div>
// </div>

//         </div>    </div> 
//   );
  
  
  
// }

// export default DonationModal;
// DonationModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { DonationValidation } from "./DonationValidation";
import "./Donation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import config from "../config";

function DonationModal() {
  const API_BASE = `${config.API_URL}/api`;

  // local UI state
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [inactive, setInactive] = useState(false);
  const timerRef = useRef(null);

  // react-hook-form: define useForm BEFORE using watch/getValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(DonationValidation),
    mode: "onChange",
    defaultValues: { frequency: "monthly" }, // default frequency
  });

  // watch values (only after useForm declared)
  const frequencyValue = watch("frequency"); // will be "monthly" by default
  const paymentModeValue = watch("paymentMode");

  // Reset amount fields whenever frequency changes so change is instant
  useEffect(() => {
    setAmount("");
    setCustomAmount("");
  }, [frequencyValue]);

  // inactivity timeout logic (unchanged)
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setInactive(true);
      alert("You were inactive for 10 minutes. Redirecting to home...");
      navigate("/");
    }, 10 * 60 * 1000);
  };

  useEffect(() => {
    if (!inactive) {
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("click", resetTimer);
      resetTimer();
    }
    return () => {
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inactive]);

  const navigate = useNavigate();

  // OTP handlers (unchanged)
  const sendOtp = async () => {
    const email = getValues("email");
    if (!email) return alert("Enter email first");

    try {
      await axios.post(`${API_BASE}/otp/request?email=${encodeURIComponent(email)}`);
      alert("OTP sent to your email ✅");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP ❌");
    }
  };

  const verifyOtp = async () => {
    const email = getValues("email");
    if (!email || !otp) return alert("Enter OTP");

    try {
      await axios.post(
        `${API_BASE}/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
      );
      setOtpVerified(true);
      alert("Email verified successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP ❌");
    }
  };

  // amounts map (use frequencyValue)
  const amounts = {
    monthly: ["800", "1200", "1800"],
    onetime: ["2000", "5000", "10000"],
  };

  // submit
  const onSubmit = async (data) => {
    if (!otpVerified) {
      alert("Please verify your email with OTP before proceeding");
      return;
    }

    // use form frequency (from react-hook-form) instead of any local state
    const freq = getValues("frequencyValue") || "monthly";

    const donationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      dob: data.dob,
      idType: data.idType,
      uniqueId: data.uniqueId,
      address: data.address,
      frequency: freq,
amount: data.amount === "other" ? data.customAmount : data.amount,      paymentMode: data.paymentMode,
      bankName: data.bankName,
      ifsc: data.ifsc,
      accountNumber: data.accountNumber,
    };

    try {
      await axios.post(`${API_BASE}/donors/save`, donationData);
      alert("Donation details saved successfully ");
      // reset UI state + form
      setAmount("");
      setCustomAmount("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      reset(); // reset react-hook-form fields
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save donation ");
    }
  };

  return (
    <div className="donate-container flex flex-col lg:flex-row gap-6 p-6 lg:p-10 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="donate-form flex-1 bg-white p-6 rounded-xl shadow-md"
        style={{ pointerEvents: inactive ? "none" : "auto", opacity: inactive ? 0.5 : 1 }}
      >
        <h2 className="title">Donate</h2>

        {/* Frequency */}
        <div className="form-section">
          <h4>Choose the frequency of your donation</h4>
          {["monthly", "onetime"].map((f) => (
            <label key={f} className="mr-4">
              <input
                type="radio"
                value={f}
                {...register("frequency")}
                checked={frequencyValue === f}
                readOnly // avoid double-handling — register handles the change
              />
              {f === "monthly" ? " Monthly" : " One Time"}
            </label>
          ))}
        </div>
<div className="form-section">
  <h4>Choose the amount of your donation</h4>
  <div className="amount-options">
    {amounts[frequencyValue || "monthly"].map((amt) => (
      <label key={amt} className={`amount-box ${watch("amount") === amt ? "active" : ""}`}>
        <input
          type="radio"
          value={amt}
          {...register("amount")}
        />
        ₹{amt}
      </label>
    ))}

    {/* Other option */}
    <label className={`amount-box other-box ${watch("amount") === "other" ? "active" : ""}`}>
      <input
        type="radio"
        value="other"
        {...register("amount")}
      />
      {watch("amount") === "other" && (
        <input
          type="number"
          placeholder="Enter amount"
          {...register("customAmount")}
          autoFocus
        />
      )}
    </label>
  </div>

  {errors.amount && <p className="error">{errors.amount.message}</p>}
  {watch("amount") === "other" && errors.customAmount && (
    <p className="error">{errors.customAmount.message}</p>
  )}
</div>

        {/* Donor Info */}
        <div className="form-section">
          <h4>Who is making this donation?</h4>
          <div className="input-row">
            <select className="border rounded px-2">
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
            <input
              type="text"
              placeholder="First Name *"
              {...register("firstName")}
              className="border rounded px-2 flex-1"
            />
            <input
              type="text"
              placeholder="Last Name *"
              {...register("lastName")}
              className="border rounded px-2 flex-1"
            />
          </div>
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}

          {/* Email + OTP */}
          <div className="input-row mt-3">
            <input
              type="email"
              placeholder="Email ID *"
              {...register("email")}
              disabled={otpVerified}
              className="border rounded px-2 flex-1"
            />
            {!otpVerified && !otpSent && (
              <button type="button" onClick={sendOtp} className="otp-btn bg-primary hover:bg-primary/50 text-white px-3 rounded">
                Send OTP
              </button>
            )}
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}
          {otpSent && !otpVerified && (
            <div className="input-row mt-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border rounded px-2 flex-1"
              />
              <button type="button" onClick={verifyOtp} className="verify-btn bg-green-500 text-white px-3 rounded">
                Verify
              </button>
            </div>
          )}
          {otpVerified && <p className="text-green-600">✅ Email Verified</p>}

          <input type="tel" placeholder="Mobile Number *" {...register("mobile")} className="border rounded px-2 mt-3 w-full" />
          {errors.mobile && <p className="error">{errors.mobile.message}</p>}
          <label className="block mt-3">Date of Birth *</label>
          <input type="date" {...register("dob")} className="border rounded px-2 mt-3 w-full" />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        {/* Unique ID */}
        <div className="form-section">
          <h4>Unique Identification</h4>
          <div className="input-row">
            <select {...register("idType")} className="border rounded px-2">
              <option value="">Select ID Type</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Aadhar">Aadhar</option>
              <option value="Driving license">Driving License</option>
              <option value="VoterID">Voter ID</option>
            </select>
            <input type="text" placeholder="Enter ID *" {...register("uniqueId")} className="border rounded px-2 flex-1" />
          </div>

          {errors.uniqueId && <p className="error">{errors.uniqueId.message}</p>}
          <textarea placeholder="Address *" {...register("address")} className="border rounded px-2 w-full mt-3"></textarea>
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-section">
          {/* Payment Mode — ONLY show for monthly */}
          {frequencyValue === "monthly" && (
            <div className="input-row mb-2">
              <select {...register("paymentMode")} className="border rounded px-2 mb-2 w-full">
                <option value="">Please Select Donation Mode</option>
                <option value="E-Mandate">E-Mandate</option>
                <option value="UPI">UPI</option>
              </select>
              {errors.paymentMode && <p className="error">{errors.paymentMode.message}</p>}
            </div>
          )}

          {/* Bank fields — show only when monthly + E-Mandate */}
           {frequencyValue === "monthly" && paymentModeValue === "E-Mandate" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
  <input type="text" placeholder="Bank Name" {...register("bankName")} className="border rounded px-2 w-full" />
  <input type="text" placeholder="IFSC Code" {...register("ifsc")} className="border rounded px-2 w-full" />
  <select {...register("accountType")} className="border rounded px-2 w-full">
    <option>Savings</option>
  </select>
  <input type="text" placeholder="Account Number" {...register("accountNumber")} className="border rounded px-2 w-full" />
</div>
          )} 
        

            {frequencyValue === "onetime"  && (
            <div className="input-row mt-2 gap-2 flex flex-col md:flex-row">
              <input type="text" placeholder="IFSC Code" {...register("ifsc")} className="border rounded px-2 flex-1" />
              <select className="border rounded px-2">
        <option>Savings</option>
      </select>
              <input type="text" placeholder="Account Number" {...register("accountNumber")} className="border rounded px-2 flex-1" />
            </div>
          )}
                    {errors.bankName && <p className="error">{errors.bankName.message}</p>}
          {errors.ifsc && <p className="error">{errors.ifsc.message}</p>}
          
          {errors.accountNumber && <p className="error">{errors.accountNumber.message}</p>}
        </div>

        {/* Declaration */}
        <div className="form-section flex items-center">
          <input type="checkbox" {...register("declaration")} className="mr-2" />{" "}
          I am an Indian Citizen and I have read & understood the{" "}
          <a onClick={() => setShowDeclaration(true)} className="text-primary cursor-pointer">
            declaration
          </a>
        </div>
        {errors.declaration && <p className="error">{errors.declaration.message}</p>}

        <button type="submit" className="donate-btn">
          Proceed to Verify Details
        </button>
      </form>

      {/* Declaration Popup */}
      {showDeclaration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Declaration & Guidelines</h2>
              <button onClick={() => setShowDeclaration(false)}>✖</button>
            </div>
            <div className="mt-4 max-h-60 overflow-y-auto">
              <p>Donations are accepted only from Indian citizens. Please ensure details provided are correct.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowDeclaration(false)} className="bg-primary text-white px-3 py-1 rounded">I Agree</button>
            </div>
          </div>
        </div>
      )}

      <div className="donate-info">
        {/* info box (same as before) */}
        <div className="info-box bg-white shadow-md rounded-xl p-6 space-y-4 text-gray-800">
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Contact Us</h3>
            <p className="text-sm">If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="text-sm font-medium">📧 Email: <span className="font-normal">feedthehunger.india2025@gmail.com</span></p>
            <p className="text-sm font-medium">📞 Call: <span className="font-normal">8884260100</span></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Terms & Conditions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><span className="font-medium">Donations</span> will be accepted only from Indian citizens.</li>
              <li>No donations are accepted from corporate entities or any Government agencies.</li>
              <li>All donations are received through <span className="font-medium">Credit Card, NACH, e-Mandates, online transfers, or cheques/drafts</span>, but never in cash.</li>
              <li>Your donation is critical in running campaigns and enabling victories — we cannot do it without your help.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationModal;
