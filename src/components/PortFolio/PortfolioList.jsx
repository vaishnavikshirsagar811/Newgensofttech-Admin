
// import React, { useEffect, useState } from "react";
// import api from "../../api/api";
// import PortfolioForm from "./PortfolioForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_BASE_URL;

// const PortfolioList = () => {
//   const [portfolios, setPortfolios] = useState([]);
//   const [selectedPortfolio, setSelectedPortfolio] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const fetchPortfolios = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/portfolio`);
//       const reversedData = [...res.data.data].reverse();
//       setPortfolios(reversedData);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       try {
//         await axios.delete(`${API_URL}/api/portfolio/${id}`);
//         toast.success("✅ Portfolio deleted successfully");
//         fetchPortfolios();
//       } catch (err) {
//         toast.error("❌ Failed to delete portfolio");
//       }
//     }
//   };

//   const handleSuccess = () => {
//     setShowForm(false);
//     setSelectedPortfolio(null);
//     fetchPortfolios();
//   };

//   useEffect(() => {
//     fetchPortfolios();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
//        <h4
//   className="fw-bold"
//   style={
//     showForm
//       ? { marginLeft: "20px" }  // Only apply margin when form is showing
//       : {}
//   }
// >
//   {showForm
//     ? selectedPortfolio
//       ? "Edit Portfolio"
//       : "Add New Portfolio"
//     : "All Portfolios"}
// </h4>

//         {!showForm && (
//           <button
//             className="btn btn-success"
//             onClick={() => {
//               setSelectedPortfolio(null);
//               setShowForm(true);
//             }}
//           >
//             Add Portfolio
//           </button>
//         )}
//       </div>

//       {showForm ? (
//         <PortfolioForm
//           selectedPortfolio={selectedPortfolio}
//           onSuccess={handleSuccess}
//           onCancel={() => {
//             setShowForm(false);
//             setSelectedPortfolio(null);
//           }}
//         />
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered text-center align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th style={{ width: "20%" }}>Image</th>
//                 <th style={{ width: "25%" }}>Title</th>
//                 <th style={{ width: "25%" }}>Category</th>
//                 <th style={{ width: "25%" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {portfolios.length > 0 ? (
//                 portfolios.map((portfolio) => (
//                   <tr key={portfolio._id}>
//                     <td>
//                       {portfolio.image ? (
//                         <img
//                           src={portfolio.image}
//                           alt="portfolio"
//                           style={{ width: 60, height: 60, objectFit: "cover" }}
//                         />
//                       ) : (
//                         "No Image"
//                       )}
//                     </td>
//                     <td>{portfolio.title}</td>
//                     <td>{portfolio.category}</td>
//                     <td>
//                       <button
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => {
//                           setSelectedPortfolio(portfolio);
//                           setShowForm(true);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(portfolio._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-muted py-3">
//                     No portfolios found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PortfolioList;


import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PortfolioForm from "./PortfolioForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/portfolio`);
      const reversedData = [...res.data.data].reverse();
      setPortfolios(reversedData);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${API_URL}/api/portfolio/${id}`);
        toast.success("✅ Portfolio deleted successfully");
        fetchPortfolios();
      } catch (err) {
        toast.error("❌ Failed to delete portfolio");
      }
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedPortfolio(null);
    fetchPortfolios();
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4
          className="fw-bold"
          style={showForm ? { marginLeft: "55px" } : {}}
        >
          {showForm
            ? selectedPortfolio
              ? "Edit Portfolio"
              : "Add New Portfolio"
            : "All Portfolios"}
        </h4>

        {!showForm && (
          <button
            className="btn btn-success"
            style={{ background: "linear-gradient(90deg, #28235c, #a31d28)" }}
            onClick={() => {
              setSelectedPortfolio(null);
              setShowForm(true);
            }}
          >
            Add Portfolio
          </button>
        )}
      </div>

      {showForm ? (
        <PortfolioForm
          selectedPortfolio={selectedPortfolio}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setSelectedPortfolio(null);
          }}
        />
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "20%" }}>Image</th>
                <th style={{ width: "25%" }}>Title</th>
                 <th style={{ width: "20%" }}>Location</th>
                {/* <th style={{ width: "25%" }}>Category</th> */}
                <th style={{ width: "25%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <tr key={portfolio._id}>
                    <td>
                      {portfolio.primaryImage ? (
                        <img
                          src={portfolio.primaryImage}
                          alt="portfolio"
                          style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{portfolio.title}</td>
                    {/* <td>{portfolio.category}</td> */}
                    <td>{portfolio.location || "—"}</td>
               
               
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                          setSelectedPortfolio(portfolio);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(portfolio._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted py-3">
                    No portfolios found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
