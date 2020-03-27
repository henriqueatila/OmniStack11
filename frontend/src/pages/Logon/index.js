import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png'; 
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api'; 

export default function Logon(){
    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try {

            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (error) {

            alert('ID Inválido ou não cadastrado');

        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">
                        Entrar
                    </button>

                    <Link to="/register" className="backlink">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                   </Link>
                </form>

            </section>

           <img src={heroesImg} alt="Heroes"/>

        </div>
    );
}