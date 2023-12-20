import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import {
  Grid,
  FormControl,
  InputAdornment,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CakeIcon from '@mui/icons-material/Cake'
import { onlyNumberRegex } from '../shared/constants'

const MembersForm = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [ingressDate, setIngressDate] = useState('')
  const [payAmount, setPayAmount] = useState(0)
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [status, setStatus] = useState('')

  console.log(name, lastName)

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
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
            <InputLabel variant="standard" htmlFor="status">
              Status
            </InputLabel>
            <NativeSelect
              defaultValue="Por pagar"
              inputProps={{
                name: 'status',
                id: 'uncontrolled-native',
              }}
              onChange={e => setStatus(e.target.value)}
              sx={{
                color: '#6b21a8',
                label: { color: '#6b21a8' },
                '& MuiInputLabel-formControl': {
                  color: '#6b21a8',
                },
              }}
            >
              <option value="Pagado">Pagado</option>
              <option value="Por pagar">Por pagar</option>
              <option value="Bloqueado">Bloqueado</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}

export default MembersForm
