import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { Typography } from 'antd';
import { firestore } from '../../../config/firebase';

const { Title } = Typography;

export default function Events() {
    const { user } = useAuthContext();
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocument = async () => {
        let array = [];
        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            array.push(doc.data());
        });
        setDocuments(array);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDocument();
    }, []);

    return (
        <>
            <Title level={1} className="text-center text-white py-3">
                All Events
            </Title>

            <main className="showTodos">
                <div className="card p-3 p-md-4 p-lg-5" style={{ borderRadius: '20px' }}>
                    {!isLoading ? (
                        <table className="table table-light table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((todo, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{todo.title}</td>
                                        <td>{todo.location}</td>
                                        <td>{todo.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <div className="spinner-grow"></div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
