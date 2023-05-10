import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cn from "classnames";
import Image from "@components/ui/image";
import usePrice from "@utils/use-price";
import useWindowSize from "@utils/use-window-size";
import { useRouter } from "next/router";
import Divider from "@components/ui/divider";
import Link from "@components/ui/link";
import { useSession } from "next-auth/react";
import { useModalAction } from "@components/common/modal/modal.context";

const CourseCard = ({ course, className }) => {
  const [processingStatus, setProcessingStatus] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const { openModal } = useModalAction();
  const { title, image, slug, description, course_type, youtube_playlist_id } =
    course ?? {};

  const { price, basePrice, discount } = usePrice({
    amount: Number(course.sale_price),
    baseAmount: Number(course.price),
    currencyCode: "INR",
  });

  useEffect(() => {
    if (error === "failed") {
      toast.error("Payment failed , try again !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // const handleWatchNow = () => {
  //   if (!session) {
  //     return openModal("LOGIN_VIEW");
  //   } else {
  //     router.push(`/watch/${slug}`);
  //   }
  // };

  const handlePayment = async () => {
    if (!session) {
      return openModal("LOGIN_VIEW");
    } else {
      setProcessingStatus(true);
      const res = await initializeRazorpay();

      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API}/payment/razorpay/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session?.user?.name,
            email: session?.user?.email,
            course: {
              name: title,
              slug: slug,
              image: image,
              playlistId: youtube_playlist_id,
            },
            slug: slug,
          }),
        }
      ).then((t) => t.json());
      let orderNumber = data.orderNumber;
      var options = {
        key: process.env.RAZORPAY_KEY,
        name: "ICPA Institute",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for placing an order",
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.jpg`,
        handler: async function (response) {
          setProcessingStatus(false);
          const bodydata = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            orderNumber: orderNumber,
          };
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_NODE_API}/payment/razorpay/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodydata),
            }
          ).then((t) => t.json());

          if (data.message === "success") {
            router.push("/account/course");
          } else {
            setError("failed");
          }
        },
        prefill: {
          name: " ",
          email: "",
          contact: "",
        },
      };

      const paymentObject = window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <article
      className={cn(
        "flex flex-col group overflow-hidden rounded-md transition-all duration-300  shadow-dropDown hover:shadow-cardHover relative h-full",
        className
      )}
      title={title}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden w-full h-[256px] transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image ?? productPlaceholder}
            alt={title || "Product Image"}
            layout="fill"
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        {/* <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[14px] font-normal text-slate-900 inline-block bg-yellow rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              sale
            </span>
          )}
        </div> */}
        <div className="w-full h-full absolute  top-0 text-right pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {course_type === "free" ? (
            <span className="text-[14px] font-normal text-slate-900 inline-block bg-yellow rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              free
            </span>
          ) : (
            discount && (
              <span className="text-[14px] font-normal text-slate-900 inline-block bg-yellow rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                - {discount} discount
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="text-center">
          <h3 className="text-skin-base min-h-[44px] text-[11px]  lg:text-[15px] font-normal leading-5 sm:leading-6 mb-1.5">
            {title}
          </h3>
        </div>
        <Divider className="bg-[#5c0f8b] h-[2px]" />
        <div className="py-4">
          <ul className="flex items-center flex-wrap justify-center">
            <li className="flex items-center mr-[25px]">
              <img src="/images/icon/c-meta-01.png" alt="meta-icon" />
              <span className="ml-1 text-slate-600">
                {course.total_chapters} Classes
              </span>
            </li>
            <li className="flex items-center mr-[25px]">
              <img src="/images/icon/c-meta-02.png" alt="meta-icon" />
              <span className="ml-1 text-slate-600">
                {course.total_student} Students
              </span>
            </li>
            <li className="flex items-center mr-[25px]">
              <img src="/images/icon/c-meta-03.png" alt="meta-icon" />
              <span className="ml-1 text-slate-600">
                {course.total_stars} Ratings
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center py-2">
          {course_type === "free" ? (
            <>
              <div className="py-[6px] px-6 bg-[#245d51]/75 rounded-sm">
                <p className="text-[18px] text-white">Free</p>
              </div>

              <Link
                href={`/watch/${slug}`}
                className="py-[6px] px-6 bg-orange/90 rounded-sm text-[18px] text-white ml-2"
              >
                Watch Now
              </Link>
            </>
          ) : basePrice === price ? (
            <>
              <p className="text-[20px] text-slate-700 ">{price}</p>
              <Link
                href={`/course/${slug}`}
                className="py-[6px] px-6 bg-[#245d51]/75 rounded-sm text-[18px] text-white ml-2"
              >
                View Details
              </Link>
              <button
                onClick={handlePayment}
                className="py-[6px] px-6 bg-orange/90 rounded-sm text-[18px] text-white ml-2"
              >
                {processingStatus ? "Processing ... " : "Pay Now"}
              </button>
            </>
          ) : (
            <>
              <p className="text-[20px] text-base ">{price}</p>
              <del className="ml-1 text-[12px] text-base text-opacity-70">
                {basePrice}
              </del>
              <Link
                href={`/course/${slug}`}
                className="py-[6px] px-6 bg-[#245d51]/75 rounded-sm text-[18px] text-white ml-2"
              >
                View Details
              </Link>
              <button
                onClick={handlePayment}
                className="py-[6px] px-6 bg-orange/90 rounded-sm text-[18px] text-white ml-2"
              >
                {processingStatus ? "Processing ... " : "Pay Now"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
