"use client";
import { useState } from "react";

import axios from "axios";
// import { useSearchParams } from "next/navigation";

export default function Home() {
  const [userData, setUserData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState([]);
  const [selected, setSelected] = useState([]);
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,caption&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
      );

      const { data } = response.data;
      setUserData(data);
      setLoading(false);
      console.log("userData: ", userData);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
      setLoading(false);
    }
  };

  const handelSelected = selected => {
    setUpload(prevState => [...prevState, selected]);
    setSelected(prevState => [...prevState, selected.id]);
  };

  console.log("upload: ", upload);

  return (
    <main>
      <div className="flex justify-center my-8">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <div>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
          </div>
        ) : !userData ? (
          <button
            className="bg-blue-500 rounded-full py-2 px-3 text-white text-center"
            onClick={getData}
          >
            Get IG data
          </button>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold text-center mt-6 mb-8">
              Instagram data
            </h1>
            <div className="mb-14 text-center">
              <p>
                Select photo by clicking on it and then click on the button
                below to upload it
              </p>
              <button
                className="bg-slate-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => alert("uploading")}
              >
                Upload
              </button>
            </div>
            <ul className="grid grid-cols-3 gap-4 mx-auto">
              {userData &&
                userData.map(item => {
                  const active = selected.includes(item.id);

                  console.log("active: ", active);

                  return (
                    <li key={item.id}>
                      <div
                        className={`w-[300px] h-[300px] bg-slate-100 rounded overflow-hidden cursor-pointer relative`}
                        onClick={() =>
                          handelSelected({
                            id: item.id,
                            media_type: item.media_type,
                            media_url: item.media_url,
                            permalink: item.permalink,
                            thumbnail_url: item.thumbnail_url,
                          })
                        }
                      >
                        {active && (
                          <div className="absolute top-4 right-4 bg-red-100 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-slate-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.media_url}
                          alt={item.caption}
                          className="list_image rounded-md"
                          // width={50}
                          // height={80}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
