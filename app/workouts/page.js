"use client";

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../_config/firebase";
import { toast } from "react-toastify";

const Workout = () => {
  const [calories, setCalories] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [workout, setWorkout] = useState("");
  const [user, setUser] = useState(null);
  const [pastWorkouts, setPastWorkouts] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchPastWorkouts(user.email);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "Workouts"), {
          calories,
          duration,
          date,
          workoutType: workout,
          userId: user.uid,
          userEmail: user.email,
        });
        toast.success("Workout successfully added!");
        fetchPastWorkouts(user.email);
      } catch (e) {
        toast.error("Error adding workout: ", e);
      }
    }
  };

  const fetchPastWorkouts = async (email) => {
    try {
      const workoutsQuery = query(collection(db, "Workouts"), where("userEmail", "==", email));
      const querySnapshot = await getDocs(workoutsQuery);
      const workouts = querySnapshot.docs.map((doc) => doc.data());
      setPastWorkouts(workouts);
    } catch (e) {
      console.error("Error fetching workouts: ", e);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-pink-50 min-h-screen">
      <div className="flex gap-10 h-screen p-8">
        <div className="bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500 text-white p-8 rounded-lg shadow-xl w-1/2 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-semibold mb-8 text-white">
            Log Your Workout
          </h2>

          <label className="block mb-3 text-lg text-white">Calories Burned</label>
          <input
            type="number"
            name="calories"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <label className="block mb-3 text-lg text-white">Duration (Minutes)</label>
          <input
            type="number"
            name="duration"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <label className="block mb-3 text-lg text-white">Workout Date</label>
          <input
            type="date"
            name="date"
            className="w-full rounded-md p-4 mb-6 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block mb-3 text-lg text-white">Workout Type</label>
          <select
            name="type"
            className="w-full rounded-md p-4 mb-8 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            required
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="swimming">Swimming</option>
          </select>

          <button
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition duration-200 shadow-lg"
            onClick={handleSubmit}
          >
            Submit Workout
          </button>
        </div>

        <div className="bg-gradient-to-l from-indigo-400 via-purple-400 to-pink-500 text-white p-8 rounded-lg shadow-xl w-1/2 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-semibold mb-8 text-white">
            Previous Workouts
          </h2>

          <div className="space-y-6 bg-white rounded-lg p-6 max-h-96 overflow-y-auto shadow-inner text-gray-800">
            {pastWorkouts.length > 0 ? (
              pastWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                  <p className="text-lg">
                    <strong className="text-indigo-500">Calories Burned:</strong> {workout.calories} cal <br />
                    <strong className="text-indigo-500">Duration:</strong> {workout.duration} minutes <br />
                    <strong className="text-indigo-500">Date:</strong> {new Date(workout.date).toDateString()} <br />
                    <strong className="text-indigo-500">Type:</strong> {workout.workoutType}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-lg text-center text-gray-700">No workouts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
