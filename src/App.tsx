import './App.css';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

// Définir une interface pour le type de données renvoyées par l'API
interface Artist {
    id: number;
    nom: string;
    prenom: string;
    nationalite: string;
    genre: string;
    biographie: string;
}

function App() {
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [createdArtist, setCreatedArtist] = useState<Artist | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [findArtist, setFindArtist] = useState<Artist | null>(null);

    const handleClickArtists = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<Artist[]> = await axios.get('http://localhost:8000/artists');
            setArtists(response.data);
        } catch (err) {
            setError('Une erreur s\'est produite lors de l\'appel à l\'API');
        } finally {
            setLoading(false);
        }
    };

    const handleClickPostArtist = async () => {
        setLoading(true);
        setError(null);
        try {
            const idInput = document.getElementById("id") as HTMLInputElement;
            const nomInput = document.getElementById("nom") as HTMLInputElement;
            const prenomInput = document.getElementById("prenom") as HTMLInputElement;
            const nationaliteInput = document.getElementById("nationalite") as HTMLInputElement;
            const genreInput = document.getElementById("genre") as HTMLInputElement;
            const biographieInput = document.getElementById("biographie") as HTMLInputElement;

            const artistData = {
                id: Number(idInput.value),
                nom: nomInput.value,
                prenom: prenomInput.value,
                nationalite: nationaliteInput.value,
                genre: genreInput.value,
                biographie: biographieInput.value,
            };

            const response: AxiosResponse<Artist> = await axios.post('http://localhost:8000/artists/', artistData);
            setCreatedArtist(response.data);
        } catch (err) {
            setError('Une erreur s\'est produite lors de l\'appel à l\'API');
        } finally {
            setLoading(false);
        }
    };

    const handleClickSearchArtist = async () => {
        setLoading(true);
        setError(null);
        try {
            const nom = document.getElementById("searchName") as HTMLInputElement;

            // Utiliser encodeURIComponent pour encoder correctement le nom de l'artiste dans l'URL
            const encodedNom = encodeURIComponent(nom.value);

            // Construire l'URL avec le nom de l'artiste encodé
            const url = `http://localhost:8000/search/artists/${encodedNom}`;

            // Envoyer la requête GET avec l'URL construit
            const response: AxiosResponse<Artist> = await axios.get(url);
            setFindArtist(response.data);
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
                    {loading ? 'Chargement...' : 'Récupérer les artistes'}
                </button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {artists.map(artist => (
                    <div key={artist.id}>
                        <pre>{JSON.stringify(artist, null, 2)}</pre>
                    </div>
                ))}
                {error && <p className="error">{error}</p>}
                {createdArtist && (
                    <div className="success">
                        <h3>Artiste créé avec succès :</h3>
                        <pre>{JSON.stringify(createdArtist, null, 2)}</pre>
                    </div>
                )}
            </div>
            <br/>
            <div className="artist-form">
                <h2>Créer un nouvel artiste</h2>
                <div className="input-group">
                    <label htmlFor="id">ID :</label>
                    <input id="id" type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="nom">Nom :</label>
                    <input id="nom" type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="prenom">Prénom :</label>
                    <input id="prenom" type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="nationalite">Nationalité :</label>
                    <input id="nationalite" type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="genre">Genre :</label>
                    <input id="genre" type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="biographie">Biographie :</label>
                    <input id="biographie" type="text"/>
                </div>
                <button onClick={handleClickPostArtist} disabled={loading}>
                    {loading ? 'Chargement...' : 'Créer un artiste'}
                </button>
                {error && <p className="error">{error}</p>}
                {createdArtist && (
                    <div className="success">
                        <h3>Artiste créé avec succès :</h3>
                        <pre>{JSON.stringify(createdArtist, null, 2)}</pre>
                    </div>
                )}
            </div>
            <br/>
            <div>
                <h2>Recherchez un artiste par son nom</h2>
                <div className="input-group">
                    <label htmlFor="searchName">nom :</label>
                    <input id="searchName" type="text"/>
                </div>
                <button onClick={handleClickSearchArtist} disabled={loading}>
                    {loading ? 'Chargement...' : 'Récupérer l\'artiste'}
                </button>
                <div className="artist-search-results">
                    {/* Afficher la réponse de la recherche uniquement ici */}
                    {createdArtist && (
                        <div className="success">
                            <h3>Artiste trouvé :</h3>
                            <pre>{JSON.stringify(createdArtist, null, 2)}</pre>
                        </div>
                    )}
                    {error && <p className="error">{error}</p>}
                    {findArtist && (
                        <div className="success">
                            <pre>{JSON.stringify(findArtist, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>


        </>
    );
}

export default App;
