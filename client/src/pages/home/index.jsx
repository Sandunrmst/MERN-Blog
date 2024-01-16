import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  async function fetchListOfBlogs() {
    setPending(true);

    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    console.log(getCurrentId);
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1 className="font-bold text-2xl mb-4 text-amber-700">Blog List</h1>
      {pending ? (
        <h1>Loading...! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList.map((item) => (
            <div
              className="border border-orange-700 p-4 rounded-md"
              key={item._id}
            >
              <p>{item.title}</p>
              <p>{item.description}</p>
              <div className="flex mt-4 gap-4">
                <FaEdit size={30} />
                <FaTrash onClick={() => handleDeleteBlog(item._id)} size={30} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
