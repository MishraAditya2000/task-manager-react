import React from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary';
import WeekStrip from '@components/WeekStrip/WeekStrip';
import ToDoList from '@components/ToDo/ToDoList';
const Home = () => {
    return (
            
        <ErrorBoundary>
            <ToDoList/>
        </ErrorBoundary>
    );
};

export default Home;
