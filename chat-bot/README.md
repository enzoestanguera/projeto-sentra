**DOCUMENTAÇÃO TÉCNICA E OFICIAL: SENTRA-BOT** 

**Plataforma:** IBM watson Assistant 

**Objetivo:** chat bot inteligente de monitoramento tático de incêndios, telemetria climática, regulação de hospitais e difusão de alertas de emergência na Floresta Amazônica.

**1\. ARQUITETURA E LÓGICA DE SEGURANÇA.**

**COMO O BOT FUNCIONA**

O Sentra-Bot não utiliza um menu unico para todos. Ele possui um sistema rigoroso para controlar o acesso baseado em perfis de usuário. Todo o funcionamento e a segurança do bot giram em torno de uma variável ou melhor dizendo uma memória do bot chamada perfil\_do\_usuario.

**A Captura da Identidade:** Logo na primeira mensagem (Ação de Saudação), o bot pergunta qual é o papel do usuário, aí ele vai escolher entre Bombeiro, Socorrista, Órgão Público, Habitante/Morador ou Estudante. A resposta é salva na variável perfil\_do\_usuario.

**Geração de Menus Dinâmicos:** Quando o usuário coloca seu usuário o sistema avalia a variável salva. Se a variável for "Bombeiro", ele exibe apenas as opções de bombeiro. Se for "Morador", exibe apenas as de morador de forma automática sem precisar chamar o menu e isso vai variar de usuario para usuario.

**A Trava de Segurança:** Para evitar que um perfil acesse funções de outro (ex: um Estudante tentar acessar as Vagas de Hospitais), todas as ações do sistema possuem uma verificação dupla nos passos de roteamento:

Condição de Liberação (matches): Verifica se o perfil\_do\_usuario tem permissão para aquela ação.

Condição de Bloqueio (not\_matches / does not match): Se o perfil do usuário não estiver na lista de autorizados, o bot interrompe imediatamente o fluxo da ação, impede a exibição dos dados e dispara a mensagem de erro padrão: "⚠️ Opção inválida para o seu departamento. Por favor, observe o menu e escolha corretamente uma das opções numéricas disponíveis" assim redirecionando o usuario novamente para o menu de seu respectivo usuario.

**SIMULAÇÃO OPERACIONAL:** É importante destacar que o nosso bot utiliza as coordenadas geográficas reais das regiões exatas da Amazônia para dar total realismo e veracidade a proposta do projeto. os dados analíticos exibidos nos boletins como o número de leitos livres, temperaturas do momento e o histórico exato de vítimas são uma simulação estruturada para fins acadêmicos e de demonstração da ferramenta.

**2\. MATRIZ DE PERFIS E ACESSOS** 

O sistema divide os usuários em 5 categorias, entregando apenas o que é pertinente à sua profissão:

**Bombeiro:** Acesso a Relatório, Foco de Incêndio, Último Documento, Temperatura.

**Socorrista:** Acesso a Vítimas, Vagas / Hospitais Próximos, Chamados, Relatório.

**Morador (Habitante):** Acesso a Temperatura, Fogo / Distância, Alertas, Relatório.

**Estudante:** Acesso a Relatório, Histórico de Temperaturas, Coordenadas.

**Órgão Público:** Perfil administrativo e de auditoria macro. Possui acesso compartilhado aos módulos críticos de todas as áreas (Fogo/Distância, Alertas, Relatório, Histórico de Temperaturas, Coordenadas, Vítimas, Vagas de Hospitais).

**3\. DETALHAMENTO DE TODAS AS FUNÇÕES (ACTIONS)**

**Módulo Operacional (Exclusivo Bombeiros):**

Último Documento exibe o Relatório de Vistoria Aérea \#RV-104, informando sobre o sucesso, a expansão no foco leste e a necessidade de acionamento de apoio aéreo pelo Comandante Alfonso. 

Foco de Incêndio exibe o Mapeamento Tático de Foco, detalhando as rotas de acesso seguras, o bloqueio da rodovia BR-319 por fumaça densa e a diretriz tática de resfriamento de bordas.

**Módulo de Saúde (Compartilhado: Socorristas e Órgão Público):**

Vítimas mostra Boletim Oficial de Ocorrências, um painel atualizado a cada 4 horas. ex 42 vítimas resgatadas nos últimos 3 dias, separando os resgates por dia e informando que as vítimas do último ciclo 2 novos resgates já foram devidamente estabilizadas.

Vagas Hospitais: Pede ao usuário para escolher uma zona (1 a 6). Exibe a capacidade de leitos, UTI e status logístico por exemplo, relata dificuldade de transferência no Norte devido a chuvas, lotação crítica no Sul (Arco do Desmatamento) e o Centro (Manaus) atuando como polo regulador com helipontos liberados.

**Módulo de Telemetria e Satélite (Compartilhado Estudantes e Órgão Público)**

Coordenadas baseado na escolha da região de 1 a 6, retorna dados geoespaciais em tempo real captados por satélite (CBERS-4A). Mostra, por exemplo, áreas em rescaldo no Leste, múltiplos focos críticos no Sul, área 100% segura no Centro e ausência de leituras no Norte por conta de nuvens densas bloqueando os sensores.

Histórico de Temperaturas: Mostra o "Boletim Térmico". Traz a temperatura exata em graus Celsius, a condição climática ex alta umidade, ar extremamente seco e o status térmico de risco da região selecionada

**Módulo de Prevenção e Comunidade ( Moradores e Órgão Público)**

Alertas mostra um painel de aviso em massa dispara o Comunicado Oficial de Risco Extremo, orientando a população sobre a onda de calor, proibindo queimas de lixo e instruindo sobre proteção respiratória.

Fogo / Distância: Dispara o alerta de evacuação. Informa que uma linha de fogo está a menos de 5km de distância do perímetro urbano, orientando o bloqueio de janelas com panos úmidos e a preparação de rotas de fuga para viaturas.

**Ações Gerais e Tratamento de Erros do Sistema:**

Relatório (Acesso Geral): Exibe um Relatório Consolidado de Monitoramento cobrindo a evolução tática do dia (leituras às 09h00, 12h00 e 15h00), somando a área queimada, pico de temperatura e total de chamados (193/199).

Voltar ou Sair: Sempre que um fluxo termina, o bot pergunta se o usuário deseja voltar ao menu. Se "Sim", reconecta ao menu; se "Não", dispara a mensagem de encerramento ("Tudo bem\! Até uma próxima.").

Validação de Inputs Regionais: Nos módulos que exigem a escolha de regiões (1 a 6), o sistema possui validadores matemáticos. Se o usuário digitar números fora desse intervalo, a ação intercepta o erro, exibe a mensagem "número errado digite corretamente a região" ou "Numerro errado" e repete a pergunta original através de um comando de replay.

é também de extrema importância ressaltar que cada action possui mais de 12 exemplos, e alem de cada usuário ter uma validação de mais de 5 sinônimos, além de alguns possuírem mais de 10 

