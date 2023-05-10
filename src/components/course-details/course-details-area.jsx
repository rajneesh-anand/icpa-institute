import review_content from "@data/review-data";
// import VideoPopup from "@/src/modals/video-popup";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const CourseDetailsArea = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="pt-120 pb-50">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="lg:mr-25">
              <div className="relative h-[240px] lg:h-[400px]">
                <Image
                  src={data.image ?? productPlaceholder}
                  alt={data.title || "course-image"}
                  layout="fill"
                  quality={100}
                  className="object-cover rounded-md"
                />
              </div>

              <div className="course-details-content mb-45">
                <div className="tpcourse__category mb-15">
                  <ul className="tpcourse__price-list flex items-center">
                    <li>
                      <a className="c-color-green" href="/">
                        Design
                      </a>
                    </li>
                    <li>
                      <a className="c-color-yellow" href="/">
                        Development
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tpcourse__ava-title mb-25">
                  <h4 className="c-details-title">
                    Master Web Design in Adobe XD: Complete UI/UX Masterclass
                  </h4>
                </div>
                <div className="tpcourse__meta course-details-list">
                  <ul className="flex items-center">
                    <li>
                      <div className="rating-gold flex items-center">
                        <p>4.7</p>
                        <i className="fi fi-ss-star"></i>
                        <i className="fi fi-ss-star"></i>
                        <i className="fi fi-ss-star"></i>
                        <i className="fi fi-ss-star"></i>
                        <i className="fi fi-rs-star"></i>
                        <span>(125)</span>
                      </div>
                    </li>
                    <li>
                      <img src="/images/icon/c-meta-01.png" alt="meta-icon" />
                      <span>35 Classes</span>
                    </li>
                    <li>
                      <img src="/images/icon/c-meta-02.png" alt="meta-icon-2" />{" "}
                      <span>291 Students</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="c-details-about mb-40">
                <h5 className="tp-c-details-title mb-20">About This Course</h5>
                <p>
                  Synergistically foster 24/7 leadership rather than scalable
                  platforms. Conveniently visualize installed base products
                  before interactive results. Collaboratively restore corporate
                  experiences and open-source applications. Proactively mesh
                  cooperative growth strategies for covalent opportunities.
                  Competently create efficient markets through best-of-breed
                  potentialities.
                </p>
                <p>
                  Proactively initiate corporate vortals via bricks-and-clicks
                  relationships. Dynamically envisioneer cutting-edge paradigms
                  via client-centered relationships. Globally repurpose
                  backward-compatible growth strategies and fully tested
                  e-services. Energistically promote stand-alone models whereas
                  effective solutions. Quickly target low-risk high-yield
                  e-markets via web-enabled networks.
                </p>
              </div>
              <div className="cor-details-instructor mb-40">
                <h4 className="tp-c-details-title mb-40">Instructor</h4>
                <div className="course-instructor-details d-flex f-wrap align-items-center">
                  <div className="course-avata mr-30 mb-20">
                    <img
                      src="/assets/img/course/c-details-ava-thumb-01.jpg"
                      alt="avata-thumb"
                    />
                  </div>
                  <div className="course-avatar-details mb-20">
                    <h5 className="c-avata-title mb-10">Hossain Mahmud</h5>
                    <p>
                      Award Winning Chemical & User Interface Design Training
                    </p>
                    <div className="c-details-list mb-5">
                      <ul className="d-flex align-items-center">
                        <li>
                          <div className="rating-gold d-flex align-items-center">
                            <p>4.7</p>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-rs-star"></i>
                            <span>(125)</span>
                          </div>
                        </li>
                        <li>
                          <img
                            src="/assets/img/icon/c-details-01.png"
                            alt="meta-icon"
                          />
                          <span>35 Classes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="c-details-stu">
                      <ul>
                        <li className="d-flex align-items-center">
                          <img
                            src="/assets/img/icon/c-details-02.png"
                            alt="meta-icon"
                          />{" "}
                          <span>2,35,687 Students</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p>
                  Synergistically foster 24/7 leadership rather than scalable
                  platforms. Conveniently visualize installed base products
                  before interactive results. Collaboratively restore corporate
                  experiences and open-source applications. Proactively mesh
                  cooperative growth strategies.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="c-details-sidebar">
              <div className="course-details-widget">
                <div className="cd-video-price">
                  <h3 className="pricing-video text-center mb-15">$29.99</h3>
                  <div className="cd-pricing-btn text-center mb-30">
                    <Link className="tp-vp-btn" href="/course-details">
                      Add To Cart
                    </Link>
                    <Link className="tp-vp-btn-green" href="/course-details">
                      Enroll Now
                    </Link>
                  </div>
                </div>
                <div className="cd-information mb-35">
                  <ul>
                    <li>
                      <i className="fa-light fa-calendars"></i>{" "}
                      <label>Lesson</label> <span>36</span>
                    </li>
                    <li>
                      <i className="fi fi-rr-chart-pie-alt"></i>{" "}
                      <label>Quizess</label> <span>6</span>
                    </li>
                    <li>
                      <i className="fi fi-rr-user"></i> <label>Students</label>{" "}
                      <span>105</span>
                    </li>
                    <li>
                      <i className="fa-light fa-clock-desk"></i>{" "}
                      <label>Duration</label> <span>16 Hours</span>
                    </li>
                    <li>
                      <i className="fi fi-sr-stats"></i>{" "}
                      <label>Skill Level</label> <span>Beginner</span>
                    </li>
                    <li>
                      <i className="fi fi-rr-comments"></i>{" "}
                      <label>Language</label> <span>English</span>
                    </li>
                    <li>
                      <i className="fi fi-rs-diploma"></i>{" "}
                      <label>Certificate</label> <span>Yes</span>
                    </li>
                  </ul>
                </div>
                <div className="c-details-social">
                  <h5 className="cd-social-title mb-25">Share Now:</h5>
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailsArea;
