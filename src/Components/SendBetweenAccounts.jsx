function SendBetweenAccounts(props){

    return (
        <div className="flex justify-between my-4">
            <div className="rounded-[40px] border-solid border-white border-2 bg-black w-full flex">
                <input className="w-full text-base bg-transparent p-2 pr-0 text-white outline-none text-right" placeholder="0" type="number" value={props.value} onChange={props.onChange} />
                <div className="flex p-2">
                    <span className="my-auto">{props.currency}</span>
                </div>
                <button className="w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={props.onClick}>
                    <h3 className="uppercase font-bold text-base">{props.buttonCopy}</h3>
                </button>
            </div>
        </div>
    )
}

export default SendBetweenAccounts
