import { graphql } from 'gatsby';
import { navigate } from 'gatsby-link';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

import Bio from '@components/Bio';
import Category from '@components/Category';
import Layout, { StyledToolbar } from '@components/Layout';
import PostPreview from '@components/PostPreview';
import Search from '@components/Search';
import SEO from '@components/SEO';
import ViewPosts from '@components/ViewPosts';
import * as CATEGORY from '@constants/category';
import { useCategory, useRadio, useTheme } from '@hooks/index';
import { BlogIndexProps } from '@interfaces/pages/blogIndex';
import { useCallback, useEffect, useState } from 'react';

// TODO: refactor
const BlogIndex = (props: BlogIndexProps) => {
    const { data } = props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    const categories = Array.from(
        new Set(posts.map((item) => item.node.frontmatter.category).sort()),
    );

    const [themeState, handleTheme] = useTheme(false);

    const [viewPageState, handleViewPage] = useRadio(
        !!localStorage.getItem('view_post_with_paginate_type')
            ? 'pagination'
            : 'infiniteScroll',
    );

    const [
        categoryState,
        categoryIndexState,
        handleCategory,
        handlePrevious,
        handleNext,
    ] = useCategory(
        (queryString.parse(location?.search).category as string) ??
            CATEGORY.ALL,
        categories,
    );

    const isInfiniteScroll = viewPageState === 'infiniteScroll';

    const categorizedPosts =
        categoryState === CATEGORY.ALL
            ? posts
            : posts.filter(
                  (item) => item.node.frontmatter.category === categoryState,
              );

    const [postsState, setPosts] = useState(
        isInfiniteScroll ? posts.slice(0, 10) : posts.slice(0, 10),
    );

    const [pageState, setPage] = useState(
        queryString.parse(location.search).page ?? '1',
    );

    const handlePage = useCallback(({ selected }) => {
        setPage(`${selected + 1}`);
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'view_post_with_paginate_type',
            JSON.stringify(!isInfiniteScroll),
        );
    }, [viewPageState]);

    useEffect(() => {
        const parsed = queryString.parse(location.search);

        const getCurrentScrollPercentage = () =>
            ((window.scrollY + window.innerHeight) /
                document.body.clientHeight) *
            100;

        const handleScroll = () => {
            if (getCurrentScrollPercentage() > 90) {
                setPosts((state) => [
                    ...state,
                    ...categorizedPosts.slice(state.length, state.length + 10),
                ]);
            }
        };

        if (isInfiniteScroll) {
            delete parsed.page;
            setPosts([...categorizedPosts.slice(0, 10)]);
            window.addEventListener('scroll', handleScroll, false);
        } else {
            const currentPage = queryString.parse(location.search).page ?? '1';

            parsed.page = currentPage;
            setPosts(categorizedPosts.slice(0, 10));
            setPage(currentPage);
        }

        navigate(`?${queryString.stringify(parsed)}`);

        if (isInfiniteScroll) {
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [categoryState, viewPageState]);

    useEffect(() => {
        if (!isInfiniteScroll) {
            const parsed = queryString.parse(location.search);

            parsed.page = pageState;
            navigate(`?${queryString.stringify(parsed)}`);

            setPosts(
                categorizedPosts.slice(
                    10 * (Number(pageState) - 1),
                    10 * Number(pageState),
                ),
            );
        }
    }, [pageState]);

    return (
        <Layout
            handleCategory={handleCategory}
            handleTheme={handleTheme}
            isDarkTheme={themeState}
            title={siteTitle}
        >
            <SEO title="All posts" />
            <Bio />
            <Category
                categories={categories as string[]}
                currentCategory={categoryIndexState}
                handleChange={handleCategory}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
            <StyledToolbar>
                <ViewPosts
                    isInfiniteScroll={isInfiniteScroll}
                    handleChange={handleViewPage}
                />
                <Search />
            </StyledToolbar>
            <main>
                <PostPreview posts={postsState} />
            </main>
            {!isInfiniteScroll && (
                <ReactPaginate
                    marginPagesDisplayed={0}
                    nextLabel="next"
                    onPageChange={handlePage}
                    pageCount={categorizedPosts.length / 10}
                    pageRangeDisplayed={4}
                    previousLabel="prev"
                />
            )}
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt(truncate: true)
                    fields {
                        slug
                    }
                    frontmatter {
                        category
                        date(formatString: "MMMM DD, YYYY")
                        description
                        thumbnail {
                            childImageSharp {
                                fixed(width: 125, height: 125) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                        title
                    }
                }
            }
        }
    }
`;
