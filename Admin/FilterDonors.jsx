// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import config from "../src/config";
// export default function FilterDonors() {
//   const API_BASE = `${config.API_URL}/api/donors`;

//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { register, handleSubmit, getValues, reset } = useForm();

//   // Fetch all donors initially
//   const fetchAllDonors = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE}/all`);
//       setDonors(response.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch donors");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAllDonors();
//   }, []);

//   // Filter donors based on form inputs
//   const searchDonors = async () => {
//     const values = getValues();
//     const payload = { ...values };

//     // Remove empty values
//     Object.keys(payload).forEach((key) => {
//       if (!payload[key]) delete payload[key];
//     });

//     // Handle amount range
//     if (values.amountMin || values.amountMax) {
//       payload.amount = [
//         values.amountMin ? parseFloat(values.amountMin) : 0,
//         values.amountMax ? parseFloat(values.amountMax) : 1000000,
//       ];
//       delete payload.amountMin;
//       delete payload.amountMax;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE}/filter`, payload);
//       setDonors(response.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch filtered donors");
//     }
//     setLoading(false);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     reset();
//     fetchAllDonors();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Filter Donors</h2>

//       {/* Filter Form */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <input {...register("firstName")} placeholder="First Name" className="border p-2 rounded w-full" />
//           <input {...register("lastName")} placeholder="Last Name" className="border p-2 rounded w-full" />
//           <input {...register("email")} placeholder="Email" className="border p-2 rounded w-full" />
//           <input {...register("bankName")} placeholder="Bank Name" className="border p-2 rounded w-full" />
//           <input {...register("paymentMode")} placeholder="Payment Mode" className="border p-2 rounded w-full" />
//           <input {...register("amountMin")} type="number" placeholder="Min Amount" className="border p-2 rounded w-full" />
//           <input {...register("amountMax")} type="number" placeholder="Max Amount" className="border p-2 rounded w-full" />
//         </div>

//         <div className="mt-4 flex flex-wrap gap-4">
//           <button
//             onClick={searchDonors}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//           <button
//             onClick={resetFilters}
//             className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       {/* Donors Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
//           <thead>
//             <tr className="bg-blue-100 text-left">
//               <th className="px-4 py-2 border-b">Name</th>
//               <th className="px-4 py-2 border-b">Email</th>
//               <th className="px-4 py-2 border-b">Bank</th>
//               <th className="px-4 py-2 border-b">Payment Mode</th>
//               <th className="px-4 py-2 border-b">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donors.map((d) => (
//               <tr key={d.id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">{d.firstName} {d.lastName}</td>
//                 <td className="border px-4 py-2">{d.email}</td>
//                 <td className="border px-4 py-2">{d.bankName}</td>
//                 <td className="border px-4 py-2">{d.paymentMode}</td>
//                 <td className="border px-4 py-2">{d.amount}</td>
//               </tr>
//             ))}
//             {donors.length === 0 && !loading && (
//               <tr>
//                 <td colSpan={5} className="text-center p-4 text-gray-500">
//                   No donors found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import config from "../src/config";
import { FiInfo } from "react-icons/fi";

export default function FilterDonors() {
  const API_BASE = `${config.API_URL}/api/donors`;
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, getValues, reset } = useForm();

  const fetchAllDonors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/all`);
      setDonors(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch donors");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllDonors();
  }, []);

  const searchDonors = async () => {
    const values = getValues();
    const payload = {};

    if (values.searchTerm && values.searchField) payload[values.searchField] = values.searchTerm;

    if (values.dateFrom || values.dateTo || values.exactDate) {
      payload.date = {};
      if (values.dateFrom) payload.date.from = values.dateFrom;
      if (values.dateTo) payload.date.to = values.dateTo;
      if (values.exactDate) payload.date.exact = values.exactDate;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/filter`, payload);
      setDonors(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch filtered donors");
    }
    setLoading(false);
  };

  const resetFilters = () => {
    reset();
    fetchAllDonors();
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
        Filter Donors
      </h2>

      {/* Filter Form */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 hover:shadow-3xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-6 text-purple-700 flex items-center">
          Text Search <FiInfo className="ml-2 text-gray-400 cursor-pointer" title="Enter a value and select the field to search in." />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col relative">
            <label className="text-gray-600 mb-2 font-medium">Search Term</label>
            <input
              {...register("searchTerm")}
              placeholder="Enter value"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <small className="text-gray-400 mt-1">
              Text to search in the selected field
            </small>
          </div>

          <div className="flex flex-col relative">
            <label className="text-gray-600 mb-2 font-medium">Search Field</label>
            <select
              {...register("searchField")}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="">Select Field</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="bankName">Bank Name</option>
              <option value="paymentMode">Payment Mode</option>
              <option value="frequency">Frequency</option>
            </select>
            <small className="text-gray-400 mt-1">
              Field to apply the search
            </small>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-purple-700 flex items-center">
          Date Filter <FiInfo className="ml-2 text-gray-400 cursor-pointer" title="You can filter by date range or exact date." />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 font-medium">From Date</label>
            <input
              type="date"
              {...register("dateFrom")}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <small className="text-gray-400 mt-1">Start date</small>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 font-medium">To Date</label>
            <input
              type="date"
              {...register("dateTo")}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <small className="text-gray-400 mt-1">End date</small>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 font-medium">Exact Date</label>
            <input
              type="date"
              {...register("exactDate")}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <small className="text-gray-400 mt-1">Search specific date</small>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <button
            onClick={searchDonors}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-600 transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Donors Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl p-4">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-purple-200 to-pink-200 text-left">
              <th className="px-6 py-3 border-b text-gray-700">Name</th>
              <th className="px-6 py-3 border-b text-gray-700">Email</th>
              <th className="px-6 py-3 border-b text-gray-700">Bank</th>
              <th className="px-6 py-3 border-b text-gray-700">Payment Mode</th>
              <th className="px-6 py-3 border-b text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d, idx) => (
              <tr
                key={d.id}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50 transition`}
              >
                <td className="border px-6 py-3">{d.firstName} {d.lastName}</td>
                <td className="border px-6 py-3">{d.email}</td>
                <td className="border px-6 py-3">{d.bankName}</td>
                <td className="border px-6 py-3">{d.paymentMode}</td>
                <td className="border px-6 py-3">{d.amount}</td>
              </tr>
            ))}
            {donors.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
