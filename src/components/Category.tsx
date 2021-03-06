import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import * as Scroll from 'react-scroll';

import * as CATEGORY from '@constants/category';
import { CategoryProps } from '@interfaces/components/category';
import { $size } from '@styles/mixins';
import { normalBoxStyles } from '@styles/modules';

const scroller = Scroll.scroller;
const Element = Scroll.Element;

export default function Category(props: CategoryProps) {
    const {
        categories,
        currentCategory,
        handleChange,
        handleNext,
        handlePrevious,
    } = props;

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const categoryList = container.querySelector('ul');
        const categoryItems = categoryList.querySelectorAll('div');
        let previousWidth = 50;

        categoryItems.forEach((item: any, index: number) => {
            if (index < currentCategory) {
                previousWidth += item.clientWidth + 10;
            }
        });

        scroller.scrollTo('category', {
            containerId: 'categoryContainer',
            delay: 50,
            duration: 120,
            offset: -(
                container.scrollWidth -
                previousWidth +
                ((container.clientWidth -
                    categoryItems[currentCategory].clientWidth) /
                    2 -
                    120)
            ),
            horizontal: true,
            ignoreCancelEvents: true,
            smooth: 'linear',
            spy: true,
        });
    }, [currentCategory]);

    return (
        <StyledCategory id="categoryContainer" ref={containerRef}>
            <button
                aria-label="Show Previous Category Posts"
                onClick={handlePrevious}
                type="button"
            >
                <FiChevronLeft />
            </button>
            <ul role="tablist">
                <li role="tab">
                    <StyledElement name="category">
                        <button
                            aria-label={`Show ${CATEGORY.ALL} Category Posts`}
                            className={!!currentCategory ? null : 'active'}
                            onClick={() => handleChange(CATEGORY.ALL)}
                            type="button"
                        >
                            {CATEGORY.ALL}
                        </button>
                    </StyledElement>
                </li>
                {categories?.map((item, index) => (
                    <li key={index} role="tab">
                        <StyledElement name="category">
                            <button
                                aria-label={`Show ${item} Category Posts`}
                                className={
                                    currentCategory === index + 1
                                        ? 'active'
                                        : null
                                }
                                onClick={() => handleChange(item)}
                                type="button"
                            >
                                {item}
                            </button>
                        </StyledElement>
                    </li>
                ))}
            </ul>
            <button
                aria-label="Show Next Category Posts"
                onClick={handleNext}
                type="button"
            >
                <FiChevronRight />
            </button>
        </StyledCategory>
    );
}

const StyledCategory = styled.nav`
    ${normalBoxStyles};
    position: relative;
    ${$size('var(--size-percent-100)', 'var(--size-50)')};
    margin: var(--size-20-0-30);
    border-radius: var(--size-5);
    white-space: nowrap;
    overflow: scroll auto;
    -ms-overflow-style: none;
    box-shadow: var(--box-shadow-color-2);
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > button {
        position: sticky;
        min-width: var(--size-30);
        height: var(--size-30);
        border-radius: var(--size-percent-50);
        background: var(--color-gradient);
        line-height: var(--size-12);
        font-size: var(--size-20);
        color: var(--color-sub-text-1);
        box-shadow: var(--box-shadow-color-3);

        &:active {
            background: var(--color-active);
        }

        &:first-of-type {
            left: var(--size-0);

            svg {
                margin: var(--size-0-2-0-0);
            }
        }

        &:last-of-type {
            right: var(--size-0);

            svg {
                margin: var(--size-0-0-0-2);
            }
        }
    }

    ul {
        ${normalBoxStyles};
        height: var(--size-percent-100);
        margin: var(--size-0-20);
    }

    li {
        &:not(:last-of-type) {
            margin: var(--size-0-10-0-0);
        }

        button {
            ${$size('var(--size-percent-100)', 'var(--size-30)')};
            border-radius: var(--size-30);
            padding: var(--size-0-20-2);
            background: var(--color-main);
            line-height: unset;
            font-size: var(--size-13);
            color: var(--color-sub-text-1);
            box-shadow: var(--box-shadow-color-1);

            &:active,
            &.active {
                font-weight: bold;
                color: var(--color-text);
                box-shadow: var(--box-shadow-color-4);
            }
        }
    }
`;

const StyledElement = styled(Element)`
    height: var(--size-percent-100);
`;
