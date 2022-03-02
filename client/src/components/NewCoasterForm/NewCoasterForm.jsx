import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { MessageContext } from '../../context/userMessage.context'
import coastersService from '../../services/coasters.service'
import uploadService from '../../services/upload.service'


const NewCoasterForm = ({ closeModal, refreshCoasters }) => {

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const [coasterData, setCoasterData] = useState({
        title: '',
        description: '',
        length: 0,
        inversions: 0,
        imageUrl: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { title, description, length, inversions, imageUrl } = coasterData


    const handleInputChange = e => {

        const { value, name } = e.target

        setCoasterData({
            ...coasterData,
            [name]: value           // computed propery names
        })
    }

    const uploadCoasterImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setCoasterData({ ...coasterData, imageUrl: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    const handleSubmit = e => {

        e.preventDefault()

        coastersService
            .saveCoaster(coasterData)
            .then(({ data }) => {
                setShowMessage(true)
                setMessageInfo({ title: 'Completado', desc: 'Nueva montaña rusa creada' })
                refreshCoasters()
                closeModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="length">
                <Form.Label>Longitud (m)</Form.Label>
                <Form.Control type="number" value={length} onChange={handleInputChange} name="length" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inversions">
                <Form.Label>Inversiones</Form.Label>
                <Form.Control type="number" value={inversions} onChange={handleInputChange} name="inversions" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Imagen (pega la URL)</Form.Label>
                <Form.Control type="url" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group> */}

            <Form.Group controlId="coasterImage" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={uploadCoasterImage} />
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Crear montaña rusa'}</Button>
            </div>

        </Form >
    )

}

export default NewCoasterForm