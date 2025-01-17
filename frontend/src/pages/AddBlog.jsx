import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { PiSpinnerBallBold } from "react-icons/pi";
const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    categories: "",
    author: "",
  });

  const handleChange = (e)=>{
    const{name, value} =e.target
    setFormData((prev) =>({...prev, [name]:value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://blog-app-uylh.onrender.com/api/v1/blogs",
        formData
      );

      if (response.status === 201) {
        toast.success("blog successfully added 😊 ");
      }
    } catch (err) {
      setError(
        err.response.data.message || err.response.data.err || err.message
      );
      return toast.error(error || "something went wrong 😊 ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-cyan-300 h-svh flex justify-center items-center text-cyan-50">
        <form
          onSubmit={handleSubmit}
          className="p-5 shadow-xl bg-cyan-700 rounded-md space-y-2 sm:w-1/2"
        >
          <h2 className="font-tangerine text-5xl font-bold text-center">
            Add Blog
          </h2>

          <div>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              className="w-full p-2 rounded-md text-gray-700"
            />
          </div>

         

          <div>
            <label htmlFor="body" className="label">
              Content
            </label>
            <textarea

              rows={3}  
              name="body"
              onChange={handleChange}
              id="body"
              className="w-full p-2 rounded-md text-gray-700"
            ></textarea>
          </div>

          <div>
            <label htmlFor="categories" className="label">
              Category
            </label>

            <select
              name="categories"
              id=""
              className="w-full p-2 rounded-md text-gray-700"
              onChange={handleChange}

            >
              <option value="">--</option>
              <option value="tech">Tech</option>
              <option value="food ">Food</option>
              <option value="travel">Travel</option>
              <option value="music">Music</option>
              <option value="music">Sport</option>

            </select>
          </div>

          <div>
            <label htmlFor="author" className="label">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              onChange={handleChange}
              className="w-full p-2 rounded-md text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold p-2 rounded-md bg-cyan-500 mt-5 grid place-content-center transition-all duration-300 text-xl
                    hover:text-gray-700 hover:bg-rose-500"
          >
            {loading ? (
              <PiSpinnerBallBold className="animate-spin text-2xl" />
            ) : (
              "Add Blog"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
