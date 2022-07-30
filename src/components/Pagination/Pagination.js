import React, { useEffect } from 'react'
import useStyles from './styles'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../../redux/slices/postSlice'
import { useSelector, useDispatch } from 'react-redux'


const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch= useDispatch()

    useEffect(() => {
      dispatch(getAllPosts(page));
    }, [page]);
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