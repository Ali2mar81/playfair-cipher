export default function Button({children , txt , onclick }) {
  return (
    <button className={'border px-2 py-1 rounded-md text-white grow btn overflow-hidden btn relative ' + ( txt === 'Clear' && ' border-rose-700')}
    onClick={(e)=>{
      e.preventDefault()
      onclick()
    }}>
        <span className='btn--icon'>
            { children }
        </span>
        <span className='btn--txt absolute left-1/2 -translate-x-1/2'>
            { txt }
        </span>
    </button>
  )
}
