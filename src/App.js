import React, {useState} from 'react';
import Header from'./components/Header';
import Footer from'./components/Footer';
import Transaction from'./components/Transaction';
import SaldoBox from'./components/SaldoBox';
import AddTransaction from'./components/AddTransaction';

const initTansactions=[
    {
        "id":"619941539079",
        "tanggal":new Date("01 Nov 2021 9:30").getTime(),
        "keterangan":"Gaji bulanan",
        "nominal":2500000,
    },
    {
        "id":"619941539070",
        "tanggal":new Date("01 Nov 2021 9:30").getTime(),
        "keterangan":"Gaji bulanan",
        "nominal":7500000,
    },
    {
        "id":"619941539070",
        "tanggal":new Date("01 Nov 2021 9:30").getTime(),
        "keterangan":"Belanja bulanan",
        "nominal":-2500000,
    },
];

const App=()=>{
    const[transactions, setTransaction] = useState(initTansactions);
    console.log(transactions);
    //handler untuk menambah data transaction,
    //akan di-trigger dari komponen AddTransaction
    const handleTambahTransaction=(data)=>{
        let newTransactions=[
            ...transactions,data
        ];
        //atur ulang urutan transaction agar tanggal terkecildibagianatas
        newTransactions.sort((a,b)=>a.tanggal-b.tanggal);
        setTransaction(newTransactions);
    }
    //handler untuk menghapus data transaction dikomponen AddTransaction
    const handleHapusTransaction=(e)=>{
        //cari index transaction yang akan dihapus berdasarkan id
        const result=transactions.findIndex(
            transaction=>(transaction.id===e.target.id)
        );
        //copy transactions karena fungsi splice akan mengubah array asal(mutate)
        const newTransactions=transactions;
        newTransactions.splice(result,1);
        setTransaction([...newTransactions])
    }

    return(
    <React.Fragment>
        <Header/>
        <SaldoBox transactions={transactions}/>
        <Transaction transactions={transactions}onHapusTransaction={handleHapusTransaction}/>
        <AddTransaction onTambahTransaction={handleTambahTransaction}/>
        <Footer/>
    </React.Fragment>
    )
}

export default App;