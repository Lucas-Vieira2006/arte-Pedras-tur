import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourService';

const TourForm = ({ tourParaEditar, aoFinalizarEdicao, onSucesso }) => {
    const categoriasOpcoes = ['Natureza', 'Aventura', 'Compras', 'Cultura', 'Noturnos', 'Combos', 'Apenas Transfer', 'Geral'];

    const estadoInicial = {
        nome: '',
        descricao: '',
        precoBase: '',
        localizacao: '',
        duracaoHoras: '',
        incluiTransporte: false,
        valorTransfer: null,
        imagemUrl: '',
        ativo: true,
        categoria: 'Geral'
    };

    const [formData, setFormData] = useState(estadoInicial);
    
    // ESTADOS PARA IMAGEM
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [fazendoUpload, setFazendoUpload] = useState(false);
    
    // NOVO ESTADO: Controla qual método o usuário quer usar
    const [metodoImagem, setMetodoImagem] = useState('url'); // 'url' ou 'upload'

    useEffect(() => {
        if (tourParaEditar) {
            setFormData({
                ...tourParaEditar,
                categoria: tourParaEditar.categoria || 'Geral' 
            });
            setPreviewUrl(tourParaEditar.imagemUrl || '');
            // Se já tem URL, assume o método URL como padrão na edição
            setMetodoImagem(tourParaEditar.imagemUrl ? 'url' : 'upload');
            window.scrollTo(0, 0);
        } else {
            setFormData(estadoInicial);
            setPreviewUrl('');
            setImagemArquivo(null);
        }
    }, [tourParaEditar]);

useEffect(() => {
        if (formData.categoria === 'Apenas Transfer') {
            setFormData(prev => ({
                ...prev,
                precoBase: 0,
                incluiTransporte: true
            }));
        }
    }, [formData.categoria]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        });

        // Se o usuário estiver digitando a URL, atualiza o preview na hora
        if (name === 'imagemUrl' && metodoImagem === 'url') {
            setPreviewUrl(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemArquivo(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadImagemParaNuvem = async (arquivo) => {
        const data = new FormData();
        data.append('image', arquivo);
        
        // Substitua pela sua chave do ImgBB
        const IMGBB_API_KEY = 'e64fe2b9d4a9263a384a85c98aa846a1'; 

        const resposta = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: data
        });

        const resultado = await resposta.json();
        return resultado.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFazendoUpload(true);

        try {
            let urlFinalDaImagem = formData.imagemUrl;

            // Só faz o upload se o método escolhido for 'upload' E tiver um arquivo
            if (metodoImagem === 'upload' && imagemArquivo) {
                urlFinalDaImagem = await uploadImagemParaNuvem(imagemArquivo);
            }

            const dadosParaSalvar = {
                ...formData,
                imagemUrl: urlFinalDaImagem
            };

            let resultado;

            if (tourParaEditar) {
                await TourService.updateTour(tourParaEditar.id, dadosParaSalvar);
                alert("Passeio atualizado com sucesso!");
                resultado = dadosParaSalvar; 
            } else {
                resultado = await TourService.createTour(dadosParaSalvar);
                alert("Cadastrado com sucesso!");
            }
            
            if (onSucesso) onSucesso(resultado);
            
            setFormData(estadoInicial);
            setImagemArquivo(null);
            setPreviewUrl('');
            if (aoFinalizarEdicao) aoFinalizarEdicao(); 
            
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao processar a requisição.");
        } finally {
            setFazendoUpload(false);
        }
    };

    useEffect(() => {
        if (!formData.incluiTransporte) {
            setFormData(prev => ({
                ...prev,
                valorTransfer: null
            }));
        }
    }, [formData.incluiTransporte]);

   return (
        <div className="container mt-5 shadow p-4 rounded bg-white">
            <h2 className="mb-4 text-primary">
                {tourParaEditar ? 'Editar Passeio' : 'Cadastrar Novo Passeio'}
            </h2>
            
            <form onSubmit={handleSubmit}>
                {/* LINHA 1: Nome, Categoria e Preço */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome do Passeio</label>
                        <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Categoria</label>
                        <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange}>
                            {categoriasOpcoes.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Preço (R$)</label>
                        <input type="number" step="0.01" className="form-control" name="precoBase" value={formData.precoBase} onChange={handleChange} required />
                    </div>
                </div>

                {/* LINHA 2: Localização e Duração (AGORA ALINHADOS) */}
                <div className="row">
                    <div className="col-md-9 mb-3">
                        <label className="form-label">Localização</label>
                        <input type="text" className="form-control" name="localizacao" value={formData.localizacao} onChange={handleChange} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Duração (Horas)</label>
                        <input type="number" className="form-control" name="duracaoHoras" value={formData.duracaoHoras} onChange={handleChange} />
                    </div>
                </div>

                {/* --- SEÇÃO DE IMAGEM ISOLADA --- */}
                <div className="bg-light p-3 rounded mb-3 border">
                    <div className="mb-2">
                        <label className="form-label fw-bold">Como deseja adicionar a imagem?</label>
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="metodoImagem" 
                                    id="radioUrl" 
                                    checked={metodoImagem === 'url'}
                                    onChange={() => setMetodoImagem('url')}
                                />
                                <label className="form-check-label" htmlFor="radioUrl">
                                    Colar URL (Link)
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="metodoImagem" 
                                    id="radioUpload" 
                                    checked={metodoImagem === 'upload'}
                                    onChange={() => setMetodoImagem('upload')}
                                />
                                <label className="form-check-label" htmlFor="radioUpload">
                                    Fazer Upload de Arquivo
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        {metodoImagem === 'url' ? (
                            <input 
                                type="text" 
                                className="form-control" 
                                name="imagemUrl" 
                                value={formData.imagemUrl} 
                                onChange={handleChange} 
                                placeholder="Ex: https://images.unsplash.com/..." 
                                required={metodoImagem === 'url'}
                            />
                        ) : (
                            <input 
                                type="file" 
                                className="form-control" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required={metodoImagem === 'upload' && !tourParaEditar}
                            />
                        )}
                        
                        {previewUrl && (
                            <div className="mt-3 text-center bg-white p-2 rounded border">
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="img-fluid rounded" 
                                    style={{ maxHeight: '150px', objectFit: 'contain' }} 
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* --- FIM DA SEÇÃO DE IMAGEM --- */}

                <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea className="form-control" name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4">
                        <div className="form-check mt-2">
                            <input type="checkbox" className="form-check-input" name="incluiTransporte" checked={formData.incluiTransporte} onChange={handleChange} id="transporte" />
                            <label className="form-check-label" htmlFor="transporte">Inclui serviço de transporte</label>
                        </div>
                    </div>

                    {formData.incluiTransporte && (
                        <div className="col-md-4 animate__animated animate__fadeIn">
                            <label className="form-label text-primary fw-bold">Valor do Transfer (R$)</label>
                            <input type="number" step="0.01" className="form-control border-primary" name="valorTransfer" value={formData.valorTransfer || ''} onChange={handleChange} required />
                        </div>
                    )}
                </div>

                <div className="d-flex gap-2">
                    <button 
                        type="submit" 
                        className={`btn ${tourParaEditar ? 'btn-primary' : 'btn-success'} w-100 fw-bold`}
                        disabled={fazendoUpload}
                    >
                        {fazendoUpload ? 'Processando...' : (tourParaEditar ? 'Salvar Alterações' : 'Salvar Passeio')}
                    </button>
                    
                    {tourParaEditar && (
                        <button type="button" className="btn btn-outline-secondary w-50" onClick={() => aoFinalizarEdicao()}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};


export default TourForm;