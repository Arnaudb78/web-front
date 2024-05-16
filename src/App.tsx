import './App.css';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

// Définir une interface pour le type de données renvoyées par l'API
interface ApiResponse {
    id: number;
    name: string;
}

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleClickArtists = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<ApiResponse> = await axios.get('http://localhost:8000/artists'); // Remplacez par l'URL de votre API
            setData(response.data);
        } catch (err) {
            setError('Une erreur s\'est produite lors de l\'appel à l\'API');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <p>FRONTEND</p>

            <div>
                <button onClick={handleClickArtists} disabled={loading}>
                    {loading ? 'Chargement...' : '/artists '}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </>
    );
}

export default App;
