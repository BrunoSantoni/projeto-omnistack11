import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroisImg from '../../assets/heroes.png';

export default function Login() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('login', {id});

            console.log(response.data.nome);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            history.push('/perfil')

        } catch(err) {
            alert('Falha no login');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={ logoImg } alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input
                    type="text"
                    placeholder="Informe o ID"
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size = {16} color = "#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={ heroisImg } alt="Heróis"/>
        </div>
    );
};