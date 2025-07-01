function Button ({ texto, color }){
    return(
    <button className={`bg-${color} hover:bg-AzulClaro font-bold py-2 px-4 rounded-full w-full`}>
        {texto}
      </button>
    )
}

export default Button;