
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // ✅ useParams for update
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ServiceForm.css";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get serviceId from route
  const [isEditMode, setIsEditMode] = useState(false);

  const [serviceTitle, setServiceTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [serviceImages, setServiceImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [categories, setCategories] = useState([
    { categoryName: "", categoryPrice: "", description: "", productDetails: {}, categoryImage: [] },
  ]);

  
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axios
        .get(`${API_URL}/api/service/${id}`)
        .then((res) => {
          const data = res.data;
          setServiceTitle(data.serviceTitle || "");
          setShortDescription(data.shortDescription || "");
          setServiceImages(data.serviceImages || []);  // keep array of strings/URLs
          setCategories(
            data.category?.length > 0
              ? data.category.map((cat) => ({
                  categoryName: cat.categoryName || "",
                  categoryPrice: cat.categoryPrice || "",
                  description: cat.description || "",
                  productDetails: cat.productDetails || {},
                  categoryImage: cat.categoryImage || [], // ✅ preserve image names/urls
                }))
              : [
                  { categoryName: "", categoryPrice: "", description: "", productDetails: {}, categoryImage: [] },
                ]
          );
         setCategoryImages(
  data.category?.reduce((acc, cat, idx) => {
    acc[idx] = cat.categoryImage || []; // keep them as plain strings
    return acc;
  }, {})


  );

        })
        .catch((err) => console.error("Error fetching service:", err));
    }
  }, [id]);

  // multiple service images
  const handleServiceImages = (e) => {
    setServiceImages([...e.target.files]);
  };

  // category change
  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  // category images
  // const handleCategoryImages = (index, files) => {
  //   const newCategories = [...categories];
  //   newCategories[index].categoryImage = [...files];
  //   setCategories(newCategories);
  // };

  // add new category
  const addCategory = () => {
    setCategories([
      ...categories,
      { categoryName: "", categoryPrice: "", description: "", productDetails: {}, categoryImage: [] },
    ]);
  };
  
const handleCategoryImages = (index, files) => {
  const newCategories = [...categories];
  newCategories[index].categoryImage = [
    ...(newCategories[index].categoryImage || []), // keep existing
    ...files, // add new ones
  ];
  setCategories(newCategories);
};




  // cancel -> go back to servicelist
  const handleCancel = () => {
    navigate("/admin/services");
  };

  // ✅ Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serviceTitle", serviceTitle);
    formData.append("shortDescription", shortDescription);

    serviceImages.forEach((img) => formData.append("images", img)); 

    formData.append(
      "category",
      JSON.stringify(
        categories.map((cat) => ({
          categoryName: cat.categoryName,
          categoryPrice: cat.categoryPrice,
          description: cat.description,
          productDetails: cat.productDetails,
        }))
      )
    );

    categories.forEach((cat) => {
      if (cat.categoryImage.length > 0) {
        cat.categoryImage.forEach((img) => {
          formData.append("categoryImage", img);
        });
      }
    });

    try {
      let res;
      if (isEditMode) {
        // ✅ UPDATE API
        // res = await axios.put(`http://localhost:5012/api/service/${id}`, formData,

        res = await axios.put( `${API_URL}/api/service/${id}`,formData,{
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Service updated successfully!");
      } else {
        // ✅ CREATE API
        res = await axios.post(`${API_URL}/api/service/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Service created successfully!");
      }

      console.log(res.data);
      setTimeout(() => navigate("/servicelist"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving service");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isEditMode ? "Update Service" : "Add New Service"}</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>
            Service Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            placeholder="Enter service title"
            required
          />
        </div>

        <div className="form-group">
          <label>
            Short Description <span className="required">*</span>
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter short description"
            required
          />
        </div>

        {/* <div className="form-group">
          <label>
            Service Images {isEditMode ? "(Upload new to replace)" : ""} <span className="required">*</span>
          </label>
          <input type="file" multiple onChange={handleServiceImages} {...(!isEditMode && { required: true })} />
        </div> */}

<div className="form-group">
  <label>
    Service Images {isEditMode ? "(Upload new to replace)" : ""}{" "}
    <span className="required">*</span>
  </label>

  <div className="custom-file-input">
    <input
      type="file"
      multiple
      onChange={handleServiceImages}
      {...(!isEditMode && { required: true })}
    />
    <span className="file-names">
      {serviceImages
        ?.map((file) => (typeof file === "string" ? file.split("/").pop() : file.name))
        .join(", ")}
    </span>
  </div>
</div>


        <h3 className="section-title">Categories:</h3>
        {categories.map((cat, index) => (
          <div key={index} className="category-box">
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                value={cat.categoryName}
                onChange={(e) => handleCategoryChange(index, "categoryName", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={cat.categoryPrice}
                onChange={(e) => handleCategoryChange(index, "categoryPrice", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter description"
                value={cat.description}
                onChange={(e) => handleCategoryChange(index, "description", e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label>Category Images {isEditMode && "(Upload new to replace)"}</label>
              <input type="file" multiple onChange={(e) => handleCategoryImages(index, [...e.target.files])} />
            </div> */}

<div className="form-group mb-2">
  <label>
    Category Images {isEditMode && "(Upload new to add more)"}
  </label>

  <div style={{ position: "relative", width: "100%" }}>
    {/* Hidden native input */}
    <input
      id={`category-file-input-${index}`}
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => handleCategoryImages(index, [...e.target.files])}
      style={{
        position: "relative",
        zIndex: 2,
        opacity: 0,
        width: "100%",
        height: "38px",
        cursor: "pointer",
      }}
    />

    {/* Custom styled span (shows filenames inside the box) */}
    <span
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "38px",
        lineHeight: "38px",
        padding: "0 12px",
        width: "100%",
        border: "1px solid #ced4da",
        borderRadius: "0.375rem",
        background: "#fff",
        pointerEvents: "none",
        color: "#495057",
        fontSize: "0.9rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {categories[index].categoryImage?.length > 0
        ? categories[index].categoryImage
            .map((file) =>
              typeof file === "string" ? file.split("/").pop() : file.name
            )
            .join(" , ")
        : "Choose Files"}
    </span>
  </div>
</div>



            <h5 className="section-subtitle">Product Details:</h5>
            {Object.entries(cat.productDetails || {}).map(([key, value], detailIndex) => (
              <div key={detailIndex} className="form-group product-detail-row">
                <input
                  type="text"
                  placeholder="Enter Key"
                  value={key}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    const newDetails = { ...newCategories[index].productDetails };
                    const oldValue = newDetails[key];
                    delete newDetails[key];
                    newDetails[e.target.value] = oldValue;
                    newCategories[index].productDetails = newDetails;
                    setCategories(newCategories);
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter Value"
                  value={value}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[index].productDetails = {
                      ...newCategories[index].productDetails,
                      [key]: e.target.value,
                    };
                    setCategories(newCategories);
                  }}
                />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    const newCategories = [...categories];
                    const newDetails = { ...newCategories[index].productDetails };
                    delete newDetails[key];
                    newCategories[index].productDetails = newDetails;
                    setCategories(newCategories);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-small"
              onClick={() => {
                const newCategories = [...categories];
                newCategories[index].productDetails = {
                  ...newCategories[index].productDetails,
                  "": "",
                };
                setCategories(newCategories);
              }}
            >
              + Add Product Detail
            </button>
          </div>
        ))}

        <button type="button" onClick={addCategory} className="btn btn-secondary">
          + Add Another Category
        </button>

        <div className="form-actions">
          <button type="submit" className="btn btn-success" style={{ backgroundColor: "#1A1640" }}>
            {isEditMode ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ServiceForm;
