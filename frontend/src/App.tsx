import React, {FC, useState, useEffect, SyntheticEvent} from 'react';
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

    type dataType = {
        id: string,
        title: string,
        contents: string
    }
    type dataArray = dataType[]


    const [data, setData] = useState<dataArray>([])
    const [loading, setLoading] = useState(true)

    const [renshu, setRenshu] = useState("")


    const fetchData = async () => {
        const response = await axios.get("/api/v1/something/")

        // setUser("hogehogehoge")
        // setLoading(false)
        console.log(response)
        console.log(response.data)
        console.log(response.data[0].contents)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const getButton = async () => {
        const res = await axios.get("/api/v1/something/")

        console.log([...res.data])
        setData([...res.data])
        setLoading(false)

        console.log(data)
    }

    const postData = {
        title: "test",
        contents: "testtesttest",
    }

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
    }

    const handleChange = (e: SyntheticEvent<HTMLElement>) => {
        setRenshu((e.target as HTMLInputElement).value)
    }

    const handleSubmit = (e: SyntheticEvent<HTMLElement>) => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        }

        const buttonData = {
            title: "button-data",
            contents: renshu
        }

        const response = axios.post("/api/v1/something/", buttonData, config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

        console.log(response)
    }

    return (
        <div className="App">
            <p>Do something.</p>

            <div>
                <p>reduxで設定したstateの値は{count}です</p>
                <button onClick={() => dispatch(somethingSlice.actions.added(1))}>たす</button>
            </div>

            <h2>GETの練習</h2>
            <button onClick={() => getButton()}>GET</button>
            <div>
                {loading ? <p>GETボタン押したら内容が変わるよ</p> : <p>{data[0].title}</p>}
            </div>


            <h2>POSTの練習</h2>
            <button onClick={() => postButton()}>post</button>

            <div>
                <form onSubmit={handleSubmit}>
                    <p>入力中: {renshu}</p>
                    <input type="text" value={renshu} name="name" onChange={handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        </div>
    )
}

export default App;
