import React, {FC, useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {SomethingState, somethingSlice} from "./features/something";

import axios from "axios";

import './App.css';

const backendUrl: string = 'http://localhost:8000';
axios.defaults.baseURL = backendUrl;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = backendUrl;

const App: FC = () => {
    const count: number = useSelector<SomethingState, number>((state => state.count))
    const dispatch = useDispatch();

    const [user, setUser] = useState("hogehoge")
    const [loading, setLoading] = useState(true)

    const fetchDate = async () => {
        const response = await axios.get("/api/v1/something/", {
            // withCredentials: true,
        })
        // const data = await response.json()
        // const [item] = data.results

        setUser("hogehogehoge")
        setLoading(false)
        console.log(response)
        console.log(response.data)
        console.log(response.data[0].contents)
    }

    useEffect(() => {
        fetchDate()
    }, [])


    const postData = {
        title: "test",
        contents: "testtesttest",
    }

    //うまくいった！
    //TODO: async/await方式に書き換える
    const postButton = () => {

        const config = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        }

        const response = axios.post("/api/v1/something/", postData, config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

        console.log(response)

        // console.log(axiosPost)
    }


    return (
        <div className="App">
            <p>Do something.</p>

            <div>
                <p>reduxで設定したstateの値は{count}です</p>
                <button onClick={() => dispatch(somethingSlice.actions.added(1))}>たす</button>
            </div>

            <div>
                {loading ? <h1>Loading...</h1> : <h1>{user}</h1>}
            </div>

            <button onClick={() => postButton()}>post</button>

        </div>
    )
}

export default App;
