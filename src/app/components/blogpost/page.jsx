"use client";

import React from "react";
import Image from 'next/image'

const page = ({ Title, ImageUrl, Author, PublishedDate, Content }) => {
  const currentDate = new Date(PublishedDate);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(formattedDate);


  console.log(Title,ImageUrl);
  return (
    <div className="container w-full my-2 mb-10 rounded-xl bg-stone-100 md:flex blog-post">
      <div className=" md:w-1/3 md:h-full">
      <Image width={500} height={500}  src={ImageUrl} alt={ImageUrl} />
      </div>
      <div className="md:w-2/3">
      <h2 className="pb-8 text-xl font-bold lg:text-3xl ">{Title}</h2>
      <p>
        <strong>Author:</strong> {Author}
      </p>
      <p className="pb-2 text-xs italic">Published Date {formattedDate}
      </p>
      <p className="text-justify">{Content}</p>
      </div>
      
    </div>
  );
};

export default page;
