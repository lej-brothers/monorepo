import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import useProduct from "../../hooks/useProduct";
import ProductModule from "../../modules/product.module";
import ProductTemplate from "../../components/ProductTemplate";
import Layout from "../../components/Layout";
import Head from "next/head";
import {
  MobileView,
  BrowserView,
  isMobile,
  TabletView,
  isTablet,
} from "react-device-detect";
import MobileProductTemplate from "../../components/MobileProductTemplate";

interface Params extends ParsedUrlQuery {
  handle: string;
}

const ProductPage = () => {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useProduct(slug as string);

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>LeJ`Cafe | {data.title}</title>
      </Head>
      <BrowserView>
        <ProductTemplate product={data} />
      </BrowserView>

      <TabletView>
        <ProductTemplate product={data} />
      </TabletView>

      {!isTablet && (
        <MobileView>
          <MobileProductTemplate product={data} />
        </MobileView>
      )}
    </>
  );
};

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const handles = await ProductModule.handles();
  return {
    paths: handles
      .map((handles: any) => handles.slug)
      .map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`get_product`, slug], () =>
    ProductModule.get(slug)
  );

  const queryData = await queryClient.getQueryData([`get_product`, slug]);

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    },
  };
};

export default ProductPage;
