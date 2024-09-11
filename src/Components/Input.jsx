import { useState } from 'react'
import '../assets/input.css'
export default function Input({ label , typeSet , dispatch , sentence }) {
    const [isFocus, setIsFocus] = useState(false)

    return (
        <section className={'relative grow' + (isFocus ? ' focus' : '')}>
            <label className='text-white mr-4 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none'>{ typeSet==='setDe'?' Cipher Text :': label }</label>
            <input type="text" className='w-full outline-none h-8 rounded-md bg-transparent border border-cyan-200 text-white indent-2' onChange={(e) => {
                dispatch({ type : typeSet , value : e.target.value })
            }}
                onFocus={() => setIsFocus(true)}
                value={ sentence } />
        </section>
    )
}
