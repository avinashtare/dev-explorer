import react, { useEffect, useState } from 'react'
import './App.css'

function App() {
  // we have total 46 images
  const numbersArray = Array.from({ length: 46 }, (_, index) => index + 1);

  const [Imgindex, setImgindex] = useState(1);

  // updown wheel handle 
  const handelWheel = (e) => {
    if (e.deltaY < 0) {
      setImgindex((prev) => (prev - 1 < 1 ? 46 : prev - 1));
    } else {
      setImgindex((prev) => (prev + 1 > 46 ? 1 : prev + 1));
    }
  }

  useEffect(() => {
    document.addEventListener("wheel", handelWheel)

    return () => {
      document.removeEventListener("wheel", handelWheel)
    }
  }, [])

  return (
    <>
      {/* show image by index  */}
      {numbersArray.map((index) => {
        return (Imgindex == index ? <div key={index} className='img-div' style={
          {
            background: `url(./assets/${index}.jpg) no-repeat`,
            backgroundSize: "100% 100%",
          }
        }
        /> : null)
      })}
    </>
  )
}

export default App;