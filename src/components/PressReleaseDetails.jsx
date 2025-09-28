// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const PressReleaseDetails = () => {
//   const { id } = useParams();
//   const [pressRelease, setPressRelease] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/press-releases/${id}`)
//       .then((res) => setPressRelease(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!pressRelease) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <img
//         src={release.imageUrl
//                     ? `http://localhost:8080/uploads/${release.imageUrl}`
//                     : "https://via.placeholder.com/300x200?text=No+Image"}
//         alt={pressRelease.title}
//         className="w-full h-64 object-cover rounded-md mb-4"
//       />
//       <h1 className="text-3xl font-bold mb-2">{pressRelease.title}</h1>
//       <p className="text-green-700"> • {pressRelease.date}</p>
//       <div className="mt-4 text-gray-800">{pressRelease.content}</div>
//     </div>
//   );
// };

// export default PressReleaseDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const PressReleaseDetails = () => {
  const { id } = useParams();
  const [pressRelease, setPressRelease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/press-releases/${id}`)
      .then((res) => {
        setPressRelease(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching press release details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!pressRelease) return <p className="p-6">Press release not found.</p>;

  return (
    <div className="p-6">
      <img
        src={
          pressRelease.imageUrl
            ? pressRelease.imageUrl
            : "https://via.placeholder.com/600x400?text=No+Image"
        }
        alt={pressRelease.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{pressRelease.title}</h1>
      <p className="text-green-700"> • {pressRelease.date}</p>
      <div className="mt-4 text-gray-800 whitespace-pre-line">
        {pressRelease.content || pressRelease.excerpt}
      </div>
    </div>
  );
};

export default PressReleaseDetails;
