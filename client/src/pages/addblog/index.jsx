import { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setformData } = useContext(GlobalContext);
  const navigate = useNavigation;

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

  return (
    <div className={classes.wrapper}>
      <h1 className="mb-4 font-bold">Add a Blog</h1>
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
        Add New Blog
      </button>
    </div>
  );
}
