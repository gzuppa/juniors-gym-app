import { Fragment, useEffect, useState } from 'react'
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { Dialog, Transition } from '@headlessui/react'
import Swal from 'sweetalert2'
import useMembers from '../../hooks/useMembers'

const NewWarehouseArticleModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [status, setStatus] = useState('')
  const {
    article,
    handleNewWarehouseArticleModal,
    newArticle,
    newWarehouseArticleModal,
  } = useMembers()

  useEffect(() => {
    if (article?._id) {
      setName(article.name)
      setDescription(article.description)
      setType(article.type)
      setPrice(article.price)
      setStock(article.stock)
      setStatus(article.status)
      return
    }
    setName('')
    setDescription('')
    setType('')
    setPrice('')
    setStock('')
    setStatus('')
  }, [article])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, type, price, stock, status].includes('')) {
      Swal.fire({
        title: 'Atención!',
        text: 'Todos los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }
    await newArticle({
      // id,
      name,
      description,
      type,
      price,
      stock,
      status,
      // member: params.id,
    })
    // setId('')
    setName('')
    setDescription('')
    setType('')
    setPrice('')
    setStock('')
    setStatus('')
  }

  return (
    <Transition.Root show={newWarehouseArticleModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleNewWarehouseArticleModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-purple-800 hover:text-purple-500 focus:outline-none"
                  onClick={handleNewWarehouseArticleModal}
                >
                  <span className="sr-only">Cerrar</span>
                  <CloseOutlinedIcon />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-bold text-purple-800"
                  >
                    Nuevo artículo
                  </Dialog.Title>
                  <form className="my-10" onSubmit={handleSubmit}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel htmlFor="name">
                        Nombre del artículo
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <AppRegistrationOutlinedIcon />
                          </InputAdornment>
                        }
                        id="name"
                        label="Nombre del artículo"
                        onChange={e => setName(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="text"
                        value={name}
                      />
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel htmlFor="name">
                        Descripción del artículo
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <AppRegistrationOutlinedIcon />
                          </InputAdornment>
                        }
                        id="description"
                        label="Descripción del artículo"
                        onChange={e => setDescription(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="text"
                        value={description}
                      />
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel
                        id="type"
                        sx={{ mb: '12px', fontSize: '0.875rem' }}
                      >
                        Tipo de artículo
                      </InputLabel>
                      <Select
                        labelId="type"
                        fullWidth
                        id="type"
                        value={type}
                        label="Tipo de artículo"
                        onChange={e => setType(e.target.value)}
                      >
                        <MenuItem value={'Aparato'}>Aparato</MenuItem>
                        <MenuItem value={'Mercancía'}>Mercancía</MenuItem>
                        <MenuItem value={'Otro'}>Otro</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel htmlFor="price">
                        Precio del artículo
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <PaidOutlinedIcon />
                          </InputAdornment>
                        }
                        id="price"
                        label="Precio del artículo"
                        onChange={e => setPrice(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="number"
                        value={price}
                      />
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel htmlFor="stock">Cantidad en stock</InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <Inventory2OutlinedIcon />
                          </InputAdornment>
                        }
                        id="stock"
                        label="Cantidad en stock"
                        onChange={e => setStock(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="number"
                        value={stock}
                      />
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel
                        id="status"
                        sx={{ mb: '12px', fontSize: '0.875rem' }}
                      >
                        Status de artículo
                      </InputLabel>
                      <Select
                        labelId="status"
                        fullWidth
                        id="status"
                        value={status}
                        label="Status de artículo"
                        onChange={e => setStatus(e.target.value)}
                      >
                        <MenuItem value={'Disponible'}>Disponible</MenuItem>
                        <MenuItem value={'No disponible'}>
                          No disponible
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <input
                      type="submit"
                      className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer w-full p-3 font-bold font-raleway mt-10 rounded transition-colors"
                      value="Agregar artículo al inventario"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default NewWarehouseArticleModal
