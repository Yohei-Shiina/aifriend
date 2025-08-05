"use client";

import React, { useState } from "react";

export default function AdminClient() {
  const [language, setLanguage] = useState("english");
  const [response, setResponse] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
    const data = await res.json();
    setResponse(data.result || JSON.stringify(data));
    setIsSent(false);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    location.href = "/login"; // ログアウト後に再読み込みして再判定
  };

  return (
    <>
      <form className="m-10 mb-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="m-auto">
          <input
            id="english"
            type="radio"
            name="language"
            value="english"
            checked={language === "english"}
            onChange={() => setLanguage("english")}
          />
          <label htmlFor="english">English</label>
        </div>
        <div className="m-auto">
          <input
            id="japanese"
            type="radio"
            name="language"
            value="japanese"
            checked={language === "japanese"}
            onChange={() => setLanguage("japanese")}
          />
          <label htmlFor="japanese">Japanese</label>
        </div>
        <button className="min-w-30 m-auto btn btn-primary" type="submit" disabled={isSent}>
          Generate
        </button>
      </form>

      <div className="m-10 mt-2 flex flex-col">
        {response && (
          <div className="container">
            <strong>Response:</strong>
            <pre>{response}</pre>
          </div>
        )}
        <button className="min-w-30 m-auto btn btn-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
