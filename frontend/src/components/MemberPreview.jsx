import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import DangerousIcon from '@mui/icons-material/Dangerous'

const MemberPreview = ({ member }) => {
  const { name, _id, lastName } = member

  const chipColor = useMemo(() => {
    switch (member.status) {
      case 'Pagado':
        return 'secondary'
      case 'Por pagar':
        return 'warning'
      case 'Bloqueado':
        return 'error'
      default:
        return 'secondary'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.status])

  const chipIcon = useMemo(() => {
    switch (member.status) {
      case 'Pagado':
        return <PriceCheckIcon />
      case 'Por pagar':
        return <MoneyOffIcon />
      case 'Bloqueado':
        return <DangerousIcon />
      default:
        return <PriceCheckIcon />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.status])

  return (
    <div className="border-b p-5 flex text-purple-800 font-raleway">
      <p className="flex-1">
        {name} {lastName}{' '}
        <span>
          <Chip
            label={member.status}
            color={chipColor}
            icon={chipIcon}
            size="small"
            variant="elevated"
          />
        </span>{' '}
      </p>
      <Link
        to={`${_id}`}
        className="text-purple-800 hover:text-purple-500 uppercase text-sm font-bold"
      >
        Ver usuario
      </Link>
    </div>
  )
}

export default MemberPreview
