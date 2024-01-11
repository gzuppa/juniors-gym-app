import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useAuth from '../../hooks/useAuth'
import TriangleImage from '../../assets/misc/triangle-light.png'
import JuniorsLogo from '../../assets/misc/trophy.png'

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute',
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute',
})

const WelcomeCard = () => {
  const { auth } = useAuth()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" className="text-purple-800" sx={{ mb: 2 }}>
          Hola {auth.name}🏋️‍♂️
        </Typography>
        <Typography variant="body1" sx={{ letterSpacing: '0.25px', mb: 8 }}>
          Panel de bienvenida
        </Typography>
        <Link
          to="/admin/members"
          className="text-purple-800 hover:text-yellow-300 bg-yellow-300 hover:bg-purple-800 transition-colors py-2 px-2 rounded-lg cursor-pointer text-xl font-raleway font-bold"
        >
          Tus usuarios
        </Link>
        <TriangleImg src={TriangleImage} />
        <TrophyImg src={JuniorsLogo} />
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
