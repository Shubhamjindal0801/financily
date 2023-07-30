import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal } from 'antd'
import AddExpenseModal from '../components/Modals/addExpense'
import AddIncomeModal from '../components/Modals/addIncome'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
import BackToTop from '../components/TopReach'
import Table from '../components/Table'
import Chart from '../components/Charts'
import NoTransation from '../components/NoTransactions'
import Loader from '../components/Loader'
import { doc, getFirestore, deleteDoc, limit } from "firebase/firestore";

function Dashboard() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth)
    const [isExpenseModal, setIsExpenseModal] = useState(false)
    const [isIncomeModal, setIsIncomeModal] = useState(false)
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [totalBalance, setTotalBalance] = useState(0)


    const showExpenseModal = () => {
        setIsExpenseModal(true)
    }
    const handleExpenseCancel = () => {
        setIsExpenseModal(false)
    }
    const showIncomeModal = () => {
        setIsIncomeModal(true)
    }
    const handleIncomeCancel = () => {
        setIsIncomeModal(false)
    }
    const onFinish = (values, type) => {
        const newTransaction = {
            type: type,
            date: (values.date).format("YYYY-MM-DD"),
            amount: parseFloat(values.amount),
            tag: values.tag,
            name: values.name
        }
        addTranaction(newTransaction)
    }

    async function addTranaction(transaction, many) {
        //Add amount
        try {
            const docRef = await addDoc(
                collection(db, `users/${user.uid}/transactions`),
                transaction
            )
            if (!many) toast.success('Transaction Added!')
            let newArr = transactions;
            newArr.unshift(transaction)
            setIsExpenseModal(false)
            setIsIncomeModal(false)
            setTransactions(newArr)
            fetchTransactions(true)
        } catch (e) {
            if (!many) toast.error("Couldn't add transaction!")
        }
    }
    useEffect(() => {
        fetchTransactions()
    }, [user])

    // async function resetBalance() {
    //     try {
    //         // const collectionRef = db.collection(user)
    //         // const snapshot = await collectionRef.get()
    //         // snapshot.docs.forEach((doc) => {
    //         //     doc.ref.delete()
    //         // })
    //         // toast.success("Reset Successfully")
    //         // fetchTransactions()
    //         await deleteDoc(doc(db, "users", user.uid));
    //         toast.success("Reset Successfully")
    //     }catch(e){
    //         toast.error("Unable to reser")
    //     }
    // }

    const resetBalance = async () => {
        const collectionPath = `users/${user.uid}/transactions`;
        try {
            console.log(collectionPath);
            const q = query(collection(db, collectionPath));
            const querySnapshot = await getDocs(q);

            const deleteOps = [];

            querySnapshot.forEach((doc) => {
                deleteOps.push(deleteDoc(doc.ref));
            });

            Promise.all(deleteOps).then(() => console.log("documents deleted"));
            setTransactions([])
        } catch (error) {
            console.error("Error deleting transactions collection: ", error);
        }
    };

    async function fetchTransactions(flag) {
        setLoading(true)
        if (user) {
            const q = query(collection(db, `users/${user.uid}/transactions`))
            const querySnapShot = await getDocs(q)
            let transactionsArray = []
            querySnapShot.forEach((doc) => {
                transactionsArray.push(doc.data())
            })
            setTransactions(transactionsArray)
            console.log('TT-', transactionsArray)

            if (!flag) {
                toast.success("Transactions Fetched");
            }
        }
        console.log('User>>> ', user)
        setLoading(false)
    }

    useEffect(() => {
        calculateBalance()
    }, [transactions])

    function calculateBalance() {
        let incomeTotal = 0;
        let expenseTotal = 0;

        transactions.forEach((data) => {
            if (data.type === "income") {
                incomeTotal += data.amount;
            }
            else {
                expenseTotal += data.amount;
            }
        })
        setIncome(incomeTotal)
        setExpense(expenseTotal)
        setTotalBalance(incomeTotal - expenseTotal);
    }

    let sortedTransaction = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    })

    return (
        <div>
            <Header />
            {loading ? <Loader />
                :
                <>
                    <Cards
                        income={income}
                        expense={expense}
                        totalBalance={totalBalance}
                        resetBalance={resetBalance}
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}
                    />
                    {transactions && transactions.length != 0 ? <Chart sortedTransaction={sortedTransaction} /> : <NoTransation />}
                    <AddExpenseModal
                        isExpenseModal={isExpenseModal}
                        handleExpenseCancel={handleExpenseCancel}
                        onFinish={onFinish}
                    />
                    <AddIncomeModal
                        isIncomeModal={isIncomeModal}
                        handleIncomeCancel={handleIncomeCancel}
                        onFinish={onFinish}
                    />
                    <Table transactions={transactions} fetchTransactions={fetchTransactions} addTranaction={addTranaction} />
                    <BackToTop/>
                </>}
        </div>
    )
}

export default Dashboard
