"use client";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setTodo(e.target.value);
  }

  console.log("data>>", data)

  function onsubmitHandler() {
    if (todo.trim()) {
      setData((prev) => [...prev, todo]);
      setTodo("");
    }
  }

  function handleDelete(dlt: string) {
    setData((prevData) => prevData.filter((item) => item !== dlt));
  }

  function handleEdit(index: number) {
    const itemToEdit = data[index];
    setTodo(itemToEdit);
    setData((prevData) => prevData.filter((_, i) => i !== index));
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-10 px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">
          🌿 Your To-Do List
        </h1>

        <div className="max-w-xl mx-auto flex items-center gap-3 mb-6">
          <input
            value={todo}
            onChange={handleChange}
            placeholder="Add your task..."
            className="flex-grow text-black px-4 py-3 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onsubmitHandler();
              }
            }}
          />
          <button
            type="submit"
            onClick={onsubmitHandler}
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition shadow"
          >
            Add
          </button>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-2xl p-5 text-gray-800 border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    title="Edit"  
                    className="text-blue-500 hover:text-blue-700 text-lg"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete"
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    &times;
                  </button>
                </div>

                <p className="mt-6 text-lg font-medium break-words">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-12 text-lg">
            No tasks yet. Add your first one above! 🌱
          </p>
        )}
      </main>
    </>
  );
}
