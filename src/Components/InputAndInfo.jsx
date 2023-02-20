function InputAndInfo(props){

    return (
        <div className="w-3/6">
            <div className="mr-2 pt-4 my-4 rounded-[40px] border-solid border-white border-4 bg-black">
                <div className="mx-2 flex">
                    <input className="w-full text-base bg-transparent p-2 pr-0 text-white border-b-2 border-slate-600 outline-none text-right" value={props.valueAmount} name="amount" onChange={props.onChange} placeholder="0" type="number" />
                    <span className="border-b-2 border-slate-600 p-2 pt-[0.65rem]">{props.currency}</span>
                </div>
                <div className="mx-2">
                    <input className="w-full text-base bg-transparent p-2 outline-none text-right" value={props.valueInfo} name="info" onChange={props.onChange} placeholder="info" />
                </div>
                <button className="mt-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-4 border-transparent" onClick={props.onClick} >
                    <h3 className="uppercase font-bold text-base">{props.buttonCopy}</h3>
                </button>
            </div>
        </div>
    )
}

export default InputAndInfo
