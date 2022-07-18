import React from 'react'
import useStyles from './styles'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { Link } from 'react-router-dom'

const Paginate = () => {
    const classes = useStyles()
  return (
    <div>
        <Pagination
         className={{ul:classes.ul}}
         count={5}
         page={1}
         variant="outlined"
         color="primary"
         renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/post?page=${1}`} />
         )}
         />
    </div>
  )
}

export default Paginate