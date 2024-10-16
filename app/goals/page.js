"use client";

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../_config/firebase";
import { toast } from "react-toastify";

const Goals = () => {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState(null);
  const [pastGoals, setPastGoals] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchPastGoals(user.email);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "Goals"), {
          description,
          startDate,
          endDate,
          userId: user.uid,
          userEmail: user.email,
          isAchieved: false,
        });
        console.log("Goal successfully added!");
        fetchPastGoals(user.email);
      } catch (e) {
        console.error("Error adding goal: ", e);
      }
    }
  };

  const fetchPastGoals = async (email) => {
    try {
      const goalsQuery = query(
        collection(db, "Goals"),
        where("userEmail", "==", email)
      );
      const querySnapshot = await getDocs(goalsQuery);
      const goals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPastGoals(goals);
    } catch (e) {
      console.error("Error fetching goals: ", e);
    }
  };

  const handleCheckboxChange = async (goalId, newValue) => {
    try {
      const goalRef = doc(db, "Goals", goalId);
      await updateDoc(goalRef, {
        isAchieved: newValue,
      });
      toast.success("Goal Updated Successfully")
      fetchPastGoals(user.email); 
    } catch (e) {
      toast.error("Error updating goal: ", e);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-pink-50 min-h-screen">
      <div className="flex gap-10 h-screen p-8">
        <div className="bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500 text-white p-8 rounded-lg shadow-xl w-1/2 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-semibold mb-8 text-white">
            Post New Goal
          </h2>

          <label className="block mb-3 text-lg text-white">Goal Description</label>
          <input
            type="text"
            name="description"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="block mb-3 text-lg text-white">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="block mb-3 text-lg text-white">End Date</label>
          <input
            type="date"
            name="endDate"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition duration-200 shadow-lg"
            onClick={handleSubmit}
          >
            Submit Goal
          </button>
        </div>

        <div className="bg-gradient-to-l from-indigo-400 via-purple-400 to-pink-500 text-white p-8 rounded-lg shadow-xl w-1/2 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-semibold mb-8 text-white">
            Past Goals
          </h2>

          <div className="space-y-6 bg-white rounded-lg p-6 max-h-96 overflow-y-auto shadow-inner text-gray-800">
            {pastGoals.length > 0 ? (
              pastGoals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                  <p className="text-lg">
                    <strong className="text-indigo-500">Description:</strong> {goal.description} <br />
                    <strong className="text-indigo-500">Start Date:</strong> {new Date(goal.startDate).toDateString()} <br />
                    <strong className="text-indigo-500">End Date:</strong> {new Date(goal.endDate).toDateString()}
                  </p>

                  <div className="mt-2">
                    <label className="text-indigo-500 mr-2">Goal Completed:</label>
                    <input
                      type="checkbox"
                      checked={goal.isAchieved}
                      onChange={(e) => handleCheckboxChange(goal.id, e.target.checked)}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-center text-gray-700">No goals found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
