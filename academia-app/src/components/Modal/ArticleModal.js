import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ArticleModal({ article, onClose }) {
    // Estado inicial dos comentários (com likes)
    const [comments, setComments] = useState([
        {
            user: "João Silva",
            comment: "Ótimo artigo! Muito informativo.",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            likes: 5,
            liked: false,
        },
        {
            user: "Maria Souza",
            comment: "Gostei das dicas, vou começar a aplicar hoje mesmo!",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            likes: 12,
            liked: false,
        },
        {
            user: "Pedro Santos",
            comment: "Seria legal um artigo sobre treino para ectomorfos.",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            likes: 3,
            liked: false,
        },
    ]);

    // Função para dar like/deslike
    const handleLike = (index) => {
        setComments((prevComments) => {
            const newComments = [...prevComments]; // Cria uma cópia
            const comment = newComments[index];

            if (comment.liked) {
                comment.likes -= 1;
            } else {
                comment.likes += 1;
            }
            comment.liked = !comment.liked;

            return newComments;
        });
    };

    // --- Definições dos Componentes Estilizados (DENTRO da função) ---
    const Overlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: ${fadeIn} 0.3s ease;
    `;

    const ModalContainer = styled.div`
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        max-width: 80%;
        width: 800px;
        position: relative;
        overflow-y: auto;
        max-height: 90vh;
    `;

    const CloseButton = styled.button`
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: #888;
        &:hover {
            color: black;
        }
    `;

    const ArticleImage = styled.img`
        width: 100%;
        max-width: 500px;
        border-radius: 10px;
        margin-bottom: 15px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;

    const ArticleTitle = styled.h2`
        color: #333;
        font-size: 1.8em;
        margin-bottom: 10px;
        text-align: center;
    `;

   const ArticleContent = styled.div`
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    text-align: justify;
    padding: 20px;

    h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
    }

    h3 {
        font-size: 18px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        margin-bottom: 15px;
    }

    ul {
        list-style-type: disc;
        margin-left: 20px;
        margin-bottom: 15px;
    }

    li {
        margin-bottom: 8px;
    }

    strong {
        font-weight: bold;
    }

    blockquote {
        font-style: italic;
        border-left: 4px solid #ccc;
        padding-left: 1em;
        margin-left: 1em;
        margin-bottom: 1em;
    }
    `;

    const CommentsSection = styled.div`
        margin-top: 20px;
        border-top: 1px solid #eee;
        padding-top: 20px;
    `;

    const Comment = styled.div`
        display: flex;
        align-items: flex-start;
        margin-bottom: 15px;
    `;

    const Avatar = styled.img`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    `;

    const CommentText = styled.p`
        color: #666;
        font-size: 1em;
        line-height: 1.4;
        flex: 1;
        strong{
        color: black;
        }
    `;

    const LikeButton = styled.button`
        background: none;
        border: none;
        cursor: pointer;
        color: #888;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        margin-left: 10px;
        padding: 0;
        outline: none;

        &.liked {
            color: red;
        }
        span {
            margin-left: 5px;
            font-size: 0.9em;
        }
    `;

    // --- Fim das Definições ---

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>

                {article ? (
                    <>
                        <ArticleImage src={article.image} alt={article.title} />
                        <ArticleTitle>{article.title}</ArticleTitle>
                        {/* Usando ReactMarkdown */}
                        <ArticleContent dangerouslySetInnerHTML={{ __html: article.fullContent }} />
                        <CommentsSection>
                            {comments.map((comment, index) => (
                                <Comment key={index}>
                                    <Avatar src={comment.avatar} alt={`Avatar de ${comment.user}`} />
                                    <CommentText>
                                        <strong>{comment.user}:</strong> {comment.comment}
                                    </CommentText>
                                    <LikeButton
                                        onClick={() => handleLike(index)}
                                        className={comment.liked ? "liked" : ""}
                                    >
                                        {comment.liked ? <FaHeart /> : <FaRegHeart />}
                                        <span>{comment.likes}</span>
                                    </LikeButton>
                                </Comment>
                            ))}
                        </CommentsSection>
                    </>
                ) : (
                    <p>Artigo não encontrado.</p>
                )}
            </ModalContainer>
        </Overlay>
    );
}

export default ArticleModal;
