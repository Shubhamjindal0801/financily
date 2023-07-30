import React from "react";
import NoTransacion from '../assests/transactions.004d9f02317991455e50b36d9dae2a26.svg'

function NoTransactions(){
    return(
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                flexDirection:'column',
                marginBottom:'2rem'
            }}
        >
            <img src={NoTransacion} style={{width:'400px',margin:'4rem'}} />
            <p style={{textAlign:'center',fontSize:'1.2rem'}}>
                You Have No Transactions Currently
            </p>
        </div>
    )
}

export default NoTransactions