import { useState } from 'react'
import { Grid, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import UpgradeIcon from '@mui/icons-material/Upgrade'

const TrainingForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [level, setLevel] = useState('')

  return (
    <form className="my-10">
      <div className="mb-5">
        <Grid container spacing={2}>
          <TextField
            sx={{
              input: { color: '#6b21a8' },
              label: { color: '#6b21a8' },
              '& label.Mui-focused': {
                color: '#6b21a8',
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                  <FitnessCenterIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            id="name"
            label="Nombre del entrenamiento"
            variant="standard"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <label htmlFor="description" className="text-purple-800">
            Descripción del entrenamiento
          </label>
          <textarea
            id="description"
            className="border border-purple-800 w-full p-2 mt-2 text-purple-800 rounded-md"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          <label className="text-purple-800" htmlFor="start-date">
            Fecha de inicio de entrenamiento
          </label>
          <input
            id="start-date"
            type="date"
            className="border border-purple-700 w-full p-2 mt-2 placeholder-purple-700 text-purple-700 rounded-md"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="level">Nivel de entrenamiento</InputLabel>
            <Select
              variant="standard"
              labelId="level"
              id="level"
              value={level}
              label="Nivel de entrenamiento"
              onChange={e => setLevel(e.target.value)}
              sx={{
                color: '#6b21a8',
              }}
            >
              <MenuItem value="Principiante">Principiante</MenuItem>
              <MenuItem value="Intermedio">Intermedio</MenuItem>
              <MenuItem value="Avanzado">Avanzado</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <input type="submit" className="bg-yellow-300 text-purple-800 hover:bg-purple-800 hover:text-yellow-300 w-full p-3 font-raleway mt-5 text-center rounded-lg flex items-center justify-center transition-colors cursor-pointer" value="Crear entrenamiento"/>
        </Grid>

        
      </div>
    </form>
  )
}

export default TrainingForm
