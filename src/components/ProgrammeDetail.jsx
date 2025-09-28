// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import config from "../config";

// const ProgrammeDetail = () => {
//   const { id } = useParams();
//   const [programme, setProgramme] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${config.API_URL}/api/programmes/${id}`)
//       .then((res) => setProgramme(res.data))
//       .catch((err) => console.error("Error fetching programme:", err));
//   }, [id]);

//   if (!programme) return <p>Loading...</p>;

//   return (
//     <div className="p-8 text-center">
//       <img
//         src={`${config.API_URL}/uploads/icons/${programme.icon}`}
//         alt={programme.title}
//         className="w-20 h-20 mx-auto mb-6"
//       />
//       <h1 className="text-3xl font-bold" style={{ color: programme.color }}>
//         {programme.title}
//       </h1>
//       <p className="mt-4 text-lg">{programme.description}</p>
//     </div>
//   );
// };

// export default ProgrammeDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const ProgrammeDetail = () => {
  const { id } = useParams();
  const [programme, setProgramme] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/programmes/${id}`)
      .then((res) => setProgramme(res.data))
      .catch((err) => console.error("Error fetching programme:", err));
  }, [id]);

  if (!programme) return <p className="text-center py-10 text-white">Loading programme...</p>;

  return (
    <div className="p-8 text-center min-h-screen bg-heroBG">
      <img
        src={programme.icon || "https://via.placeholder.com/80"}
        alt={programme.title}
        className="w-20 h-20 mx-auto mb-6 object-contain"
      />
      <h1 className="text-3xl font-bold mb-4" style={{ color: programme.color }}>
        {programme.title}
      </h1>
      <p className="mt-4 text-lg text-white max-w-3xl mx-auto break-words whitespace-normal leading-relaxed">
        {programme.description}
      </p>
    </div>
  );
};

export default ProgrammeDetail;
