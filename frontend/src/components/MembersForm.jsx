import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'
import {
  Grid,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CakeIcon from '@mui/icons-material/Cake'
import { onlyNumberRegex } from '../shared/constants'
import useMembers from '../hooks/useMembers'
import Alert from './shared/Alert'

const MembersForm = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [ingressDate, setIngressDate] = useState('')
  const [payAmount, setPayAmount] = useState(0)
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [status, setStatus] = useState('')

  const params = useParams()

  const { alert, member, showAlert, submitMember } = useMembers()

  useEffect(() => {
    if(member.name) {
      setId(member._id)
      setName(member.name)
      setLastName(member.lastName)
      setIngressDate(member.ingressDate.split('T')[0])
      setPayAmount(member.payAmount)
      setPhone(member.phone)
      setAge(member.age)
      setStatus(member.status)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      [name, lastName, ingressDate, payAmount, phone, age, status].includes('')
    ) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await submitMember({
      name,
      lastName,
      ingressDate,
      payAmount,
      phone,
      age,
      status,
    })
    setName('')
    setLastName('')
    setIngressDate('')
    setPayAmount('')
    setPhone('')
    setAge('')
    setStatus('')
  }

  const { msg } = alert

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            sx={{
              input: { color: '#6b21a8' },
              label: { color: '#6b21a8' },
              '& label.Mui-focused': {
                color: '#6b21a8',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            id="name"
            label="Nombre"
            variant="standard"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              input: { color: '#6b21a8' },
              label: { color: '#6b21a8' },
              '& label.Mui-focused': {
                color: '#6b21a8',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            id="lastName"
            label="Apellido"
            variant="standard"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
      </Grid>

      <div className="mb-5 mt-4">
        <label
          className="text-purple-800 uppercase text-sm"
          htmlFor="ingress-date"
        >
          Fecha de ingreso
        </label>
        <input
          id="ingress-date"
          type="date"
          className="border border-purple-700 w-full p-2 mt-2 placeholder-purple-700 text-purple-700 rounded-md"
          value={ingressDate}
          onChange={e => setIngressDate(e.target.value)}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label
            className="text-purple-800 uppercase text-sm"
            htmlFor="pay-amount"
          >
            Monto
          </label>
          <CurrencyInput
            className="border border-purple-700 w-full p-2 mt-2 placeholder-purple-700 text-purple-700 rounded-md"
            id="input-example"
            name="pay-amount"
            placeholder="Monto de pago mensual"
            defaultValue={0}
            decimalsLimit={2}
            value={payAmount}
            onValueChange={payAmount => setPayAmount(payAmount)}
            prefix="MXN $"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              input: { color: '#6b21a8' },
              label: { color: '#6b21a8' },
              '& label.Mui-focused': {
                color: '#6b21a8',
              },
              marginTop: 3.3,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 12 }}
            fullWidth
            id="phone"
            label="Teléfono"
            variant="standard"
            value={phone}
            onChange={e => {
              if (
                e.target.value === '' ||
                onlyNumberRegex.test(e.target.value)
              ) {
                setPhone(e.target.value)
              }
            }}
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            sx={{
              input: { color: '#6b21a8' },
              label: { color: '#6b21a8' },
              '& label.Mui-focused': {
                color: '#6b21a8',
              },
              marginTop: 3.3,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <CakeIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 2 }}
            fullWidth
            id="age"
            label="Edad"
            variant="standard"
            value={age}
            onChange={e => {
              if (
                e.target.value === '' ||
                onlyNumberRegex.test(e.target.value)
              ) {
                setAge(e.target.value)
              }
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              variant="standard"
              labelId="status"
              id="status"
              value={status}
              label="Status"
              onChange={e => setStatus(e.target.value)}
              sx={{
                color: '#6b21a8',
              }}
            >
              <MenuItem value="Pagado">Pagado</MenuItem>
              <MenuItem value="Por pagar">Por pagar</MenuItem>
              <MenuItem value="Bloqueado">Bloqueado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <input
        type="submit"
        value={id ? 'Actualizar usuario' : 'Crear usuario'}  
        className="mt-9 bg-purple-800 text-yellow-300 w-full py-3 uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-yellow-300 hover:text-purple-800 transition-colors"
      />
    </form>
  )
}

export default MembersForm
