import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
import Image from "@components/ui/image";

const Information = ({ className, socials }) => {
  return (
    <>
      <div className="text-center">
        <Logo />
        <p>ICPA Global Institute </p>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center justify-center  ">
          {socials.map((item, index) => (
            <Link
              href={item.path ? item.path : "/"}
              key={index}
              className="mx-1 transition hover:opacity-80 social-link-vertical-align"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={item.image}
                alt={item.name}
                height={item.height}
                width={item.width}
                className="align-middle transform scale-85 md:scale-100 "
              />
            </Link>
          ))}

          {/* <div className="border-l-2 border-l-gray-400 px-2 ml-2">
            <p className="font-medium">+91-750-649-6604</p>
          </div> */}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center px-4 py-4 border-y-2 border-y-gray-500 max-w-[980px]">
          <div className="flex ml-4 lg:ml-0">
            <div className="footer-widget-info-icon">
              <i className="fi fi-rr-phone-call"></i>
            </div>
            <div className="footer-widget-info-text ml-3">
              <label>Phone</label>
              <a href="tel:(505)555-0125">(505) 555-0125</a>
            </div>
          </div>
          <div className="flex ml-4">
            <div className="footer-widget-info-icon">
              <i className="fi fi-rr-envelope"></i>
            </div>
            <div className="footer-widget-info-text ml-3">
              <label>Email</label>
              <a href="mailto:Emailmichelle.rivera@example.com">
                michelle.rivera@example.com
              </a>
            </div>
          </div>
          <div className="flex ml-4 items-center">
            <div className="footer-widget-info-icon">
              <i className="fi fi-rr-marker"></i>
            </div>
            <div className="footer-widget-info-text ml-3">
              <label>Address</label>
              <a href="#">B Block, 1749, Shastri Nagar , New Delhi 110052</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
