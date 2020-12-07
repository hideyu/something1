import React, {FC} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {SomethingState, somethingSlice} from "./features/something";

import './App.css';


const App: FC = () => {
    const count:number = useSelector<SomethingState, number>((state => state.count))
    const dispatch = useDispatch();

    return (
        <div className="App">
            <p>Do something.</p>

            <div>
                <p>reduxで設定したstateの値は{count}です</p>
                <button onClick={()=>dispatch(somethingSlice.actions.added(1))}>たす</button>
            </div>

        </div>
    )
}

export default App;
