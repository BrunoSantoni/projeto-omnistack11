import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Perfil() {
    const [casos, setCasos] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('perfil', {
            headers: {
                autorizacao: ongId,
            }
        }).then(response => {
            setCasos(response.data)
        })
    }, [ongId]);

    async function handleExcluirCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    autorizacao: ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        } catch {
            alert('Erro ao deletar caso');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongNome}</span>
                <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {casos.map(caso => ((
                <li key={caso.id}>
                    <strong>CASO:</strong>
                    <p>{caso.titulo}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{caso.descricao}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                    <button onClick={() => handleExcluirCaso(caso.id)} type="button">
                        <FiTrash2 size={20} color="#A8A8B3" />
                    </button>
                </li>
                )))}
            </ul>
        </div>
    );
}