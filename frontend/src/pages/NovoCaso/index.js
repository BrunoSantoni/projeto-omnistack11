import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const NovoCaso = () => {
    const[titulo, setTitulo] = useState('');
    const[descricao, setDescricao] = useState('');
    const[valor, setValor] = useState();
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleAddCaso(e) {
        e.preventDefault();
        const data = {
            titulo,
            descricao,
            valor,
        }
        console.log(data);

        try {
            await api.post('casos', data, {
                headers: {
                    autorizacao: ongId,
                }
            });

            alert('Caso adicionado com sucesso!');

            history.push('/perfil');
        } catch(err) {
            alert('Erro ao cadastrar caso');
        }
    }
    return(
        <div className="novo-caso-container">
            <div className="conteudo">
                <section>
                    <img src = {logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/perfil">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para a Home
                    </Link>
                </section>

                <form onSubmit={handleAddCaso}>
                    <input
                    type="text"
                    placeholder="Título do caso"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}/>

                    <textarea
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}/>

                    <input
                    type="text"
                    placeholder="Valor em R$"
                    value={valor}
                    onChange={e => setValor(parseFloat(e.target.value))}/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NovoCaso;