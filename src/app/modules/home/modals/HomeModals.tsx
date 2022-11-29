import { StationInfoGoogleMapModal } from 'app/components'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'setup/redux/Hooks'
import { homeActions, selectActionViewStationInfoGMModal } from '../redux/HomeSlice'

const HomeModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const isShowViewModal = useAppSelector(selectActionViewStationInfoGMModal);

    const closeModal = () => {
        dispatch(homeActions.setActionStationInfoModel({ status: false, data: null }));
    }

    return (
        <>
            <StationInfoGoogleMapModal isShowViewModal={isShowViewModal} closeModal={closeModal} />
        </>
    )
}

export default HomeModal
