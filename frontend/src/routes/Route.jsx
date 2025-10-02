/** @format */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from '../components/header/Header'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Localization from '../pages/localization/Localization'
import EquipmentMenu from '../pages/equipment/equipment_menu/EquipmentMenu'
import EquipmentType from '../pages/equipment/equipment_type/EquipmentType'
import Unity from '../pages/unity/Unity'
import Owner from '../pages/owner/Owner'
import CalibrationPeriodicity from '../pages/calibration_periodicity/CalibrationPeriodicity'
import Equipment from '../pages/equipment/Equipment'
import Calibration from '../pages/calibration/Calibration'
import CalibrationConfig from '../pages/config/CalibrationConfig'
import CalibrationMenu from '../pages/calibration/CalibrationMenu'
import CalibrationAnalysisDefinition from '../pages/calibration/calibration_analysis/CalibrationAnalysisDefinition'
import CalibrationAnalysisList from '../pages/calibration/calibration_analysis/CalibrationAnalysisList'
import CalibrationFinalList from '../pages/calibration/calibration_final/CalibrationFinalList'
import CalibrationGeral from '../pages/calibration/calibration_final/calibration_geral/CalibrationGeral'

export default function CalibrationRoutes({ children }) {
	return (
		<>
			<Router>
				<Toaster /> {/**@description -> Library to create toast */}
				<Header /> {children}
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/localization'
						element={<Localization />}
					/>
					<Route
						path='/equipment_menu'
						element={<EquipmentMenu />}
					/>
					<Route
						path='/equipment_type'
						element={<EquipmentType />}
					/>
					<Route
						path='/unity'
						element={<Unity />}
					/>
					<Route
						path='/owner'
						element={<Owner />}
					/>
					<Route
						path='/calibration_periodicity'
						element={<CalibrationPeriodicity />}
					/>
					<Route
						path='/equipment'
						element={<Equipment />}
					/>
					<Route
						path='/calibration_menu'
						element={<CalibrationMenu />}
					/>
					<Route
						path='/calibration'
						element={<Calibration />}
					/>
					<Route
						path='/calibration_analysis_list'
						element={<CalibrationAnalysisList />}
					/>
					<Route
						path='/calibration_analysis_definition'
						element={<CalibrationAnalysisDefinition />}
					/>
					<Route
						path='/calibration_final_list'
						element={<CalibrationFinalList />}
					/>
					<Route
						path='/calibration_geral'
						element={<CalibrationGeral />}
					/>
					<Route
						path='/calibration_config'
						element={<CalibrationConfig />}
					/>
				</Routes>
				{/* <Footer /> */}
			</Router>
		</>
	)
}
