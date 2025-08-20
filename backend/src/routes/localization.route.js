import { Router } from 'express'
import LocalizationController from '../controllers/localization.controller.js'

const route = Router()

route.post('/', LocalizationController.createLocalization)
route.put('/:id', LocalizationController.updateLocalization)
route.get('/', LocalizationController.getAllLocalization)
route.get('/:id', LocalizationController.getLocalization)
route.patch('/:id', LocalizationController.updateLocalizationStatus)

export default route
