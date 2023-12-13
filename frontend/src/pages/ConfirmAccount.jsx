import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const ConfirmAccount = () => {
  return (
  <>
    <div className="flex justify-center items-center">
      <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-2" />
      <h1 className="text-purple-800 font-black text-4xl font-raleway">
        Confirma tu
        <span className="text-yellow-300"> cuenta</span>
      </h1>
    </div>
  </>
  )
}

export default ConfirmAccount
