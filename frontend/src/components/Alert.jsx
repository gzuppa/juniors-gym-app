const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error
          ? 'from-orange-400 to-orange-600'
          : 'from-violet-400 to-violet-600'
      } bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  )
}

export default Alert
