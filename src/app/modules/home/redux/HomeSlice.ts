import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../setup/redux/RootReducer';

export interface HomeState {
    actionViewStationInfoGMModal: boolean,
}

const initialState: HomeState = {
    actionViewStationInfoGMModal: false
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActionStationInfoModel(state, action: PayloadAction<{ status: boolean, data: any | null }>) {
            state.actionViewStationInfoGMModal = action.payload.status;
        },
    },
});

// Actions
export const homeActions = homeSlice.actions;

// Selectors
export const selectActionViewStationInfoGMModal = (state: RootState) => state.home.actionViewStationInfoGMModal;

// Reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;