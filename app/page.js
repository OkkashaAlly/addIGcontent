"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const token =
    "IGQVJVR2lWOGU2M2RLamdpc0JuVVRqNW8ySzBFaTZAVcXJUWnFNRVdHXzVYc09SZA1ZAjNG15SkJVSXc1NWpNTzJOQ1o5d3d4M1hVMEUtdHJLOWRpNVdZAbmZAxb2ZAVdVloSjFEeUZAqcjhTRklUWjRyeDJfeQZDZD";

  const INSTAGRAM_CLIENT_ID = "1316832365714113";
  const INSTAGRAM_CLIENT_SECRET = "024150d52dbdb4ef7c9ad9dcf10e2c6c";

  console.log("code: ", code);
  console.log("INSTAGRAM_CLIENT_ID: ", INSTAGRAM_CLIENT_ID);
  console.log("INSTAGRAM_CLIENT_SECRET: ", INSTAGRAM_CLIENT_SECRET);

  const url = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=https://add-ig-content.vercel.app/&scope=user_profile,user_media&response_type=${token}`;

  const getData = async () => {
    const response = await axios.get(
      `https://graph.instagram.com/${INSTAGRAM_CLIENT_ID}?fields=id,media_type,media_url,username,timestamp&access_token={access-token}`
    );

    const data = await response.json();

    console.log("data: ", data);
  };

  return (
    <main>
      {!code ? (
        <a href={url}>Sign In instagram</a>
      ) : (
        <button onClick={getData}>Get user data</button>
      )}
    </main>
  );
}
