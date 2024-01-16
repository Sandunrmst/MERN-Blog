import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);

    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    console.log(getCurrentId);

    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );

    const result = await response.data;
    //Refresh blog list after delete the relavent post
    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  function handleEdit(getCurrentBlogItem) {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
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
              className="border-2 border-orange-700 p-4 rounded-xl"
              key={item._id}
            >
              <p>{item.title}</p>
              <p>{item.description}</p>
              <div className="flex mt-4 gap-4">
                <FaEdit
                  onClick={() => handleEdit(item)}
                  className="cursor-pointer text-gray-600"
                  size={30}
                />
                <FaTrash
                  className="cursor-pointer text-red-700"
                  onClick={() => handleDeleteBlog(item._id)}
                  size={30}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
