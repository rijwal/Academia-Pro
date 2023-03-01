const express = require('express')
const router = express.Router()
const {getStudents, setStudent, updateStudent, deleteStudent, getWinningStudents} = require('../controllers/studentController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getStudents)
router.get('/quarter', protect, getWinningStudents)

router.post('/', protect, setStudent)

router.put('/:id', protect, updateStudent)

router.delete('/:id', protect, deleteStudent)


module.exports = router