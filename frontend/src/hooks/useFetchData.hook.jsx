// Este arquivo centraliza a busca de dados e a formatação essencial
import { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
import { getAllLocalization } from '../services/localization.service'
// eslint-disable-next-line no-unused-vars
import { getAllEquipmentType } from '../services/equipment_type.service'
import { getAllOwner } from '../services/owner.service'
// eslint-disable-next-line no-unused-vars
import { getAllUnities } from '../services/unity.service'
// eslint-disable-next-line no-unused-vars
import { getAllCalibrationPeriodicity } from '../services/calibration_periodicity.service'

export function useFetchData(fetchFunction, ...dependencies) {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const result = await fetchFunction(true)
				if (fetchFunction === getAllOwner) {
					const formatDataOwner = result.map((item) => ({
						...item,
						ownerLocalization: `${item.owner} - ${item.localization.description}`,
					}))
					setData(formatDataOwner)
				} else {
					setData(result)
				}
			} catch (err) {
				setError(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchFunction, ...dependencies])

	return { data, isLoading, error }
}
