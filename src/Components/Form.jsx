import { useState } from "react"
import Input from './Input'
import Button from './Button'
import { encryptByPlayfairCipher , decryptByPlayfairCipher } from '../functions/playfair.js' 

export default function Form({ dispatch , type , text , _key  }) {
    const [ code , setCode ] = useState('')
    const [ encrypt , decrypt ] = [ encryptByPlayfairCipher , decryptByPlayfairCipher ]
    return (
        <form className='max-w-[758px] m-4 relative z-40 bg-black rounded-xl overflow-hidden w-[calc(100%-2rem)] h-[90%] p-[3px] after:content-[""] after:w-full after:h-full after:bg-gradient-to-br after:from-cyan-200 after:to-indigo-700 after:absolute after:left-0 after:top-0 after:-z-10'>
            <div className='w-full h-full bg-slate-950 rounded-xl p-4'>
                <div className='flex gap-4 items-start'>
                    <Input label='Plain text :' dispatch={ dispatch } typeSet={ type } sentence={ text } />
                    <Input label='Key :' dispatch={ dispatch } typeSet={ type === 'setEn' ? 'keyEn' : 'keyDe'} sentence={ _key } />
                </div>

                <div className={'relative text-white mt-4 border border-green-500 rounded-lg ' + ( code.length !== 0 ? ' answer-open' : ' answer-close')}>
                    <i className="absolute fa-solid fa-table-cells-lock left-4 top-[-12px] text-xl"></i>
                    { code }
                    <i className="fa-solid fa-copy absolute right-4 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
                        onClick={()=> navigator.clipboard.writeText(code)}></i>
                </div>

                <div className='w-full flex mt-4 gap-4'>
                    <Button txt={ type === 'setEn' ? 'Encrypt' : 'Decrypt' } onclick={() => {
                        if ( type === 'setEn' ) setCode( encrypt( text , _key ) )
                        else setCode( decrypt( text , _key ) )
                    }}>
                        <i className="fa-solid fa-lock-keyhole mr-1 w-0"></i>
                    </Button>
                    <Button txt='Clear' onclick={()=>{
                        if ( type === 'setEn' ) dispatch({type : 'clearEn'})
                        else dispatch({ type : 'clearDe'})
                        setCode('')
                    }}>
                        <i className="fa-solid fa-broom-wide mr-1 scale w-0"></i>
                    </Button>
                </div>
            </div>
        </form>
    )
}
