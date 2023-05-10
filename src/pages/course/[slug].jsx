import Layout from "@components/layout";
import CourseDetail from "@components/course-details";
import Seo from "@components/seo/seo";
import Breadcrumb from "@components/ui/breadcrumb";
import Container from "@components/ui/container";
import { courseData } from "@data/course";

export default function CourceDetailPage({ data }) {
  return (
    <>
      <Seo
        title="Organic Beauty Products"
        description="Geenia International is here to serve you better products for you we are in this Industry from many years and continuosly  upgrading products as per the environment"
        path="cources"
      />
      <Container>
        <div className="pt-4">
          <Breadcrumb />
        </div>
        <CourseDetail course={data} />
      </Container>
    </>
  );
}

CourceDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { slug } = ctx.params;
  const course = courseData.find((itm) => itm.slug === slug);

  return {
    props: { data: course },
  };
};
