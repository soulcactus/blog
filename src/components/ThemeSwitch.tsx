import Helmet from 'react-helmet';
import styled from 'styled-components';

import { THEME } from '@constants/enums';
import { ThemeSwitchProps } from '@interfaces/components/themeSwitch';
import { $size } from '@styles/mixins';

export default function ThemeSwitch(props: ThemeSwitchProps) {
    const { darkTheme, handleChange } = props;
    const switchTitle = `Active ${darkTheme ? THEME.LIGHT : THEME.DARK} Theme`;

    return (
        <>
            {darkTheme && (
                <Helmet
                    bodyAttributes={{
                        class: 'dark',
                    }}
                />
            )}
            <StyledSwitch
                aria-label={switchTitle}
                title={switchTitle}
                type="button"
            >
                <label>
                    <input onChange={handleChange} type="checkbox" />
                    <div />
                </label>
            </StyledSwitch>
        </>
    );
}

const StyledSwitch = styled.button`
    label {
        cursor: pointer;

        input {
            display: none;

            & + div {
                ${$size('2.52rem')};
                position: relative;
                border-radius: 50%;
                box-shadow: inset 0.8rem -0.8rem 0 0 #212f3d;
                transform: scale(1) rotate(-2deg);
                transition: box-shadow 0.1s ease-in-out 0.075s,
                    transform 0.1s ease 0.05s;

                &::before {
                    content: '';
                    ${$size('inherit')};
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: inherit;
                    transition: background 0.1s ease;
                }

                &::after {
                    content: '';
                    ${$size('0.56rem')};
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -0.28rem 0 0 -0.28rem;
                    border-radius: 50%;
                    box-shadow: 0 -1.61rem 0 white, 0 1.61rem 0 white,
                        1.61rem 0 0 white, -1.61rem 0 0 white,
                        1.05rem 1.05rem 0 white, -1.05rem 1.05rem 0 white,
                        1.05rem -1.05rem 0 white, -1.05rem -1.05rem 0 white;
                    transform: scale(0);
                }
            }

            &:checked + div {
                box-shadow: inset 1.6rem -1.6rem 0 0 #212f3d;
                transform: scale(0.5) rotate(0deg);
                transition: transform 0.2s ease 0.05s,
                    box-shadow 0.15s ease-in-out 0.05s;

                &::before {
                    background: white;
                    transition: background 0.2s ease 0.05s;
                }

                &::after {
                    transform: scale(1.5);
                    transition: transform 0.2s ease-in-out 0.05s;
                }
            }
        }
    }
`;
