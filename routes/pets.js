import express from "express";
const route = express.Router();
import petController from '../controllers/pets.js'
import { verificarToken } from "../helpers/authentication.js";

route.get('/', petController.getAll);

route.post('/', petController.create);

route.get('/:id', petController.getOne);

route.put('/',petController.update);

route.put('/:id', petController.update);

route.delete('/:id', verificarToken, petController.delete);

export default route;