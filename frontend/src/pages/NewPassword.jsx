import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const NewPassword = () => {
  return (
    <>
    <div className="flex justify-center items-center">
      <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-2" />
      <h1 className="text-purple-800 font-black text-4xl font-raleway">
        Reestablece tu
        <span className="text-yellow-300"> password</span>
      </h1>
    </div>
    <form className="my-10 bg-white shadow rounded-lg p-10">

    <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-purple-800 block text-xl font-nunito"
          >
            Nuevo password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 font-nunito"
          />
        </div>
      <input
        type="submit"
        value="Guardar nuevo password"
        className="mb-5 bg-purple-800 text-yellow-300 w-full py-3 uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-yellow-300 hover:text-purple-800 transition-colors"
      />
    </form>
  </>
  )
}

export default NewPassword
