import { useEffect, useState } from 'react'
import './App.css'
import { handleGetAllVideo } from './api/video.api.js'

function App() {
  const [allVideo,setAllVideo] = useState({})
  console.log(allVideo);
  useEffect(()=>{
    const handleFetch = async ()=>{
      try {
        const data = await handleGetAllVideo()
        setAllVideo(data)
      } catch (error) {
        console.log(error);
      }
    }

    handleFetch()
  },[])
  return (
    <>
      {
        // allVideo?allVideo:"null"
      }
    </>
  )
}

export default App
