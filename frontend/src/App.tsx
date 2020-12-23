import React, {FC, useEffect, SyntheticEvent} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {somethingSlice, dataType, dataState} from "./features/something";

import axios from "axios";

import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";

import './App.css';


const backendUrl: string = 'http://localhost:8000';
axios.defaults.baseURL = backendUrl;


const App: FC = () => {
    const dataArray: dataType[] = useSelector<dataState, dataType[]>(state => state.dataArray);
    const inputData: string = useSelector<dataState, string>(state => state.input);
    const dispatch = useDispatch();


    //****************************
    // ページ読み込み時にデータを取得する
    //****************************
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


    //*****************************
    // ボタンを押したらデータを取得する
    //*****************************
    const getButton = async () => {
        const res = await axios.get("/api/v1/something/")

        // console.log([...res.data])
        dispatch(somethingSlice.actions.get(res.data))

        // setData([...res.data])
        // setLoading(false)
        // console.log("dataArray is ...")
        // console.log(dataArray)
        // console.log(dataArray[0])
    }


    //******************************
    // フォームに入力してPOSTする
    //******************************
    // フォームの入力値をstateを紐付ける
    const handleChange = (e: SyntheticEvent<HTMLElement>) => {
        dispatch(somethingSlice.actions.inputValue((e.target as HTMLInputElement).value))
    }

    // stateの値（フォームの値と紐付けられてる）をPOSTする
    const handleSubmit = (e: SyntheticEvent<HTMLElement>) => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        }

        const buttonData = {
            title: "button-data",
            contents: inputData
        }

        const response = axios.post("/api/v1/something/", buttonData, config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

        console.log("POSTしました")
        console.log(response)
    }


    //******************************
    // レンダーするコンポーネント
    //******************************
    return (
        <div className="App">
            <h2>Do something.</h2>

            <Card>
                <CardContent>
                    <h2>GETの練習</h2>
                    <Button variant="contained" color="primary" onClick={() => getButton()}>GET</Button>

                    {/*<p>{dataArray[0].title}</p>*/}
                    <div>
                        {dataArray.map((data) => (
                            <p key={data.id}>{data.contents}</p>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <h2>POSTの練習</h2>
            {/*<button onClick={() => postButton()}>post</button>*/}
            <div>
                <h3>入力中: {inputData}</h3>
                <form onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" variant="outlined" label="Do something" size="small" type="text" value={inputData} name="name"
                               onChange={handleChange}/>
                    {/*<input type="text" value={inputData} name="name" onChange={handleChange}/>*/}
                    <Button variant="contained" color="primary" type="submit" value="Submit" style={{marginLeft: "10px"}}>POST</Button>
                </form>
            </div>

        </div>
    )
}

export default App;
