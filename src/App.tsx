import { useState } from "react";

function App() {
  const baseApiUrl =
    "https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile";

  const [handle, setHandle] = useState("");
  const [pfp, setPfp] = useState("");

  const fetchBskyPfp = async (handle) => {
    try {
      const apiUrl = `${baseApiUrl}?actor=${encodeURIComponent(handle)}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPfp(data.avatar);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const refreshPage = () => {
    setHandle("");
    setPfp("");
  };

  return (
    <div className="bg-[#000] flex flex-col justify-center items-center h-screen">
      <img
        src="./logo.jpg"
        alt="emo swag girl"
        className="text-white w-[6em]"
      ></img>
      <h1 className="text-white font-mono text-3xl">emo-swag</h1>
      <div className="mt-4 home max-w-4xl mx-auto">
        {pfp ? (
          <div className="flex flex-col items-center">
            <img
              src={pfp}
              alt="Profile"
              className="w-32 h-32 rounded-full border border-gray-700"
            />
            <button
              className="mt-4 bg-[#191919] border border-gray-700 rounded-md p-2 text-xs text-white font-mono hover:bg-[#1f1f1f] hover:border-gray-700"
              onClick={refreshPage}
            >
              find another
            </button>
          </div>
        ) : (
          <>
            <div className="input-container">
              <input
                id="link-area"
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                maxLength={256}
                placeholder="reminisced.bsky.social"
                aria-label="link input area"
                data-form-type="text"
                className="placeholder:text-[#333] min-w-72 w-full px-4 py-2 font-mono text-sm text-[#fff] placeholder-[#fff] bg-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#fff] focus:border-white-500"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>
            <div className="action-container flex justify-end font-mono text-white">
              <button
                className="search-btn bg-[#191919] border border-gray-700 rounded-md p-2 text-xs mt-2 hover:bg-[#1f1f1f] hover:border-gray-700"
                onClick={() => fetchBskyPfp(handle)}
              >
                search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
