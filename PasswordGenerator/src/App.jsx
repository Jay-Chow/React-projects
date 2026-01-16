import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const[password, setPassword] = useState('');

  const passRef = useRef(null);



  const passwordGenerator = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(includeNum) chars += "0123456789";
    if(includeChar) chars += "!@#$%^&*()~|}{[]?></=";

    for(let i = 1; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  },  
  [length, includeNum, includeChar, setPassword])

  const copyPassToClip = () => { 
    passRef.current.select();
    navigator.clipboard.writeText(passRef.current.value);
   };

  useEffect(() => {
    passwordGenerator();
  }, [length, includeChar, includeNum, passwordGenerator]);

  return (
    <>
    <div className="h-screen bg-violet-900">
      <h1 className='border-y-amber-800 px-6 py-4 text-white rounded-2xl flex justify-center items-center
       bg-fuchsia-900'>
        Password generator</h1>
      <div className='flex justify-center items-center mt-10'>
        <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
          {/* Password Display with Copy Button */}
          <div className='flex gap-2 mb-6'>
            <input 
              type="text" 
              placeholder='Your password'
              value={password}
              className='flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
              readOnly
              ref={passRef}
            />
            <button 
              className='bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition'
              onClick={copyPassToClip}
            >
              Copy
            </button>
          </div>

          {/* Length Slider */}
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Length: <span className='text-blue-500'>{length}</span>
            </label>
            <input 
              type="range" 
              min="8" 
              max="32" 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='w-full'
            />
          </div>

          {/* Checkboxes */}
          <div className='space-y-3'>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input 
                type="checkbox" 
                defaultChecked = {includeChar}
                className='w-4 h-4'
                onChange={() =>{
                  setIncludeChar((prev) => !prev);
                }}
              />
              <span className='text-gray-700'>Characters</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input 
                type="checkbox" 
                defaultChecked = {includeNum}
                className='w-4 h-4'
                onChange={() => {
                  setIncludeNum((prev) => !prev);
                }}
              />
              <span className='text-gray-700'>Numbers</span>
            </label>
          </div>

          {/* Generate Button */}
          {/* <button 
            className='w-full bg-green-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition mt-6'
          >
            Generate Password
          </button> */}
        </div>
    </div>
    </div>
          
    </>
  )
}

export default App

