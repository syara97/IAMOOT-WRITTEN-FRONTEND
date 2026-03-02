const questionText = {
    EN: [
        {
            currentCategory: 'Identification of Issues - 25 Points Maximum',
            minValue: 0, 
            maxValue: 25, 
            currentCriteria: [
                'Did they identify the key legal issues to support their position?', 
                'Did they provider counterarguments for issues contrary to their position?'
            ]
        }, 
        {
            currentCategory: 'Statement of Facts - 15 Points Maximum', 
            minValue: 0, 
            maxValue: 15, 
            currentCriteria: [ 
                'Did the Statement of Facts accurately and persuasively present the record while dealing candidly with the unfavorable facts?', 
                'Were the facts organized logically (i.e., chronological or other rational and thoughtful sequence?'
            ]
        }, 
        {
            currentCategory: 'Legal Analysis (Arguments) - 40 Points Maximum', 
            minValue: 0, 
            maxValue: 40, 
            currentCriteria: [ 
                'Were the arguments well-organized and persuasive?', 
                'Were the issues addressed throughly and logically?',
                'Were the authorities for advocates\' positions explained and used to their full advantage?', 
                'Were the authorities for opponenets\' positions distinguished or explained?', 
                'Were the opponents\' arguments anticipated and/or refuted?', 
                'Did they use and interpret all authorities correctly?'
            ]
        },
        {
            currentCategory: 'Request for Relief - 5 Points Maximum', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'Is there a specific request for relief?', 
                'Does the request for relief ecctively summarize their arguments?'
            ]
        },
        {
            currentCategory: 'Style and Presentation - 5 Points Maximum', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'Was the writing style precise and well-organized?', 
                'Were the spelling, punctuation, and word-choice correct?', 
                'Did the writing flow and was it easy to read?'
            ]
        },
        {
            currentCategory: 'Overall - 10 Points Maximum', 
            minValue: 0, 
            maxValue: 10, 
            currentCriteria: [ 
                'How would you rate this Memorial overall? ', 
                'A. Excellent (10 points)',
                'B. Very Good (8 points)',
                'C. Good (6 points)', 
                'D. Fair (4 points)', 
                'E. Poor (2 points)'
            ]
        } 
    ],
    ES: [
        {
            currentCategory: 'Identificación de Cuestiones - Máximo 25 Puntos',
            minValue: 0, 
            maxValue: 25, 
            currentCriteria: [
                '¿Identificaron las cuestiones legales clave para respaldar su posición?', 
                '¿Proporcionaron contraargumentos para cuestiones contrarias a su posición?'
            ]
        }, 
        {
            currentCategory: 'Exposición de los Hechos - Máximo 15 Puntos', 
            minValue: 0, 
            maxValue: 15, 
            currentCriteria: [ 
                '¿La exposición de los hechos presentó el expediente de manera precisa y persuasiva, tratando con sinceridad los hechos desfavorables?', 
                '¿Los hechos estaban organizados lógicamente (es decir, en orden cronológico u otra secuencia racional y bien estructurada)?'
            ]
        }, 
        {
            currentCategory: 'Análisis Legal (Argumentos) - Máximo 40 Puntos', 
            minValue: 0, 
            maxValue: 40, 
            currentCriteria: [ 
                '¿Los argumentos estaban bien organizados y eran persuasivos?', 
                '¿Se abordaron las cuestiones de manera completa y lógica?',
                '¿Se explicaron y utilizaron las autoridades legales en favor de su posición de manera óptima?', 
                '¿Se diferenciaron o explicaron las autoridades en favor de la posición contraria?', 
                '¿Se anticiparon y/o refutaron los argumentos del oponente?', 
                '¿Se utilizaron e interpretaron correctamente todas las autoridades legales?'
            ]
        },
        {
            currentCategory: 'Solicitud de Reparación - Máximo 5 Puntos', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                '¿Existe una solicitud de reparación específica?', 
                '¿La solicitud de reparación resume eficazmente sus argumentos?'
            ]
        },
        {
            currentCategory: 'Estilo y Presentación - Máximo 5 Puntos', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                '¿El estilo de redacción fue preciso y bien organizado?', 
                '¿La ortografía, puntuación y elección de palabras fueron correctas?', 
                '¿El texto fluía bien y era fácil de leer?'
            ]
        },
        {
            currentCategory: 'Calificación General - Máximo 10 Puntos', 
            minValue: 0, 
            maxValue: 10, 
            currentCriteria: [ 
                '¿Cómo calificaría este Memorial en general?', 
                'A. Excelente (10 puntos)',
                'B. Muy Bueno (8 puntos)',
                'C. Bueno (6 puntos)', 
                'D. Regular (4 puntos)', 
                'E. Deficiente (2 puntos)'
            ]
        } 
    ],
    POR: [
        {
            currentCategory: 'Identificação de Questões - Máximo de 25 Pontos',
            minValue: 0, 
            maxValue: 25, 
            currentCriteria: [
                'Eles identificaram as questões jurídicas essenciais para apoiar sua posição?', 
                'Eles forneceram contra-argumentos para questões contrárias à sua posição?'
            ]
        }, 
        {
            currentCategory: 'Exposição dos Fatos - Máximo de 15 Pontos', 
            minValue: 0, 
            maxValue: 15, 
            currentCriteria: [ 
                'A exposição dos fatos apresentou com precisão e de forma persuasiva o registro, lidando com franqueza com os fatos desfavoráveis?', 
                'Os fatos estavam organizados de maneira lógica (por exemplo, em ordem cronológica ou outra sequência racional e bem estruturada)?'
            ]
        }, 
        {
            currentCategory: 'Análise Jurídica (Argumentos) - Máximo de 40 Pontos', 
            minValue: 0, 
            maxValue: 40, 
            currentCriteria: [ 
                'Os argumentos estavam bem organizados e eram persuasivos?', 
                'As questões foram abordadas de forma completa e lógica?',
                'As autoridades para a posição do advogado foram explicadas e utilizadas da melhor forma possível?', 
                'As autoridades que apoiam a posição contrária foram diferenciadas ou explicadas?', 
                'Os argumentos do oponente foram antecipados e/ou refutados?', 
                'Todas as autoridades foram utilizadas e interpretadas corretamente?'
            ]
        },
        {
            currentCategory: 'Pedido de Reparação - Máximo de 5 Pontos', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'Existe um pedido específico de reparação?', 
                'O pedido de reparação resume eficazmente seus argumentos?'
            ]
        },
        {
            currentCategory: 'Estilo e Apresentação - Máximo de 5 Pontos', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'O estilo da escrita foi preciso e bem organizado?', 
                'A ortografia, pontuação e escolha de palavras estavam corretas?', 
                'O texto fluía bem e era fácil de ler?'
            ]
        },
        {
            currentCategory: 'Classificação Geral - Máximo de 10 Pontos', 
            minValue: 0, 
            maxValue: 10, 
            currentCriteria: [ 
                'Como você classificaria este Memorial de forma geral?', 
                'A. Excelente (10 pontos)',
                'B. Muito Bom (8 pontos)',
                'C. Bom (6 pontos)', 
                'D. Regular (4 pontos)', 
                'E. Fraco (2 pontos)'
            ]
        } 
    ]
} 

export default questionText; 