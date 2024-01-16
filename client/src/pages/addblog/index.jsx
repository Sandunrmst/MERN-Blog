import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setformData, isEdit, setIsEdit } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(formData);

  async function handleSaveBlogToDatabase() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;
    console.log(result);

    if (result) {
      setformData({ title: "", description: "" });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setformData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1 className="mb-4 font-bold">
        {isEdit ? "Edit a Blog" : "Add a Blog"}
      </h1>
      <div className={classes.formWrapper}>
        <input
          className="border rounded-md p-4"
          name="title"
          placeholder="Enter blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setformData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          className="border rounded-md p-4"
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(e) => {
            setformData({
              ...formData,
              description: e.target.value,
            });
          }}
        />
      </div>
      <button
        onClick={handleSaveBlogToDatabase}
        className="mt-4 p-2 px-4 text-white bg-orange-600 hover:bg-orange-700 transition-all duration-150 rounded-md"
      >
        {isEdit ? "Edit a Blog" : "Add a Blog"}
      </button>
    </div>
  );
}
