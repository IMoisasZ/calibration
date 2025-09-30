import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Button from '../../components/button/Button'
import CalibrationData from './CalibrationData'
import CalibrationItems from './CalibrationItems'
import CalibrationResult from './CalibrationResult'
import Divider from '../../components/divider/Divider'
import Table from '../../components/table/Table'
import Modal from '../../components/modal/Modal'
import styles from './Calibration.module.css'
import { getEquipmentByIdentifier } from '../../services/equipment.service'
// Importações de utilitários
import {
	nextCalibrationFunction,
	mdIm,
	statusResultCalibration,
	calculateOptimalResolution,
	calculateCalibrationStatus,
} from '../../utils/calibration.utils'
import { getAllCalibrationConfig } from '../../services/calibration_config.service'
import debounce from 'lodash.debounce'
import { createUpdateCalibrationValidator } from '../../validator/calibration.validator'
import { createCalibrationWithResults } from '../../services/calibration.service'
import { createMessage } from '../../utils/message.utils'

const today = new Date()

// Estado inicial MÍNIMO para limpeza de um resultado
const getInitialCurrentResult = () => ({
	id_result: null,
	measuring_range: '',
	optimal_resolution: '',
	identifier: false,
	environmental_conditions: false,
	biggest_deviation: '',
	measurement_uncertainty: '',
	// Garante que o MD+IM seja inicializado com o valor de cálculo (geralmente '0.00000')
	biggest_deviation_plus_measurement_uncertainty: mdIm(0, 0),
	status_result: '',
	comment: '',
})

// Estado inicial COMPLETO
const getInitialState = () => ({
	calibrationData: {
		equipment_id: '',
		calibration_date: today.toISOString().substring(0, 10),
		next_calibration: '',
		certificate_number: '',
		certificate_file: '',
		calibration_status: '', // Status Geral
	},
	calibrationResults: [],
	currentResult: getInitialCurrentResult(),
	calibrationOthers: {
		identifierNumber: '',
		equipment: null,
		calibrationPeriodicityDays: null,
		acceptanceCriteriaValue: 0,
		factor: null, // Será buscado na montagem
		showListEquipment: false,
		disabled: false,
		loading: false,
		error: null,
	},
})

export default function Calibration() {
	const [formData, setFormData] = useState(getInitialState())
	// Ref para controlar a ordem das requisições (evita stale closure e race condition)
	const latestRequestIdRef = useRef(0)
	const [selectedFile, setSelectedFile] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalContent, setModalContent] = useState({
		header: '',
		body: null,
		actions: null,
	})

	const fetchEquipment = useCallback(
		async (identifierNumber) => {
			if (!identifierNumber) return

			// 1. GERA UM NOVO SINAL (ID da Requisição)
			latestRequestIdRef.current += 1
			const currentRequestId = latestRequestIdRef.current

			// 2. SETA LOADING TRUE
			setFormData((prevData) => ({
				...prevData,
				calibrationOthers: {
					...prevData.calibrationOthers,
					loading: true,
					error: null,
				},
			}))

			try {
				const data = await getEquipmentByIdentifier(identifierNumber)

				// 3. 🛑 VERIFICAÇÃO DE ORDEM (Corrida de Condições)
				if (currentRequestId < latestRequestIdRef.current) {
					// Se for ignorada, pelo menos desligue o loading
					setFormData((prevData) => ({
						...prevData,
						calibrationOthers: {
							...prevData.calibrationOthers,
							loading: false,
						},
					}))
					return { success: true, message: 'Busca antiga ignorada.' }
				}

				// 4. Se for a MAIS RECENTE, ATUALIZA TUDO (SUCCESS)
				setFormData((prevData) => {
					const acceptanceCriteria = data.acceptance_criteria || 0
					const currentFactor = Number(prevData.calibrationOthers.factor)
					// Recalcula a resolução OTIMAL usando o FATOR ATUAL e o novo critério
					const currentOptimalResolution = calculateOptimalResolution(
						acceptanceCriteria,
						currentFactor
					)

					return {
						...prevData,
						calibrationOthers: {
							...prevData.calibrationOthers,
							loading: false,
							equipment: data,
							calibrationPeriodicityDays:
								data.calibration_periodicity.calibration_days,
							acceptanceCriteriaValue: acceptanceCriteria,
							error: null,
						},
						calibrationData: {
							...prevData.calibrationData,
							equipment_id: data.id,
							calibration_date: today.toISOString().substring(0, 10),
						},
						// Limpa resultados antigos e define a nova resolução ideal
						calibrationResults: [],
						currentResult: {
							...getInitialCurrentResult(),
							optimal_resolution: currentOptimalResolution,
						},
					}
				})
				return { success: true, message: null }
			} catch (err) {
				// 5. Se for a MAIS RECENTE (ou a última a ser processada), atualiza ERRO
				if (currentRequestId === latestRequestIdRef.current) {
					setFormData((prevData) => ({
						...prevData,
						calibrationOthers: {
							...prevData.calibrationOthers,
							loading: false, // DESLIGA O LOADING
							error: 'Equipamento não encontrado ou erro na rede/serviço.',
							equipment: null,
							calibrationPeriodicityDays: null,
							acceptanceCriteriaValue: 0, // Reseta o critério
						},
						// Limpa os dados de calibração e resultados
						calibrationData: {
							...prevData.calibrationData,
							equipment_id: '',
							next_calibration: '',
							calibration_status: '',
						},
						calibrationResults: [],
						currentResult: getInitialCurrentResult(),
					}))
					console.error('Erro na busca do equipamento:', err)
				}
				return { success: false, message: 'Equipamento não encontrado.' }
			}
		},
		[setFormData]
	)

	const debouncedFetch = useMemo(() => {
		return debounce(fetchEquipment, 500)
	}, [fetchEquipment])

	// NOVO: Função para busca imediata (Chamada pelo botão em CalibrationData)
	const handleImmediateSearch = useCallback(() => {
		if (typeof debouncedFetch.cancel === 'function') {
			debouncedFetch.cancel() // Cancela qualquer busca debounced pendente
		}
		const identifier = formData.calibrationOthers.identifierNumber

		if (identifier) {
			fetchEquipment(identifier)
		} else {
			createMessage('warning', 'O campo Identificação está vazio!')
		}
	}, [
		formData.calibrationOthers.identifierNumber,
		debouncedFetch,
		fetchEquipment,
	])

	// NOVO: Função para abrir a lista de equipamentos (Chamada pelo botão de lupa em CalibrationData)
	const handleOpenListEquipment = useCallback(() => {
		if (typeof debouncedFetch.cancel === 'function') {
			debouncedFetch.cancel() // Cancela qualquer busca debounced pendente
		}
		setFormData((prevData) => ({
			...prevData,
			calibrationOthers: {
				...prevData.calibrationOthers,
				showListEquipment: true, // Muda a view para CalibrationItems
			},
		}))
	}, [debouncedFetch])

	// NOVO: Função para selecionar um equipamento na lista (Chamada por CalibrationItems)
	const handleSelectEquipment = useCallback(
		(equipment) => {
			setFormData((prevData) => {
				const acceptanceCriteria = equipment.acceptance_criteria || 0
				const periodicityDays =
					equipment.calibration_periodicity?.calibration_days || null

				// 1. Recálculo da Resolução Ideal (usa o FATOR já carregado)
				const currentFactor = Number(prevData.calibrationOthers.factor)
				const currentOptimalResolution = calculateOptimalResolution(
					acceptanceCriteria,
					currentFactor
				)

				// 2. Cálculo da Próxima Calibração
				let nextCalibrationDate = prevData.calibrationData.next_calibration

				if (periodicityDays) {
					nextCalibrationDate = nextCalibrationFunction(
						prevData.calibrationData.calibration_date,
						periodicityDays
					)
				}

				return {
					...prevData,
					// 3. ATUALIZAÇÃO PARA VOLTAR A TELA
					calibrationOthers: {
						...prevData.calibrationOthers,
						showListEquipment: false, // <-- A CHAVE PARA VOLTAR
						equipment: equipment, // Salva o objeto completo
						identifierNumber: equipment.identifier, // Preenche o input
						calibrationPeriodicityDays: periodicityDays,
						acceptanceCriteriaValue: acceptanceCriteria,
						loading: false,
						error: null,
					},
					// 4. ATUALIZAÇÃO DOS DADOS DE CALIBRAÇÃO
					calibrationData: {
						...prevData.calibrationData,
						equipment_id: equipment.id,
						next_calibration: nextCalibrationDate,
						calibration_status: '', // Limpa status geral
					},
					// 5. LIMPEZA E ATUALIZAÇÃO DE RESULTADOS
					calibrationResults: [],
					currentResult: {
						...getInitialCurrentResult(),
						optimal_resolution: currentOptimalResolution, // Mantém a resolução ideal
					},
				}
			})
		},
		[
			/* dependências implícitas */
		]
	)

	// Lógica para campos gerais (calibrationData e calibrationOthers)
	const handleChange = useCallback(
		(e) => {
			const { name, value, type, checked } = e.target
			const val = type === 'checkbox' ? checked : value

			try {
				setFormData((prevData) => {
					// Lógica de Recálculo da optimal_resolution se o FATOR mudar
					if (name === 'factor') {
						const newOptimalResolution = calculateOptimalResolution(
							prevData.calibrationOthers.acceptanceCriteriaValue,
							val
						)
						const newStatus = statusResultCalibration(
							newOptimalResolution,
							prevData.currentResult
								.biggest_deviation_plus_measurement_uncertainty
						)
						return {
							...prevData,
							calibrationOthers: { ...prevData.calibrationOthers, [name]: val },
							currentResult: {
								...prevData.currentResult,
								optimal_resolution: newOptimalResolution,
								status_result: newStatus,
							},
						}
					}

					if (prevData.calibrationData.hasOwnProperty(name)) {
						return {
							...prevData,
							calibrationData: { ...prevData.calibrationData, [name]: val },
						}
					}

					if (prevData.calibrationOthers.hasOwnProperty(name)) {
						const newCalibrationOthers = {
							...prevData.calibrationOthers,
							[name]: val,
						}

						// Limpa o equipamento, erro e loading IMEDIATAMENTE se o identificador for esvaziado
						if (name === 'identifierNumber' && !val) {
							newCalibrationOthers.equipment = null
							newCalibrationOthers.error = null
							newCalibrationOthers.loading = false
							// Cancela a busca debounced se o campo for limpo
							if (typeof debouncedFetch.cancel === 'function') {
								debouncedFetch.cancel()
							}
						}

						return {
							...prevData,
							calibrationOthers: newCalibrationOthers,
						}
					}

					return prevData
				})

				// Chama o debounce aqui, no evento de origem do usuário, para a busca do equipamento
				if (name === 'identifierNumber' && val) {
					// A busca é feita APENAS no debouncedFetch (digitação)
					debouncedFetch(val)
				}
			} catch (error) {
				throw error
			}
		},
		[debouncedFetch]
	)

	// Lógica para o campo de arquivo (MANTIDO)
	const handleFileChange = useCallback((e) => {
		const file = e.target.files[0]
		setSelectedFile(file)
		setFormData((prevData) => ({
			...prevData,
			calibrationData: {
				...prevData.calibrationData,
				certificate_file: file ? file.name : '',
			},
		}))
	}, [])

	// Lógica para os campos do resultado da calibração (currentResult) (MANTIDO)
	const handleResultChange = useCallback((e) => {
		const { name, value, type, checked } = e.target
		const val = type === 'checkbox' ? checked : value

		setFormData((prevData) => {
			const newCurrentResult = {
				...prevData.currentResult,
				[name]: val,
			}

			const biggestDeviationString =
				name === 'biggest_deviation'
					? val
					: prevData.currentResult.biggest_deviation
			const measurementUncertaintyString =
				name === 'measurement_uncertainty'
					? val
					: prevData.currentResult.measurement_uncertainty

			const biggestDeviation = parseFloat(biggestDeviationString) || 0
			const measurementUncertainty =
				parseFloat(measurementUncertaintyString) || 0

			const currentOptimalResolution = newCurrentResult.optimal_resolution

			if (name === 'biggest_deviation' || name === 'measurement_uncertainty') {
				const currentMdIm = mdIm(biggestDeviation, measurementUncertainty)
				newCurrentResult.biggest_deviation_plus_measurement_uncertainty =
					currentMdIm

				newCurrentResult.status_result = statusResultCalibration(
					currentOptimalResolution,
					currentMdIm
				)
			}

			return {
				...prevData,
				currentResult: newCurrentResult,
			}
		})
	}, [])

	// 1. Efeito para buscar o FATOR na montagem (Inicialização) - MANTIDO
	useEffect(() => {
		const loadActualFactor = async () => {
			try {
				const factorData = await getAllCalibrationConfig()
				const factor = Number(factorData[0].factor)

				setFormData((prevData) => ({
					...prevData,
					calibrationOthers: {
						...prevData.calibrationOthers,
						factor,
					},
				}))
			} catch (error) {
				console.error('Erro ao carregar o fator de calibração:', error)
				createMessage('error', 'Erro ao carregar o fator de calibração.')
			}
		}
		loadActualFactor()
	}, [])

	// 2. EFEITO: Recalcula optimal_resolution quando o FATOR ou o CRITÉRIO de aceitação mudam - MANTIDO
	useEffect(() => {
		const factor = formData.calibrationOthers.factor
		const acceptanceCriteria =
			formData.calibrationOthers.acceptanceCriteriaValue

		if (factor !== null && acceptanceCriteria !== null) {
			const newOptimalResolution = calculateOptimalResolution(
				acceptanceCriteria,
				Number(factor)
			)

			setFormData((prevData) => {
				// Evita atualizações desnecessárias
				if (
					prevData.currentResult.optimal_resolution === newOptimalResolution
				) {
					return prevData
				}

				return {
					...prevData,
					currentResult: {
						...prevData.currentResult,
						optimal_resolution: newOptimalResolution,
					},
				}
			})
		}
	}, [
		formData.calibrationOthers.factor,
		formData.calibrationOthers.acceptanceCriteriaValue,
	])

	// Efeito para cálculo da próxima calibração (MANTIDO)
	useEffect(() => {
		if (
			formData.calibrationData.calibration_date &&
			formData.calibrationOthers.calibrationPeriodicityDays &&
			formData.calibrationOthers.equipment !== null
		) {
			const newDate = nextCalibrationFunction(
				formData.calibrationData.calibration_date,
				formData.calibrationOthers.calibrationPeriodicityDays
			)
			setFormData((prevData) => ({
				...prevData,
				calibrationData: {
					...prevData.calibrationData,
					next_calibration: newDate,
				},
			}))
		}
	}, [
		formData.calibrationData.calibration_date,
		formData.calibrationOthers.calibrationPeriodicityDays,
		formData.calibrationOthers.equipment,
	])

	// Lógica de manipulação de resultados e modais (MANTIDA)
	const handleAddCalibrationResult = () => {
		const { measuring_range, biggest_deviation } = formData.currentResult
		if (!measuring_range || !biggest_deviation) {
			createMessage(
				'error',
				'Preencha os campos de medição e desvio para incluir o resultado.'
			)
			return
		}

		const newResultData = {
			measuring_range,
			optimal_resolution: formData.currentResult.optimal_resolution,
			identifier: formData.currentResult.identifier ? 'OK' : 'NOK',
			environmental_conditions: formData.currentResult.environmental_conditions
				? 'OK'
				: 'NOK',
			biggest_deviation,
			measurement_uncertainty: formData.currentResult.measurement_uncertainty,
			biggest_deviation_plus_measurement_uncertainty:
				formData.currentResult.biggest_deviation_plus_measurement_uncertainty,
			status_result: formData.currentResult.status_result,
			comment: formData.currentResult.comment,
		}

		let updatedResults
		const isEditing = formData.currentResult.id_result !== null

		if (isEditing) {
			updatedResults = formData.calibrationResults.map((result) =>
				result.id_result === formData.currentResult.id_result
					? { ...result, ...newResultData }
					: result
			)
			createMessage('success', 'Resultado atualizado com sucesso!')
		} else {
			const newId =
				formData.calibrationResults.length > 0
					? Math.max(...formData.calibrationResults.map((r) => r.id_result)) + 1
					: 1

			const newResult = {
				id_result: newId,
				...newResultData,
			}
			updatedResults = [...formData.calibrationResults, newResult]
			createMessage('success', 'Resultado adicionado com sucesso!')
		}

		const newCalibrationStatus = calculateCalibrationStatus(updatedResults)
		setFormData((prevData) => ({
			...prevData,
			calibrationResults: updatedResults,
			calibrationData: {
				...prevData.calibrationData,
				calibration_status: newCalibrationStatus,
			},
			currentResult: {
				...getInitialCurrentResult(),
				optimal_resolution: prevData.currentResult.optimal_resolution,
			},
		}))
	}

	function handleClearCalibrationResult() {
		setFormData((prevData) => ({
			...prevData,
			currentResult: {
				...getInitialCurrentResult(),
				optimal_resolution: prevData.currentResult.optimal_resolution,
			},
		}))
	}

	function handleClearCalibration() {
		const currentFactor = formData.calibrationOthers.factor

		if (formData.calibrationData.equipment_id) {
			// Redefine para o estado inicial, mas mantém o FATOR
			setFormData((prevData) => {
				const initialState = getInitialState()

				// Recalcula a resolução ideal para o novo currentResult
				const acceptanceCriteria =
					initialState.calibrationOthers.acceptanceCriteriaValue // 0
				const newOptimalResolution = calculateOptimalResolution(
					acceptanceCriteria,
					Number(currentFactor)
				)

				return {
					...initialState,
					calibrationOthers: {
						...initialState.calibrationOthers,
						factor: currentFactor, // PRESERVA O FATOR
					},
					currentResult: {
						...initialState.currentResult,
						optimal_resolution: newOptimalResolution, // APLICA NOVA RESOLUÇÃO
					},
				}
			})

			setSelectedFile(null)
			closeModal()
			if (typeof debouncedFetch.cancel === 'function') {
				debouncedFetch.cancel()
			}
		}
	}

	const handleOpenModalClearCalibration = () => {
		setModalContent({
			header: 'Limpar calibração',
			body: (
				<p>
					Tem certeza que deseja limpar a calibração? Todas as informações serão
					perdidas. Deseja continuar?
				</p>
			),
			actions: (
				<>
					<Button
						nameBtn='Sim'
						handleClick={handleClearCalibration}
						type='button'
						title='Clique para confirmar a limpeza dos dados!'
					/>
					<Button
						nameBtn='Cancelar'
						handleClick={closeModal}
						type='button'
						title='Clique para cancelar!'
					/>
				</>
			),
		})
		setIsModalOpen(true)
	}

	function closeModal() {
		setIsModalOpen(false)
		setModalContent({ header: '', body: null, actions: null })
	}

	const currentFactor = formData.calibrationOthers.factor
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			createUpdateCalibrationValidator(formData)

			if (!formData.calibrationData.calibration_status) {
				createMessage(
					'error',
					'É necessário ter resultados de calibração para determinar o status final.'
				)
				return
			}

			const data = new FormData()

			data.append('calibrationData', JSON.stringify(formData.calibrationData))
			data.append(
				'calibrationResults',
				JSON.stringify(formData.calibrationResults)
			)

			if (selectedFile) {
				data.append('certificate_file', selectedFile)
			}

			await createCalibrationWithResults(data)

			createMessage('success', 'Calibração incluída com sucesso!')
		} catch (error) {
			console.error('Erro ao salvar a calibração:', error)
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			setFormData((prevData) => {
				const initialState = getInitialState()

				// Recalcula a resolução ideal para o novo currentResult com base no FATOR carregado
				const acceptanceCriteria =
					initialState.calibrationOthers.acceptanceCriteriaValue // 0
				const newOptimalResolution = calculateOptimalResolution(
					acceptanceCriteria,
					Number(currentFactor)
				)

				return {
					...initialState,
					calibrationOthers: {
						...initialState.calibrationOthers,
						factor: currentFactor, // PRESERVA O FATOR DE CONFIGURAÇÃO
					},
					currentResult: {
						...initialState.currentResult,
						optimal_resolution: newOptimalResolution, // APLICA NOVA RESOLUÇÃO
					},
				}
			})
			setSelectedFile(null)
		}
	}

	const header = [
		{ label: 'Faixa de medição', key: 'measuring_range' },
		{ label: 'Resolução ideal', key: 'optimal_resolution' },
		{ label: 'Ident.', key: 'identifier' },
		{ label: 'Cond. Amb.', key: 'environmental_conditions' },
		{ label: 'Maior desvio', key: 'biggest_deviation' },
		{ label: 'Incert. med.', key: 'measurement_uncertainty' },
		{ label: 'MD + IM', key: 'biggest_deviation_plus_measurement_uncertainty' },
		{ label: 'Status', key: 'status_result' },
		{ label: 'Obs', key: 'comment' },
		{ label: 'Ações' },
	]

	function handleEditResult(row) {
		setFormData((prevData) => ({
			...prevData,
			currentResult: {
				id_result: row.id_result,
				measuring_range: row.measuring_range,
				optimal_resolution: row.optimal_resolution,
				identifier: row.identifier === 'OK' ? true : false,
				environmental_conditions:
					row.environmental_conditions === 'OK' ? true : false,
				biggest_deviation: row.biggest_deviation,
				measurement_uncertainty: row.measurement_uncertainty,
				biggest_deviation_plus_measurement_uncertainty:
					row.biggest_deviation_plus_measurement_uncertainty,
				status_result: row.status_result,
				comment: row.comment,
			},
		}))
	}

	const handleOpenModalDeleteResult = () => {
		setModalContent({
			header: 'Remover resultado da calibração',
			body: <p>Tem certeza que deseja remover o resultado da calibração?</p>,
			actions: (
				<>
					<Button
						nameBtn='Sim'
						handleClick={handleDeleteResult}
						type='button'
						title='Clique para confirmar e remover o resultado da calibração!'
					/>
					<Button
						nameBtn='Cancelar'
						handleClick={closeModal}
						type='button'
						title='Clique para cancelar!'
					/>
				</>
			),
		})
		setIsModalOpen(true)
	}

	function handleDeleteResult() {
		const idToDelete = formData.currentResult.id_result

		if (idToDelete === null) {
			createMessage('warning', 'Nenhum resultado selecionado para exclusão.')
			return
		}

		const updatedResults = formData.calibrationResults.filter(
			(result) => result.id_result !== idToDelete
		)

		const newCalibrationStatus = calculateCalibrationStatus(updatedResults)

		setFormData((prevData) => ({
			...prevData,
			calibrationResults: updatedResults,
			calibrationData: {
				...prevData.calibrationData,
				calibration_status: newCalibrationStatus,
			},
			currentResult: {
				...getInitialCurrentResult(),
				optimal_resolution: prevData.currentResult.optimal_resolution,
			},
		}))

		createMessage('success', 'Resultado excluído com sucesso!')
		closeModal()
	}

	// AJUSTE: Passando a função de seleção para CalibrationItems
	if (formData.calibrationOthers.showListEquipment) {
		return (
			<CalibrationItems
				handleSelectEquipment={handleSelectEquipment}
				setFormData={setFormData}
			/>
		)
	}

	return (
		<Container
			title='Calibração'
			classNameContainer={styles.container_calibration}>
			<Form
				handleSubmit={handleSubmit}
				noValidate>
				<CalibrationData
					formData={formData}
					handleChange={handleChange}
					setFormData={setFormData}
					handleFileChange={handleFileChange}
					handleImmediateSearch={handleImmediateSearch}
					handleOpenListEquipment={handleOpenListEquipment}
				/>

				<Divider />

				<CalibrationResult
					calibrationOthers={formData.calibrationOthers}
					currentResult={formData.currentResult}
					handleChange={handleResultChange}
					handleAddCalibrationResult={handleAddCalibrationResult}
					handleClearCalibrationResult={handleClearCalibrationResult}
					handleDeleteResult={handleOpenModalDeleteResult}
				/>
				<div className={styles.div_btns}>
					<Button
						nameBtn='Incluir calibração'
						title='Clique para incluir calibração'
						type='submit'
						classNameButton={styles.btn_add}
					/>
					<Button
						nameBtn='Limpar calibração'
						title='Clique para limpar a calibração!'
						type='button'
						classNameButton={styles.btn_add}
						handleClick={handleOpenModalClearCalibration}
					/>
				</div>
			</Form>
			<Table
				data={formData.calibrationResults}
				headers={header}
				handleEdit={handleEditResult}
				className={styles.table}
			/>
			<Modal
				isOpen={isModalOpen}
				handleClose={closeModal}
				className={styles.modal}
				header={modalContent.header}
				body={modalContent.body}
				actions={modalContent.actions}
			/>
		</Container>
	)
}
