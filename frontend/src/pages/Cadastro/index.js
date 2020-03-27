import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();
        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            estado,            
        }

        try {
            const response = await api.post('ongs', data);
            //Faz um request de POST, na rota ongs, enviando os dados através de data
    
            alert(`Cadastro realizado com sucesso\nSeu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro ao cadastrar.');
        }
    }

    return(
        <div className="cadastro-container">
            <div className="conteudo">
                <section>
                    <img src = {logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para o Login
                    </Link>
                </section>

                <form onSubmit={handleCadastro}>
                    <input
                    type="text"
                    placeholder="Nome da ONG"
                    value={nome}
                    onChange={e => setNome(e.target.value)}/>

                    <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>

                    <input
                    type="text"
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input
                        type="text"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}/>

                        <input
                        type="text"
                        className="input-group"
                        placeholder="UF"
                        style={{ width: 80 }}
                        value={estado}
                        onChange={e => setEstado(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}