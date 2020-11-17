import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: ${(props) => props.theme.fontFamily.normal};
        font-size: ${(props) => props.theme.fontSize.normal};
        color: ${(props) => props.theme.colors.normal};
    }
    
    a {
        text-decoration: none;
        color: inherit;
        
        a:active {
            color: inherit;
        }
    }
`;

export default GlobalStyles;
