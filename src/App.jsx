import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(5)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  let passwordgenerator = useCallback(() => {
    let storePassword = ""
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "123456789"
    let symbols = "!@#$%^&*(){}[]~"
    if (number) alpha += num
    if (character) alpha += symbols
    for (let index = 0; index < length; index++) {
      let generatePassword = Math.floor(Math.random() * alpha.length + 1)
      storePassword += alpha.charAt(generatePassword)
    }
    setPassword(storePassword)
  }, [length, number, character, setPassword])

  let ref = useRef(null)
  const copyPassword = useCallback(() => {
    ref.current?.select()
    // ref.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  }, [password])
  // useEffect(() =>{
  //   passwordgenerator()
  // }, [number , character , length , passwordgenerator])
  return (
    <>
      <div className=' bg-transparent border-2 w-3xl h-40 py-2 shadow-2xl rounded-2xl top-30 relative text-gray-500'>
        <h1 className=' text-black font-bold font-sans text-2xl absolute left-60 shadow-2xl'>PASSWORD GENERATOR</h1>
        <button
          onClick={passwordgenerator}
          className={` border-t-4 border-b-4 hover:border-gray-700 rounded-full shadow cursor-pointer border-gray-500 w-8 h-8 absolute right-4 top-2 `}
        ></button>
        <div className=' w-2xl bg-white rounded-xl h-12 absolute left-12 top-14'>
          <input
            type="text"
            placeholder='PASSWORD'
            className='px-1 h-full w-xl outline-none border-none rounded-xl text-xl'
            value={password}
            readOnly
            ref={ref}
          />
          <button
            onClick={copyPassword}
            className='bg-black h-full w-24 rounded-br-xl hover:bg-gray-900 rounded-tr-xl cursor-pointer text-white text-xl font-bold'
          >Copy</button>
        </div>
        <div className=' justify-center w-xl absolute bottom-3 text-black shadow gap-5 flex'>
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className=' cursor-pointer accent-gray-500'
          />
          <label
          > Length: {length}</label>
          <div>
            <input
              className=' cursor-pointer accent-gray-500'
              type="checkbox"
              id="number"
              defaultChecked={number}
              onChange={() => { setNumber((prev) => !prev) }}
            />
            <label
              className=' cursor-pointer'
              htmlFor="number"
            >Number</label>
          </div>
          <div>
            <input
              className=' cursor-pointer accent-gray-500'
              type="checkbox"
              id="character"
              defaultChecked={character}
              onChange={() => { setCharacter((prev) => !prev) }}
            />
            <label
              className=' cursor-pointer'
              htmlFor="character"
            >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
