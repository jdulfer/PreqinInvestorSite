import { useEffect, useState } from "react";
import type { Commitment } from "../domain/Commitment";
import { fetchCommitmentsByInvestorId } from "../api/investorAPI.ts";
import { useParams } from "react-router-dom";

type CommitmentParams = {
    investorId: string;
}

const CommitmentList: React.FC = () => {
    const [commitments, setCommitments] = useState<Commitment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { investorId } = useParams<CommitmentParams>();

    useEffect(() => {
        const getCommitments = async () => {
            try {
                const response = await fetchCommitmentsByInvestorId(Number(investorId));
                setCommitments(response);
            } catch (error) {
                setError('Failed to fetch commitments');
            } finally {
                setLoading(false);
            }
        };

        getCommitments();
    }, [investorId]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) return <p>{error} </p>;

    return (
        <div>
            <h1>Commitments List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset Class</th>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {commitments.map((commitment) => (
                        <tr key={commitment.id}>
                            <td>{commitment.id}</td>
                            <td>{commitment.assetClass}</td>
                            <td>{commitment.currency}</td>
                            <td>{commitment.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CommitmentList