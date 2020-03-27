import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

const ongId = localStorage.getItem('ongId');


export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();


    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isto.</p>
                
                    <Link to="/profile" className="backlink">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                   </Link>
                
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Titulo do caso"/>
                    <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descrição do caso"/>
                    <input 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Valor em reais"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}