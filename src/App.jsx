import { useReducer } from 'react'
import Form from './Components/Form'


export default function App() {
  function reducer ( state , { type , value } ) {
    switch ( type ) {
      case 'setEn' : {
        return {
          ...state ,
          encryptText : value.replaceAll(' ' , '')
        }
      }
      case 'setDe' : {
        return { ...state , decryptText : value }
      }
      case 'keyEn' : {
        return { ...state , keyEn : value }
      }
      case 'keyDe' : { 
        return { ...state , keyDe : value }
      }
      case 'clearEn' : {
        return {
          ...state ,
          encryptText : '' ,
          keyEn : '' ,
        }
      }
      case 'clearDe' : {
        return {
          ...state ,
          decryptText : '' ,
          keyDe : '' ,
        }
      }
      default:
        return state
    }
  }
  const [ state , dispatch ] = useReducer(reducer, { encryptText : '' , decryptText : '' , keyDe : '' , keyEn : ''})


  return (
    <>
        <div className='w-screen pt-2 h-screen bg-slate-950 flex flex-col justify-between items-center'>
            <div className='relative w-full text-center text-white font-bold py-2 after:content-[""] after:bg-gradient-to-r after:from-cyan-200 after:to-indigo-700 after:w-full after:h-[2px] after:absolute after:left-0 after:-bottom-2'>Playfair Cipher</div>
            <Form dispatch={ dispatch } type='setEn' text={ state.encryptText } _key={ state.keyEn } />
            <Form dispatch={ dispatch } type='setDe' text={ state.decryptText } _key={ state.keyDe }/>
        </div>

    </>
  )
}