
export const  AlertModal = ({text, iserror}) => {
    return (
        <>
        {
            <div className={`alert`}
                style={{ backgroundColor: iserror? 'red': 'green'}}
            >
            {text}
            
            </div> 
          
          }
        </>
    )
}
