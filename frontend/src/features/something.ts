import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SomethingState = {
  count: number;
};

const initialState: SomethingState = { count: 0 };

export const somethingSlice = createSlice({
  name: 'something',
  initialState,
  reducers: {
    added: (state: SomethingState, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
  },
});