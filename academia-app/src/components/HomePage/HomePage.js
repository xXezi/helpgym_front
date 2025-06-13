import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ArticleModal from '../Modal/ArticleModal';
import { fadeIn, fadeOut, slideIn } from '../../styles/animations';
import ReactMarkdown from 'react-markdown'; // Keep this if you plan to use markdown elsewhere, otherwise optional for this specific fix

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f0f0f0; overflow-x: hidden; }
  body.modal-open { overflow: hidden; }
`;

const HeaderContainer = styled.header`
  background-color: #222;
  color: white;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; /* Pushes nav links/user info to the right */
`;

const Logo = styled(Link)`
  font-size: 2em; font-weight: bold; color: white; text-decoration: none;
  font-family: 'Helvetica Neue', sans-serif;
  span { color: #007bff; }
`;

const Slogan = styled.span`
  font-size: 1em; color: #bbb; margin-left: 10px; font-style: italic;
  @media (max-width: 768px) { display: none; }
`;

const NavItemsContainer = styled.div`
 display: flex;
 align-items: center;
 margin-left: auto; /* Take remaining space to push from search */
`;


const NavLink = styled(Link)`
  color: #bbb;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1em;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
    font-weight: bold;
  }
`;

const UserInfo = styled.span`
  color: #bbb;
  margin: 0 15px; /* Consistent margin */
  font-size: 1em;
  white-space: nowrap; /* Prevent wrapping */
`;

const LogoutButton = styled.button`
  color: #bbb;
  background: none;
  border: none;
  text-decoration: none;
  margin: 0 15px; /* Consistent margin */
  font-size: 1em;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: 'Arial', sans-serif;
  padding: 0;

  &:hover {
    color: white;
  }
`;


const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const SearchContainer = styled.div`
  position: relative; display: flex; align-items: center;
  border-radius: 20px; background-color: #333; padding: 0 10px;
  transition: width 0.3s ease;
  /* Removed margin: 0 auto; Allow flexbox to handle positioning */
  margin-left: 20px; /* Add some space from logo */
  margin-right: 20px; /* Add some space before nav items */
  max-width: 350px;
  width: auto;
`;

const SearchInput = styled.input`
  border: none; padding: 8px; font-size: 1em;
  width: ${({ isExpanded }) => (isExpanded ? '250px' : '0')};
  background-color: transparent; color: white; outline: none; overflow: hidden;
  transition: width 0.3s ease;
  pointer-events: ${({ isExpanded }) => (!isExpanded ? 'none' : 'auto')};

  &::placeholder { color: #bbb; }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 1.2em; color: #aaa; cursor: pointer; transition: color 0.2s ease;
  z-index: 2; position: relative;
  &:hover { color: white; }

  ${(props) =>
    props.hideHero &&
    css`animation: ${pulse} 1.5s infinite;`}
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: ${props => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }

  transition: opacity 0.6s ease;
  opacity: ${props => props.opacity};
`;
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  max-width: 800px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const HeroText = styled.div`
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 15px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;
const Subtitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 20px;
  font-weight: normal;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
const Content = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 15px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: 'Arial', sans-serif;
  padding-top: 0;
  padding-bottom: 40px;
`;

const ArticlesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ArticleCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 800px;
  width: 90%;
  text-align: center;
  transition: opacity 0.4s ease, transform 0.4s ease;

  &.fade-out {
    opacity: 0;
    transform: translateY(-20px);
  }

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
    animation: ${slideIn} 0.4s ease;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const ArticleTitle = styled.h3`
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

const ArticleTeaser = styled.p`
  color: #666;
  font-size: 1em;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const ReadMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover { background-color: #0056b3; }
`;

const SponsorsSection = styled.div`
  width: 100%;
  padding: 40px 20px;
  background-color: #fff;
  text-align: center;
`;

const SponsorLogo = styled.img`
  max-width: 150px;
  margin: 20px;
`;

const AboutSection = styled.div`
  width: 100%;
  padding: 40px 20px;
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const AboutContent = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 20px;
  color: #555;
`;

const AboutImages = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const AboutImage = styled.img`
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

function HomePage() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [heroOpacity, setHeroOpacity] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [hideHero, setHideHero] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const articlesSectionRef = useRef(null);
    const [userData, setUserData] = useState(null);

    const imageUrls = {
      article1: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article2: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article3: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article4: "https://www.onweb.com.br/wp-content/uploads/2024/03/Como-utilizar-tecnologia-para-treinamento-fisico.jpg",
      about1: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about2: "https://images.unsplash.com/photo-1594911772135-4fdaba7b581b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D",
      about3: "https://images.unsplash.com/photo-1574680178288-7918b82d2429?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sponsor1: "https://logospng.org/download/max-titanium/max-titanium-2048.png",
      sponsor2: "https://s2-cbn.glbimg.com/Zk44PZ_XneRbUnJPV-nWLwCVFfg=/0x0:2048x1364/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d975fad146a14bbfad9e763717b09688/internal_photos/bs/2025/r/j/9MWoDzQ9KcfB8Qm2kkCg/gip1mfaxwae4i3g.jpeg",
      sponsor3: "https://static.vecteezy.com/system/resources/previews/036/028/618/non_2x/gym-logo-creative-strong-academy-fitness-reaching-star-sport-design-concept-vector.jpg",
    };

    const [articles, setArticles] = useState([
      {
        id: 1,
        title: 'Treinamento Inclusivo: Acessibilidade para Todos',
        shortContent: 'Descubra como adaptar seus treinos para diferentes necessidades e habilidades...',
        fullContent: `
          <div>
            <h2>Treinamento Inclusivo: Acessibilidade para Todos</h2>
            <p>Acreditamos que o fitness deve ser acessível a todos, independentemente de suas habilidades ou limitações. Este artigo explora como adaptar treinos para atender às necessidades individuais, promovendo um ambiente inclusivo e encorajador.</p>
            <h3>Princípios do Treinamento Inclusivo:</h3>
            <ul>
              <li><strong>Adaptação:</strong> Modifique exercícios para atender às necessidades individuais.</li>
              <li><strong>Acessibilidade:</strong> Garanta que o ambiente de treino seja acessível a todos.</li>
              <li><strong>Respeito:</strong> Crie um ambiente de apoio e respeito mútuo.</li>
            </ul>
            <p>(Exemplos de adaptações para diferentes necessidades)</p>
          </div>
        `,
        image: imageUrls.article1,
      },
      {
        id: 2,
        title: 'Nutrição Consciente: Alimentando um Corpo Diversificado',
        shortContent: 'Aprenda a importância da nutrição personalizada para diferentes tipos de corpos e necessidades...',
        fullContent: `
          <div>
            <h2>Nutrição Consciente: Alimentando um Corpo Diversificado</h2>
            <p>A nutrição desempenha um papel fundamental na saúde e no bem-estar, mas as necessidades nutricionais variam de pessoa para pessoa. Este artigo aborda a importância da nutrição personalizada e como adaptar sua dieta para atender às suas necessidades individuais.</p>
            <h3>Princípios da Nutrição Consciente:</h3>
            <ul>
              <li><strong>Individualização:</strong> Adapte sua dieta para atender às suas necessidades específicas.</li>
              <li><strong>Variedade:</strong> Inclua uma variedade de alimentos nutritivos em sua dieta.</li>
              <li><strong>Equilíbrio:</strong> Mantenha um equilíbrio entre macronutrientes e micronutrientes.</li>
            </ul>
            <p>(Exemplos de planos alimentares para diferentes necessidades)</p>
          </div>
        `,
        image: imageUrls.article2,
      },
      {
        id: 3,
        title: 'Construindo Comunidades Fitness Inclusivas',
        shortContent: 'Saiba como criar espaços de treino que acolham a diversidade e promovam a inclusão...',
        fullContent: `
          <div>
            <h2>Construindo Comunidades Fitness Inclusivas</h2>
            <p>Acreditamos que o fitness é mais do que apenas exercícios; é sobre construir comunidades que apoiem e celebrem a diversidade. Este artigo explora como criar espaços de treino inclusivos, onde todos se sintam bem-vindos e valorizados.</p>
            <h3>Estratégias para Construir Comunidades Inclusivas:</h3>
            <ul>
              <li><strong>Comunicação:</strong> Promova a comunicação aberta e o diálogo.</li>
              <li><strong>Empatia:</strong> Incentive a compreensão e o respeito pelas diferenças.</li>
              <li><strong>Colaboração:</strong> Crie oportunidades para que as pessoas trabalhem juntas e se apoiem mutuamente.</li>
            </ul>
            <p>(Exemplos de iniciativas para promover a inclusão em academias e grupos de treino)</p>
          </div>
        `,
        image: imageUrls.article3,
      },
      {
        id: 4,
        title: 'Tecnologia Assistiva no Fitness: Ferramentas para Superar Barreiras',
        shortContent: 'Explore como a tecnologia pode ser utilizada para tornar o fitness mais acessível e inclusivo...',
        fullContent: `
          <div>
            <h2>Tecnologia Assistiva no Fitness: Ferramentas para Superar Barreiras</h2>
            <p>A tecnologia tem o poder de transformar vidas e o fitness não é exceção. Este artigo explora como a tecnologia assistiva pode ser utilizada para tornar o fitness mais acessível e inclusivo para pessoas com deficiência.</p>
            <h3>Exemplos de Tecnologias Assistivas:</h3>
            <ul>
              <li><strong>Aplicativos:</strong> Aplicativos de treino adaptados para diferentes necessidades.</li>
              <li><strong>Dispositivos:</strong> Dispositivos vestíveis que monitoram o progresso e fornecem feedback.</li>
              <li><strong>Equipamentos:</strong> Equipamentos de treino adaptados para diferentes habilidades.</li>
            </ul>
            <p>(Exemplos de como a tecnologia assistiva pode ser utilizada para melhorar a experiência de treino de pessoas com deficiência)</p>
          </div>
        `,
        image: imageUrls.article4,
      },
    ]);

    // Effect to load user data on component mount
    useEffect(() => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');

      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          setUserData(user); // Set the user data object
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          // Clear invalid data if parsing fails
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUserData(null); // Explicitly set to null
        }
      } else {
        // Ensure userData is null if no token/user found
        setUserData(null);
      }
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUserData(null); // Update state to reflect logout
      // Optional: Redirect to login page using useNavigate if needed
      // navigate('/login');
    };

    const openArticleModal = (article) => {
        setSelectedArticle(article);
    };
    const closeArticleModal = () => {
        setSelectedArticle(null);
    };

    const scrollToArticles = () => {
        if (articlesSectionRef.current) {
            articlesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Effect for filtering articles based on search query
    useEffect(() => {
      const newFilteredArticles = articles.filter((article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.shortContent.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (JSON.stringify(newFilteredArticles) !== JSON.stringify(filteredArticles)) {
        setFilteredArticles(newFilteredArticles);
      }

      setHideHero(searchQuery !== '');

    }, [searchQuery, articles, filteredArticles]);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
          setIsSearchExpanded(true);
        }
    };

    const toggleSearchExpansion = () => {
        if (!searchQuery) {
          setIsSearchExpanded(!isSearchExpanded);
        } else {
           setIsSearchExpanded(true);
        }
    };

  // Effect for scroll behavior (hero opacity) and modal body class
  useEffect(() => {
    const handleScroll = () => {
      if (articlesSectionRef.current && !hideHero) {
        const articlesSectionTop = articlesSectionRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        let newHeroOpacity = 1 - (scrollY / (articlesSectionTop - windowHeight * 0.5));
        newHeroOpacity = Math.max(0, Math.min(1, newHeroOpacity));
        setHeroOpacity(newHeroOpacity);
      } else if (hideHero) {
        setHeroOpacity(0);
      } else {
        setHeroOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    if (selectedArticle) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('modal-open');
    };
  }, [selectedArticle, hideHero]);


    return (
        <>
            <GlobalStyle />
            <HeaderContainer>
                <LogoContainer>
                    <Logo to="/">Help<span>Gym</span></Logo>
                    <Slogan>Seu guia para uma vida mais saudável</Slogan>
                </LogoContainer>

                <SearchContainer>
                    <SearchIcon hideHero={hideHero} onClick={toggleSearchExpansion} />
                    <SearchInput
                        isExpanded={isSearchExpanded}
                        placeholder="Buscar artigos..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </SearchContainer>

                 <NavItemsContainer>
                    {userData ? (
                        <>
                            {/* This correctly uses 'nome' */}
                            <UserInfo>Olá, {userData.nome || 'Usuário'}</UserInfo>
                            <LogoutButton onClick={handleLogout}>
                                Logout
                            </LogoutButton>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Cadastro</NavLink>
                        </>
                    )}
                 </NavItemsContainer>
            </HeaderContainer>

            <Container>
                <HeroSection hide={hideHero} opacity={hideHero ? 0 : heroOpacity}>
                    <VideoBackground autoPlay muted loop>
                        <source src="/videos/background.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </VideoBackground>
                    <HeroContent>
                        <HeroText>
                            <Title>Bem-vindo ao HelpGym</Title>
                            <Subtitle>Sua plataforma completa para fitness e bem-estar</Subtitle>
                            <Content>
                                Descubra treinos personalizados, dicas de nutrição e uma comunidade que apoia seu progresso.
                                Comece sua jornada para uma vida mais saudável hoje mesmo!
                            </Content>
                            <Button onClick={scrollToArticles}>Explorar Artigos</Button>
                        </HeroText>
                    </HeroContent>
                </HeroSection>

                <ArticlesSection ref={articlesSectionRef}>
                    <Title style={{ color: '#333', marginBottom: '30px' }}>Artigos em Destaque</Title>
                    {(searchQuery ? filteredArticles : articles).map((article) => (
                        <ArticleCard key={article.id} className="fade-in">
                            <ArticleImage src={article.image} alt={article.title} />
                            <ArticleTitle>{article.title}</ArticleTitle>
                            <ArticleTeaser>{article.shortContent}</ArticleTeaser>
                            <ReadMoreButton onClick={() => openArticleModal(article)}>
                                Ler Mais
                            </ReadMoreButton>
                        </ArticleCard>
                    ))}
                     {searchQuery && filteredArticles.length === 0 && (
                        <p style={{ color: '#555', fontSize: '1.1em', marginTop: '20px' }}>Nenhum artigo encontrado para "{searchQuery}".</p>
                    )}
                </ArticlesSection>

                <SponsorsSection>
                    <Title style={{ color: '#333', marginBottom: '30px' }}>Nossos Patrocinadores</Title>
                    <div>
                        <SponsorLogo src={imageUrls.sponsor1} alt="Patrocinador 1" />
                        <SponsorLogo src={imageUrls.sponsor2} alt="Patrocinador 2" />
                        <SponsorLogo src={imageUrls.sponsor3} alt="Patrocinador 3" />
                    </div>
                </SponsorsSection>

                <AboutSection>
                    <AboutTitle>Sobre Nós</AboutTitle>
                    <AboutContent>
                        O HelpGym nasceu da paixão por tornar o fitness acessível a todos. Nossa missão é fornecer recursos de qualidade, orientação especializada e uma comunidade de apoio para ajudar você a alcançar seus objetivos de saúde e bem-estar.
                    </AboutContent>
                    <AboutContent>
                        Com uma equipe de profissionais dedicados e apaixonados, estamos comprometidos em oferecer conteúdo relevante e baseado em evidências para apoiar sua jornada fitness.
                    </AboutContent>
                    <AboutImages>
                        <AboutImage src={imageUrls.about1} alt="Sobre nós 1" />
                        <AboutImage src={imageUrls.about2} alt="Sobre nós 2" />
                        <AboutImage src={imageUrls.about3} alt="Sobre nós 3" />
                    </AboutImages>
                </AboutSection>
            </Container>

            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={closeArticleModal} />
            )}
        </>
    );
}

export default HomePage;