import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'; 

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            alert('Erro ao deletar caso. Tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">

            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={16} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li> 
                ))}               
            </ul>

        </div>
    );
}