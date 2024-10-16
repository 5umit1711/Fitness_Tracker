'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../_config/firebase';
import WorkoutChart from '../_components/WorkoutChart';
import TimeSpentChart from '../_components/TimeSpentChart';
import GoalsChart from '../_components/GoalsChart';

const DashBoard = () => {
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalTimeSpent, setTotalTimeSpent] = useState(0);
    const [achievedGoals, setAchievedGoals] = useState(0);
    const [notAchievedGoals, setNotAchievedGoals] = useState(0);
    const [totalGoals, setTotalGoals] = useState(0);

    const fetchWorkoutData = async () => {
        const workoutsCollection = collection(db, 'Workouts');
        const workoutSnapshot = await getDocs(workoutsCollection);

        let totalCaloriesBurned = 0;
        let totalMinutesSpent = 0;

        workoutSnapshot.forEach(doc => {
            const data = doc.data();
            totalCaloriesBurned += Number(data.calories);
            totalMinutesSpent += Number(data.duration);
        });

        setTotalCalories(totalCaloriesBurned);
        setTotalTimeSpent(totalMinutesSpent);
    };

    const fetchGoalsData = async () => {
        const goalsCollection = collection(db, 'Goals');
        const goalsSnapshot = await getDocs(goalsCollection);

        let achieved = 0;
        let notAchieved = 0;
        let goals = 0;

        goalsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.isAchieved) {
                achieved += 1;
            } else {
                notAchieved += 1;
            }
            goals += 1;
        });
        setAchievedGoals(achieved);
        setNotAchievedGoals(notAchieved);
        setTotalGoals(goals);
    };

    useEffect(() => {
        fetchWorkoutData();
        fetchGoalsData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 flex flex-col items-center p-6">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6'>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">Total Calories Burned</h3>
                    <p className="text-3xl font-extrabold">{totalCalories} <span className="text-base font-medium">cal</span></p>
                </div>
                
                <div className="bg-gradient-to-r from-teal-400 to-blue-400 text-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">Total Time Spent</h3>
                    <p className="text-3xl font-extrabold">{totalTimeSpent} <span className="text-base font-medium">min</span></p>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-lime-500 text-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">Achieved Goals</h3>
                    <p className="text-3xl font-extrabold">{achievedGoals}</p>
                </div>
                
                <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">Not Achieved Goals</h3>
                    <p className="text-3xl font-extrabold">{notAchievedGoals}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
                <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
                    <WorkoutChart totalCalories={totalCalories} />
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
                    <TimeSpentChart totalTimeSpent={totalTimeSpent} />
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
                    <GoalsChart totalGoals={totalGoals} achievedGoals={achievedGoals} />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
