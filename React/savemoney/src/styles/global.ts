import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --background:#f0f2f5;
        --red:#e52e4d;
        --blue:#5429cc;
        --blue-light:#6933ff;
        --text-title:#363f5f;
        --text-body:#969cb3;
        --background:#f0f3f5;
        --shape:#ffffff
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    //por padrao a fonte vem 16px (Desktop)
    //vamos aplicar a seguinte resposividade no html:

    html {
        @media (max-widht: 1080px){
            font-size: 93.75%;
        }
        @media (max-widht: 720px){
            font-size: 87.5%;
        }
    }

    body {
        background: var(---background);
        -webkit-font-smoothing:antialiased;// apenas um hackzinho para a fonte ficar mais detalhada no chrome
        
    }
    
    body, input, textarea, button {
        font-family: 'Poppins',sans-serif;
        font-weight: 400;
    }
    h1,h2,h3,h4,h5,h6,strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }
    //o proximo significa que vai aplicar em tudo que estiver desabilitado na nossa app
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`