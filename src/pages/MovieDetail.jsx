import React, { useState} from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const MovieDetail = () => {

  const location = useLocation();
  const movie = location.state;

  const [saved, setSaved] = useState(false);

  const {user} = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  const navigate = useNavigate();


  const saveShow = async () => {
    if(user?.email){
      setSaved(true)
      await updateDoc(movieID, {
        savedShows : arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path
        })
      })
    }
    else{
      navigate('/login');
    }
  }

  return (
    <div className='w-full h-screen text-white'>

      <div className='w-full h-full'>
        <div className='absolute w-full h-screen bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        
        <div className='absolute w-full top-[40%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
            <button onClick={saveShow} className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
          </div>
          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{movie?.overview}</p>
        </div>

      </div>

    </div>
  )
}

export default MovieDetail