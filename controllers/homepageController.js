
import petsModel from '../models/pets.js'
//aca solo renderizamos lo q queremos mostrar en el browser
class HomepageController {

    async inicio(req, res) {
        try {
            const pets = await petsModel.getAll()
            res.render('index', { pets })
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
}


export default new HomepageController()