"use client";
import React, { useState } from "react";

import { type Article } from "@root/generated/prisma/client";
import Link from "next/link";
import { DeleteResult } from "./action";

type AdminClientProps = {
  articles: Article[];
  onDeleteArticlesHandler: (deletingIds: Array<number>) => Promise<DeleteResult>;
};

export default function AdminClient(props: AdminClientProps) {
  const [language, setLanguage] = useState("english");
  const [response, setResponse] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [selected, setSelected] = useState(new Set<number>());

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setGenerateError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.result || JSON.stringify(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setGenerateError(errorMessage);
      console.error("Generation error:", err);
    } finally {
      setIsSent(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handlDeleteArticle = async (ids: number[]) => {
    const idsToDelete = new Set<number>(ids);
    setSelected(idsToDelete);
    const res = await props.onDeleteArticlesHandler([...idsToDelete]);
    console.log(res);
    if (!res.ok) {
      setDeleteError(res.message);
    } else {
      setDeleteError("");
    }
  };

  return (
    <>
      <form className="m-10 mb-2 flex flex-col gap-2" onSubmit={handleGenerate}>
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
        {/* <div className="m-auto">
          <input
            id="japanese"
            type="radio"
            name="language"
            value="japanese"
            checked={language === "japanese"}
            onChange={() => setLanguage("japanese")}
          />
          <label htmlFor="japanese">Japanese</label>
        </div> */}
        <button className="min-w-30 m-auto btn btn-primary" type="submit" disabled={isSent}>
          {isSent ? "Generating..." : "Generate"}
        </button>
      </form>

      {generateError && (
        <div className="m-10 mt-2 flex flex-col">
          <div className="alert alert-error">
            <span>Error: {generateError}</span>
          </div>
        </div>
      )}

      <div className="m-10 mt-2 flex flex-col">
        {response && (
          <div className="container mx-auto px-4">
            <strong>Response:</strong>
            <code className="text-wrap">{response}</code>
          </div>
        )}
        <button className="min-w-30 m-auto btn btn-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <ul className="divide-y rounded border">
        <li className="flex flex-col">
          <button
            className="btn btn-error text-sm mx-auto my-2"
            onClick={() => handlDeleteArticle([...selected])}
          >
            Delete Selected Articles
          </button>
          {deleteError && (
            <div className="m-10 mt-2 flex flex-col">
              <div className="alert alert-error">
                <span>Error: {deleteError}</span>
              </div>
            </div>
          )}
        </li>
        {props.articles.map((a) => (
          <li key={a.id} className="flex items-center justify-between p-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.has(a.id)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const id = a.id;
                  setSelected((prev) => {
                    const next = new Set(prev);
                    if (isChecked) {
                      next.add(id);
                    } else {
                      next.delete(id);
                    }
                    return next;
                  });
                }}
              />
              <span className="font-medium">
                <Link href={`/articles/${a.id}`}>{a.title}</Link>
              </span>
            </label>
            <button onClick={() => handlDeleteArticle([a.id])} className="btn btn-error text-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
