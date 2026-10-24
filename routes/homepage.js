import express from 'express'
import homepageController from '../controllers/homepageController.js'

const route = express.Router()

route.get('/', homepageController.inicio);

export default route;