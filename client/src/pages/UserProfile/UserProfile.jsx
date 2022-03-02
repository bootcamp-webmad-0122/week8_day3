import { Container } from 'react-bootstrap'
import { AuthContext } from './../../context/auth.context'
import { useContext } from 'react'

const UserProfile = () => {

    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h1>¡Hola, {user.username}!</h1>
        </Container>
    )
}

export default UserProfile