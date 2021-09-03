import styled from 'styled-components'

export const Container = styled.header`
    background-color: var(--blue);
    
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto; // vai estar sempre centralizado
    padding: 2rem 1rem 12rem;
    display: flex;
    align-items: center;//porque eu quero q a logo e o botão estejam alinhados ao centro
    justify-content: space-between;//espaço entre a logo e o botao

    button {
        font-size: 1rem;
        color: #fff;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;//4px no desktop
        height: 3rem;//16 * 3 px altura do button
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);//hackzinho legal pra dar uma escurecida no componente, depois pesquise mais
            //lembre de usar o transition fora aqui do hover
        }

    }
`
