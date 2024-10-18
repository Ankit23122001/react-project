import { useCallback, useState, useEffect, useRef } from "react"


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //REF HOOK
  const passwordref = useRef(null)


  //PASSWORD GENERATOR
  const passwordGenerator = useCallback (() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*_+=[]{}"

    for(let i =1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  //  USE REF HOOK FUNCTION
  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select()
    
    //passwordref.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  },
  [password])



  /**********************************USEEFFECT HOOK****************************/

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-black">
    
    <h1 className="text-white text-center my-3"> Password Generator</h1>


    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordref}
      />

      <button 
      onClick= { copyPasswordToClipboard
        //alert( `password copied to clip board: ${setPassword}`)
        
      }
    
      className="outline-none bg-red-500 text-white px-3 py-0.5 shrink-0 hover:bg-red-800">
        Copy
      </button>

    </div>

      <div className="flex text-sm gap-x-2">

        <div className="flex items-center gap-x-1">
          <input 
          type="range"                      // DIV FOR SLIDE BAR (CURSOR POINTER)
          min = {6}
          max = {100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {setlength(e.target.value)} }
           />
           <label> Length : {length} </label>
        </div>



        <div className="flex items-center gap-x-1">
          <input                 //DIV FOR TAKING NUMBER INPUT
          type="checkbox"
          defaultChecked={numberAllowed}
          id = "numberInput"
          onChange={() => {
            setnumberAllowed((prev) => !prev)
          }}
          />      
          <label htmlFor="numberInput">Numbers</label>      
        </div>


        <div className="flex items-center gap-x-1">  
          <input                          //DIV FOR TAKING CHAR INPUT
          type="checkbox"
          defaultChecked={charAllowed}  
          id = "charInput"
          onChange={() => {
            setcharAllowed((prev) => !prev)         
          }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>


      </div>
  </div>
    
  )
}

export default App
