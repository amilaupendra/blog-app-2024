"use client";

import { useState, useRef, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";
import AWS from 'aws-sdk'; // Import entire SDK (optional)
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from 'aws-sdk/clients/s3'; 

import BlogPost from "@/app/components/blogpost/page"

const page = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false)
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const[blogsArray, setblogsArray]= useState('')
  const currentDate = new Date();

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    // Add more supported types as needed
  ];


  const [showBlogForm, setShowBlogForm] = useState(false);



  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const uploadedImageUrl = await uploadFile();

      const formData = {
        Title: title,
        ImageUrl: uploadedImageUrl, // Use the returned URL here
        Author: author,
        PublishedDate: currentDate,
        Content: content,
      };

      console.log(formData);

      if (title !== "" && author !== "" && content !== "") {
        const url = "https://lxgn0999u8.execute-api.ap-south-1.amazonaws.com/dev/blogpost";

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Successfully submitted the form");
          setTitle("");
          setImage("");
          setAuthor("");
          setContent("");
          setImageUrl(""); // Clear the image URL
          setShowBlogForm(false);
          fetchData(); // Refresh the blog list after submission
        } else {
          alert("Error submitting the form");
        }
      } else {
        alert("Please fill in all the fields");
      }
    } catch (error) {
      alert("Error during form submission: " + error.message);
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
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
      setImage(selectedFile);
    } else {
      alert('Invalid file type. Only images and PDFs are allowed.');
    }
  };

  const uploadFile = async () => {
    setUploading(true)
    const S3_BUCKET = "fullstackblogsite"; // Replace with your bucket name
    const REGION = "ap-south-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIA5FTZBYONN7WVEO4L",
      secretAccessKey: "Aim23I4t1LF54W9qSZh2tge0X7lWgeZ1tYoUL0j4",
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: image.name,
      Body: image,
      ContentType: image.type,
    };
    
    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
      const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${image.name}`
      setImageUrl(url);
      setUploading(false)
      alert("File uploaded successfully.");
      return url;
    } catch (error) {
      console.error(error);
      setUploading(false)
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
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
            <img src="" />
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-semibold rounded-sm"
              />
            </div>
            <div className="flex justify-center mx-5 mb-2">
              {/* <label htmlFor="title">Author:</label> */}
              <input
                type="text"
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
                placeholder="Type your content here."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mx-5 bg-white">
              <button type="button">
                <ImageIcon onClick={handleIconClick} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden text-white"
                />
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <button className="btn" type="submit">
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
