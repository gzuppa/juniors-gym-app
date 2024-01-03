import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import CakeIcon from '@mui/icons-material/Cake'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import PaidIcon from '@mui/icons-material/Paid'
import PersonIcon from '@mui/icons-material/Person'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import Swal from 'sweetalert2'
import useMembers from '../hooks/useMembers'

const MemberForm = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [payDate, setPayDate] = useState('')
  const [payAmount, setPayAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [memberLevel, setMemberLevel] = useState('')
  const [status, setStatus] = useState('')

  const { member, submitMember } = useMembers()

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setId(member._id)
      setName(member.name)
      setLastName(member.lastName)
      setPayAmount(member.payAmount)
      setPhone(member.phone)
      setAge(member.age)
      setMemberLevel(member.memberLevel)
      setStatus(member.status)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if (
      [
        name,
        lastName,
        payDate,
        payAmount,
        phone,
        age,
        memberLevel,
        status,
      ].includes('')
    ) {
      Swal.fire({
        title: 'Atención!',
        text: 'Todos los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }
    await submitMember({
      id,
      name,
      lastName,
      payDate,
      payAmount,
      phone,
      age,
      memberLevel,
      status,
    })
    setId(null)
    setName('')
    setLastName('')
    setPayDate('')
    setPayAmount('')
    setPhone('')
    setAge('')
    setMemberLevel('')
    setStatus('')
  }

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel htmlFor="name">Nombre</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                <PersonIcon />
              </InputAdornment>
            }
            id="name"
            label="Nombre"
            onChange={e => setName(e.target.value)}
            sx={{ label: { color: '#6b21a8' } }}
            type="text"
            value={name}
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mt: 3 }}>
          <InputLabel htmlFor="name">Apellido</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                <PersonIcon />
              </InputAdornment>
            }
            id="lastName"
            label="Apellido"
            onChange={e => setLastName(e.target.value)}
            sx={{ label: { color: '#6b21a8' } }}
            type="text"
            value={lastName}
          />
        </FormControl>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <DemoItem
              label={
                <Grid
                  container
                  spacing={1}
                  sx={{ ml: 1, alignItems: 'center' }}
                >
                  <p>Fecha de primer pago</p>
                  <Tooltip title="A partir de esta fecha se contarán 30 días naturales para el siguiente pago de mensualidad">
                    <IconButton>
                      <LiveHelpIcon
                        fontSize="small"
                        sx={{ color: '#6b21a8' }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
            >
              <DatePicker
                value={payDate}
                onChange={newValue => setPayDate(newValue)}
              />
            </DemoItem>
          </Grid>
          <Grid item xs={6} sx={{ mt: '4px' }}>
            <InputLabel
              htmlFor="name"
              sx={{ mb: '12px', fontSize: '0.875rem' }}
            >
              Monto de mensualidad
            </InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <PaidIcon />
                </InputAdornment>
              }
              fullWidth
              id="payDate"
              label="Monto de mensualidad"
              onChange={e => setPayAmount(e.target.value)}
              sx={{ label: { color: '#6b21a8' } }}
              type="number"
              value={payAmount}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="phone"
              sx={{ mb: '12px', fontSize: '0.875rem' }}
            >
              Teléfono
            </InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <PhoneInTalkIcon />
                </InputAdornment>
              }
              fullWidth
              id="phone"
              label="Teléfono"
              onChange={e => setPhone(e.target.value)}
              sx={{ label: { color: '#6b21a8' } }}
              type="text"
              value={phone}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="age" sx={{ mb: '12px', fontSize: '0.875rem' }}>
              Edad
            </InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <CakeIcon />
                </InputAdornment>
              }
              fullWidth
              id="age"
              label="Edad"
              onChange={e => setAge(e.target.value)}
              sx={{ label: { color: '#6b21a8' } }}
              type="number"
              value={age}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <InputLabel
              id="memberLevel"
              sx={{ mb: '12px', fontSize: '0.875rem' }}
            >
              Nivel del usuario
            </InputLabel>
            <Select
              labelId="memberLevel"
              fullWidth
              id="memberLevel"
              value={memberLevel}
              label="Nivel del usuario"
              onChange={e => setMemberLevel(e.target.value)}
            >
              <MenuItem value={'Principiante'}>Principiante</MenuItem>
              <MenuItem value={'Intermedio'}>Intermedio</MenuItem>
              <MenuItem value={'Avanzado'}>Avanzado</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="status" sx={{ mb: '12px', fontSize: '0.875rem' }}>
              Status del usuario
            </InputLabel>
            <Select
              labelId="status"
              fullWidth
              id="status"
              value={status}
              label="Status del usuario"
              onChange={e => setStatus(e.target.value)}
            >
              <MenuItem value={'Pagado'}>Pagado</MenuItem>
              <MenuItem value={'Por pagar'}>Por pagar</MenuItem>
              <MenuItem value={'Bloqueado'}>Bloqueado</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
      <input
        className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer w-full p-3 font-bold font-raleway mt-10 rounded transition-colors"
        type="submit"
        value={id ? 'Actualizar usuario' : 'Crear usuario'}
      />
    </form>
  )
}

export default MemberForm
