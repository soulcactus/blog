import { Link, graphql } from 'gatsby';
import { PageContext } from 'gatsby/internal';

import Bio from '@components/Bio';
import Layout from '@components/Layout';
import SEO from '@components/SEO';

export default function BlogPost(props: PageContext) {
    const { data, pageContext } = props;
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next } = pageContext;
    const { excerpt, html } = post;
    const { date, description, title } = post.frontmatter;
    const { slug: previousSlug, title: previousTitle } = previous?.fields ?? {};
    const { slug: nextSlug, title: nextTitle } = next?.fields ?? {};

    return (
        <Layout title={siteTitle}>
            <SEO description={description || excerpt} title={title} />
            <main>
                <article>
                    <header>
                        <h1>{title}</h1>
                        <p>{date}</p>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: html }} />
                    <hr />
                </article>
                <nav>
                    <ul>
                        <li>
                            {!!previous && (
                                <Link to={previousSlug} rel="prev">
                                    ← {previousTitle}
                                </Link>
                            )}
                        </li>
                        <li>
                            {!!next && (
                                <Link to={nextSlug} rel="next">
                                    {nextTitle} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
                <Bio />
            </main>
        </Layout>
    );
}

export const blogPostQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`;
