import type React from "react";
import { useEffect, useState } from "react";
import type { Investor } from "../domain/Investor";
import { fetchInvestors } from "../api/InvestorAPI";

const InvestorList: React.FC = () => {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInvestors = async () => {
            try {
                const response = await fetchInvestors();
                setInvestors(response);
            } catch (error) {
                setError('Failed to fetch investors');
            } finally {
                setLoading(false);
            }
        };

        getInvestors();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) return <p>{ error } </p>;

    return (
        <div>
            <h1>Investors List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date Added</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {investors.map((investor) => (
                        <tr key={investor.id}>
                            <td>{investor.id}</td>
                            <td>{investor.name}</td>
                            <td>{investor.investoryType}</td>
                            <td>{investor.dateAdded}</td>
                            <td>{investor.lastUpdated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default InvestorList;