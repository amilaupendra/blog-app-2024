"use client";

import { useState, useRef, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";

import BlogPost from "@/app/components/blogpost/page"

const page = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("image url");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const[blogsArray, setblogsArray]= useState('')
  const currentDate = new Date();


  const [showBlogForm, setShowBlogForm] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const submitForm = async (event) => {
    // event.preventDefault();
    const formData = {
      Title: title,
      ImageUrl: image,
      Author: author,
      PublishedDate: currentDate,
      Content: content,
    };

    console.log(formData);

    if (title != "" && author != "" && content != "") {
      const url =
        "https://lxgn0999u8.execute-api.ap-south-1.amazonaws.com/dev/blogpost";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        alert("succusfully submitted the form");
        setTitle(""); 
        setImage("");
        setAuthor("");
        setContent("");
        setDate("");
        setShowBlogForm(false);
      }
    } else {
      return alert("abc");
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await fetch("https://lxgn0999u8.execute-api.ap-south-1.amazonaws.com/dev/blogpost");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data:", data);
      setblogsArray(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    console.log("Selected image:", selectedImage);
    setImage("image url");
  };
  return (
    <div
      className={`h-svh md:mx-20 ${
        showBlogForm ? "bg-black bg-opacity-50" : ""
      } `}
    >
      <div className=" h-[40%] bg-black flex justify-center items-center">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowBlogForm(true)}
            className="bg-white rounded-lg w-96"
          >
            What's on your mind
          </button>
        </div>
      </div>
      {showBlogForm ? (
        <div
          className={`flex justify-center w-full h-auto ${
            showBlogForm ? "" : "hidden"
          }`}
        >
          <form
            className="fixed flex-col items-center justify-center w-screen h-auto pb-5 bg-blue-900 top-20 lg:w-1/2 "
            onSubmit={submitForm}
          >
            <button
              onClick={() => setShowBlogForm(false)}
              className="text-red-50 float-end"
            >
              <HighlightOffIcon></HighlightOffIcon>
            </button>
            <div className="flex justify-center mx-5 mt-10 mb-2">
              {/* <label htmlFor="title">Title:</label> */}
              <input
                type="text"
                placeholder="Title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-semibold rounded-sm"
              />
            </div>
            <div className="flex justify-center mx-5 mb-2">
              {/* <label htmlFor="title">Author:</label> */}
              <input
                type="text"
                required
                placeholder="Author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-sm"
              />
            </div>

            <div className="flex justify-center mx-5">
              {/* <label htmlFor="content">Blog Content:</label> */}
              <textarea
                className="w-full h-[300px] rounded-sm resize-y"
                id="content"
                required
                placeholder="Type your content here."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mx-5 bg-white">
              <button>
                <ImageIcon onClick={handleIconClick} />
                <input
                disabled
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden text-white"
                />
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <button className="btn" type="Post">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        console.log("nothing happend..")
      )}

      {blogsArray ? (
        <div>
        <div className="blog-page">
          
          {blogsArray.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
      </div>
      ):''}

      
    </div>
  );
};

export default page;
