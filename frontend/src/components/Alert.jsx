const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error
          ? 'from-yellow-300 to-orange-800'
          : 'from-purple-300 to-purple-800'
      } bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  )
}

export default Alert
