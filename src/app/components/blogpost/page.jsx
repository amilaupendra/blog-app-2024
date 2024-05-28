import React from "react";

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
    <div className="w-full my-2 blog-post bg-slate-400">
      <h2 className="pb-2 font-bold ">{Title}</h2>
      <img className="w-[50%] h-[250px]" src={ImageUrl} alt={ImageUrl} />
      <p>
        <strong>Author:</strong> {Author}
      </p>
      <p className="pb-2 text-xs italic">Published Date {formattedDate}
      </p>
      <p className="text-justify">{Content}</p>
    </div>
  );
};

export default page;
