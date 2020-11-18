import styled from 'styled-components';

import { DarkTheme } from '@interfaces/commons';
import { GithubIconProps } from '@interfaces/components/icons';

export default function Github(props: GithubIconProps) {
    const { darkTheme } = props;

    return (
        <svg
            height="25"
            viewBox="0 0 30 30"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
        >
            <StyledGithub darkTheme={darkTheme}>
                <path d="M15,0.4c-8.3,0-15,6.7-15,15C0,22,4.3,27.6,10.3,29.6c0.7,0.1,1-0.3,1-0.7c0-0.4,0-1.5,0-2.8c-4.2,0.9-5.1-1.8-5.1-1.8c-0.7-1.7-1.7-2.2-1.7-2.2c-1.4-0.9,0.1-0.9,0.1-0.9c1.5,0.1,2.3,1.5,2.3,1.5c1.3,2.3,3.5,1.6,4.4,1.2c0.1-1,0.5-1.6,1-2c-3.3-0.4-6.8-1.7-6.8-7.4c0-1.6,0.6-3,1.5-4c-0.2-0.4-0.7-1.9,0.1-4c0,0,1.3-0.4,4.1,1.5c1.2-0.3,2.5-0.5,3.8-0.5s2.6,0.2,3.8,0.5c2.9-1.9,4.1-1.5,4.1-1.5c0.8,2.1,0.3,3.6,0.1,4c1,1.1,1.5,2.4,1.5,4c0,5.8-3.5,7-6.8,7.4c0.5,0.5,1,1.4,1,2.8c0,2,0,3.6,0,4.1c0,0.4,0.3,0.9,1,0.7c6-2,10.2-7.6,10.2-14.2C30,7.1,23.3,0.4,15,0.4z" />
            </StyledGithub>
        </svg>
    );
}

const StyledGithub = styled.g<DarkTheme>`
    path {
        fill-rule: evenodd;
        clip-rule: evenodd;
        fill: ${(props) => (props.darkTheme ? 'white' : '#191313')};
    }
`;
