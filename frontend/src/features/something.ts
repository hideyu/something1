import {createSlice, PayloadAction} from '@reduxjs/toolkit';

//**********************
// stateの型定義
//**********************
export type dataType = {
    id: string,
    title: string,
    contents: string
}
export type dataState = {
    dataArray: dataType[],
    input: string
}

//**********************
// createSliceの初期値
//**********************
const initialState: dataState = {
    dataArray: [{id:"", title:"", contents:""}],
    input: ""
}

//**********************
// createSliceの本体
//**********************
export const somethingSlice = createSlice({
    name: 'something',
    initialState,
    reducers: {
        get: (state: dataState, action: PayloadAction<dataType[]>) => ({
            dataArray: action.payload,
            input: ""
        }),

        inputValue: (state: dataState, action: PayloadAction<string>) => ({
            ...state,
            input: action.payload
        })
    },
});

